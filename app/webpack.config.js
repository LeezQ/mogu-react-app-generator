var fs = require('fs');
var path = require('path');

var PathOrderPlugin = require('path-order-webpack-plugin');

var notifier = require('node-notifier');
var WebpackOnBuildPlugin = require('on-build-webpack');


var PAGE_ROOT_PATH = './pages',
    TEMPLATE_ROOT_PATH = './template',
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
            var dirName = pathName.replace('pages/', '');
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

/**
 * 通知
 * @param  {[type]} title   [description]
 * @param  {[type]} message [description]
 * @param  {[type]} sound   [description]
 * @return {[type]}         [description]
 */
function pushNotification(title, message, sound) {
    sound = sound || false;

    notifier.notify({
        title: title,
        message: message,
        sound: sound
    }, function (err, respond) {
        if (err) console.error(err);
    });
}



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
fs.writeFile('../site/routes/routes.js', routes, function (err) {
    if (err) {
        console.error(err);
    }
});

entries.base_css = [TEMPLATE_ROOT_PATH, 'base.less.js'].join('/');

module.exports = {

    entry: entries,

    output: {
        path: 'dist/src' ,
        filename: "[name].js",
        chunkFilename: "[name].js",
        publicPath: "/dist/src/"
    },
    externals: {
	'react': 'window.React',
	'react/addons': 'window.React',
	'jquery': 'window.jQuery',
	'jQuery': 'window.jQuery',
	'underscore': 'window._',
	'pubsub-js': 'window.PubSub',
    },
    resolve: {
        alias: {
            'base_path': path.resolve(__dirname + '/base'),
            'page_path': path.resolve(__dirname + '/pages'),
            'module_path': path.resolve(__dirname + '/module'),
            'template_path': path.resolve(__dirname + '/template'),
        }
    },
    module: {
        loaders: [
            { test: /\.less$/, loader: 'style-loader!css-loader!less-loader' },
            { test: /\.css$/, loader: "style!css" },


            {
                test: /\.jsx?$/,
                  exclude: /(node_modules|bower_components)/,
                  loader: 'babel', // 'babel-loader' is also a legal name to reference
                  query: {
                    presets: ['react', 'es2015']
                  }
            },
            { test: /\.(jpg|png)$/, loader: "file-loader?name=[path][name].[ext]" }
        ]
    },

    plugins: [
        new PathOrderPlugin(),

        new WebpackOnBuildPlugin(function(stats) {
            var compilation = stats.compilation;
            var errors = compilation.errors;
            if (errors.length > 0) {
                var error = errors[0];
                pushNotification(error.name, error.message, 'Glass');
            }
            else {
                var message = 'takes ' + (stats.endTime - stats.startTime) + 'ms';

                var warningNumber = compilation.warnings.length;
                if (warningNumber > 0) {
                    message += ', with ' + warningNumber + ' warning(s)';
                }

                pushNotification('webpack building done', message);
            }
        })
    ]
};
