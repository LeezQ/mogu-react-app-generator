<?php 
    /**
     * 简单的路由匹配方法，支持正则
     * @param  [type]  $str [description]
     * @return boolean      [description]
     */

    function isRoute($str) {
        $url = explode('/react', $_SERVER['REQUEST_URI']);
        if (empty($url[1])) {
            echo '你到火星了！呜呜~';die;
        }
        $route = $url[1];
        $routeReg = str_replace('/', '\\/', $str);
        $routeReg = str_replace('?', '\\?', $routeReg);
        return preg_match("/".$routeReg."/", $route);
    }
    $baseUrl = '';

    if (isRoute("/demo")) {
        // 添加活动报名页面
        $jsFile = $baseUrl . '/dist/src/page_demo.js';

    } else {
        echo '你到火星啦~'; die;
    }

 ?>
