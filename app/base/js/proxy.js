/**
 * 做一次 AJAX 的拦截 如果是 MOCK 这个配置项里的东西往兰西那边转发 认为是新接口的模拟
 * 否则 默认往天吴那边的代理层 做一次转发
 * by qingye
 * modified by nanzhu
 * 2014-07-11
 */



/**
 * HERO_NAME为 null 时，优先使用莲藕中定义的接口数据，未定义则使用线上接口数据（需登录信息的接口暂不支持）；
 * HERO_NAME为花名拼音时，根据对应用户在莲藕的配置自动选择数据来源。
 * 默认改为自己的花名拼音就好了。
 * @type {string|null}
 */

(function() {
  var HERO_NAME = 'rufeng';

  var proxyMap = [];

  //对参数做一次处理
  function resetParma(url) {
    $.each(proxyMap, function (i, item) {
      url = url.replace(item.reg, item.replace);
    });

    return url;
  }

  //是否在MOCK 的配置项内
  function filterMock(url) {
    if (url.charAt(0) === '/') {
      url = url.substr(1);
    }

    //如果是要跨域去取测试数据的话
    if (location.href.indexOf('noprotype') > -1) {
      return 'http://m.mogujie.com/' + url;
    }

    url = resetParma(url);

    if (/(mogujie\.(?!com))/.test(location.hostname)) {
      return location.hostname.replace(/\w+(\.mogujie\.\w+)/, 'http://lotus$1/mock/') + url;
    }
    else {
      return 'http://lotus.f2e.mogujie.org/mock/' + url;
    }
  }

  $._ajax = $.ajax;

  $.ajax = function () {
    var postData = arguments[0];
    var mockUrl;

    // $.ajax()支持类似$.ajax(url, settings)的调用方式，需要做下判断(since ver.1.5)。
    if (typeof postData === 'string') {
      mockUrl = postData;
      postData = filterMock(arguments[1]);
    }
    else {
      mockUrl = filterMock(postData.url);
    }

    if (location.href.indexOf('noprotype') === -1) {
      postData.dataType = 'jsonp';

      // 通过jsonp方式调用时，指定接口的请求方式，
      // 防止调用POST方法的接口出现找不到接口的情况
      var type = (postData.type || 'GET').toUpperCase();

      var data = postData.data || {};

      delete postData.data;

      if (typeof data === 'string') {
        data += '&_method=' + type;

        HERO_NAME && (data += '&_hero=' + HERO_NAME);
      }
      else {
        data._method = type;

        HERO_NAME && (data._hero = HERO_NAME);
      }

      mockUrl += (mockUrl.indexOf('?') > -1 ? '&' : '?') + $.param(data);
    }

    postData.url = mockUrl;

    return $._ajax(postData);
    }

})();

