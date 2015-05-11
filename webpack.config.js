var fs = require('fs');
var path = require('path');

var PAGE_ROOT_PATH = './app/pages',
    DIST_PATH = '/dist/src';

/**
 * 首字母大写转换 
 *     1、/pages/demo/edit 转换为  DemoEdit
 *     2、支持 /pages/date-time-picker 转换为 DateTimePicker
 * @param  {[type]} str [description]
 * @return {[type]}     [description]
 */
function upperCase(str) {
    var v = str.split('/').join(' ').replace(/\b\w+\b/g, function(word) {
        return word.substring(0,1).toUpperCase()+word.substring(1);
    });
    return v.replace(/\s/g, '').replace(/\-/g, '');
}

/**
 * 遍历整个 app/pages 目录
 * @param  {[type]}   dir      [description]
 * @param  {Function} callback [description]
 * @return {[type]}            [description]
 */

var fileDirList = []; // 转换的列表
function travelDir(dir, callback) {
    var dirList = fs.readdirSync(dir);
    dirList.forEach(function(fileName) {

        var pathName = path.join(dir, fileName);

        if (fs.statSync(pathName).isDirectory()) { // 如果有二级目录
            var dirName = pathName.replace('app/pages/', '');
            if ( dirName.indexOf('/style') < 0 
                && dirName.indexOf('/stores') < 0 ) {
                fileDirList.push(dirName);
            }
            travelDir(pathName, callback);
        } else {

        }
    });
}

travelDir(PAGE_ROOT_PATH, function(){});


var entries = {}, routes = '';

fileDirList.forEach(function(dirName) {
    var viewName = upperCase(dirName);

    var fileName = 'page-' + dirName.replace(/\//g, '-');

    var viewFile = [PAGE_ROOT_PATH, dirName, viewName + 'View.jsx'].join('/');
    if (fs.existsSync(viewFile)) {
        entries[dirName] = viewFile;
        routes += '"/' + dirName.replace(/\-/g, '') + '"' + ':["' + [DIST_PATH, dirName + '.js'].join('/') + '"],';
    }
});


/**
 * 写入 js 到 routes.php 文件
 * @type {String}
 */
routes = 'var routesMap = { \n ' + routes + ' \n} \nmodule.exports = routesMap;';
fs.writeFile('./site/routes/routes.js', routes, function (err) {
    if (err) {
        console.error(err);
    }
});

module.exports = {

    entry: entries,

    output: {
        path: 'dist/src' ,
        filename: "[name].js",
        chunkFilename: "[name].js",
        //publicPath: "/activity2-0/dist/src/"
    },
    externals: {
      'react': 'window.React',
      'react/addons': 'window.React',
      'jquery': 'window.jQuery',
      'jQuery': 'window.jQuery'
    },
    resolve: {
        alias: {
            'base_path': path.resolve(__dirname + '/app/base'),
            'page_path': path.resolve(__dirname + '/app/pages'),
            'module_path': path.resolve(__dirname + '/app/module'),
            'template_path': path.resolve(__dirname + '/app/template'),
        }
    },
    module: {
        loaders: [
            { test: /\.less$/, loader: 'style-loader!css-loader!less-loader' },
            { test: /\.css$/, loader: "style!css" },
            { test: /\.(js|jsx)$/, loader: 'jsx-loader?harmony' },
            { test: /\.(jpg|png)$/, loader: "file-loader?name=[path][name].[ext]" }
        ]
    }
};
