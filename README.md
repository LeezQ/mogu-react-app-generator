### Mogu react app generator for node server version

#### how to use ?
```
    # 安装相关的 node 工具
    npm install webpack -g // webpack 打包
    npm install gulp -g // gulp 压缩
    npm install express-generator -g // 生成 express
    npm install nodemon -g // 实时监听 node 应用

```

#### run it !

```
    # 安装包
    npm install

    # 创建站点
    express site
    cd site
    npm install

    # 修改 site/app.js
    app.use(express.static(path.join(__dirname, 'public'))); 
    => app.use(express.static(path.join(__dirname, '../'))); // 指向到根目录


    # 跑起来
    cd ..
    npm run server &

    # 打包
    npm run pack


```


#### 修改 routes/index.js

```
var express = require('express');
var router = express.Router();

var routesMap = require('./routes');

for (var key in routesMap) {
    /* GET home page. */
    (function(key) {
      if (routesMap.hasOwnProperty(key)) {
          router.get(key, function(req, res, next) {

            res.render('index', { 
                  title: 'Express',
                  scripts: routesMap[key]
              });
          });
      };
    })(key);

}

module.exports = router;


```
