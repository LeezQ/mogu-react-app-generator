
module.exports = {
    entry: {
        page_demo: "./app/pages/demo/views/DemoView.jsx"
    },
    output: {
        path: 'dist/src' ,
        filename: "[name].js",
        chunkFilename: "[name].js",
        //publicPath: "/activity2-0/dist/src/"
    },
    externals: {
      'react': 'window.React',
      'jQuery': 'window.jQuery'
    },
    resolve: {
        alias: {
            'base_path': path.resolve(__dirname + '/app/base'),
            'page_path': path.resolve(__dirname + '/app/page'),
            'module_path': path.resolve(__dirname + '/app/module'),
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