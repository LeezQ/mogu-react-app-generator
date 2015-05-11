### 蘑菇街 react app generator
#### 使用方法
git clone this repo;
npm install webpack -g
npm install gulp -g
npm install


### react app generator for node server version
#### how to use ?
```
    # 安装相关的 node 工具
    npm install webpack -g // webpack 打包
    npm install gulp -g // gulp 压缩
    npm install express-generator -g // 生成 express
    npm install nodemon -g // 实时监听 node 应用

```

#### how to run ?

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

### 修改site/views/index.jade

```
doctype html
html
  head
    meta(charset="UTF-8")
    title= title
  body
    script.
      var data = {
      "name": "hello",
      "typelist": [12,3,21,3]
      }

    #body_wrap
      .container-fluid
        #nav
        .content-wrap.clearfix
          #sidebar.sidebar.fl
          #content.content.fl
    script(src="/node_modules/react/dist/react.js")
    script(src="/node_modules/jquery/dist/jquery.min.js")
    script(src="/node_modules/mogu-lotus-proxy/proxy.js")
    script(src=scripts[0])
    
```
