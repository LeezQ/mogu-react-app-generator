/**
 * system modules
 * @type {[type]}
 */
var fs = require('fs');
var exec = require('child_process').exec;

/**
 * gulp node modules
 * @type {[type]}
 */
var gulp = require('gulp');
var source = require('vinyl-source-stream');
var streamify = require('gulp-streamify');
var uglify = require('gulp-uglify');

var minifyCss = require('gulp-minify-css');
var less = require('gulp-less');

var rootPath = './dist/src';

 var svnPath = ''; // 这里是本地的 svn 地址

var paths = {
    scripts: []
};
var files = fs.readdirSync(rootPath);
files.forEach(function(file) {
    paths.scripts.push(rootPath + '/' + file);
});


gulp.task('js', function() {

    for (var i = 0; i < paths.scripts.length; i++) {
        gulp.src(paths.scripts[i])
            .pipe(gulp.dest(svnPath + 'src'))
            .pipe(streamify(uglify()))
            .pipe(gulp.dest('./dist/'))
            .pipe(gulp.dest(svnPath));
    }

});


gulp.task('jsone', function() {
    var arguments = process.argv.splice(3);
    if (arguments[0] == '-f') {
        console.log(arguments[1]);
        gulp.src('./' + arguments[1])
            .pipe(streamify(uglify()))
            .pipe(gulp.dest('./dist/'))
    };
});


gulp.task('cssone', function() {
    var arguments = process.argv.splice(3);
    if (arguments[0] == '-f') {
        console.log(arguments[1]);
        gulp.src('./' + arguments[1])
            .pipe(less())
            .pipe(minifyCss())
            .pipe(gulp.dest('./dist/'))
    };
});

gulp.task('svn', ['js'], function() {

    var t = new Date().getTime();
    console.log('======= svn up ======');
    console.log(svnPath);
    exec('svn up ' + svnPath, function(err, stdout, stderr) {
        console.log(stdout);
        if(stderr) {
            console.log(stderr);
        }

        exec('svn st ' + svnPath, function(err, stdout, stderr) {
            // 如果有需要 svn add 的文件
            var addFiles = stdout.match(/\?.*/g);
            if (addFiles) {
                for (var i = 0; i < addFiles.length; i++) {
                    var file = addFiles[i].replace('\?', '').trim();
                    console.log('add file : ' + file);
                    exec('svn add ' + file, function(err, stdout, stderr) {
                        console.log(stdout);
                        console.log(stderr);
                    });
                };
            }

            // 如果有需要 svn add 的文件
            var commitFiles = stdout.match(/(A|M).*/g);
            if (commitFiles) {
                console.log('======= svn commit ======');
                exec('svn ci -m"beile: file ' + '" ' + svnPath , function (err, stdout, stderr) {
                    console.log(stdout);
                    console.log(stderr);

                    console.log('time cost: ' + (new Date().getTime() - t) / 1000 + 's =======' );
                });
            };

            console.log('=======  time cost: ' + (new Date().getTime() - t) / 1000 + 's =======');
            // console.log(stderr);
        });
    });
});

gulp.task('default', ['svn']);
