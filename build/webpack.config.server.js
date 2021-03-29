const path = require('path')
module.exports = {
    target: 'node',//打包候使用在那个环境
    entry: {
        app: path.join(__dirname, '../client/server.entry.js')
    },
    output: {
        filename: 'server.entry.js',
        path: path.join(__dirname, '../dist'),
        publicPath: '/public',
        libraryTarget: 'commonjs2',//使用规范， 最新模块加载方案
        // clean: true,
    },
    mode:'development',
    resolve: {
        // 要解析的文件的扩展名
        extensions: [".js", ".jsx", ".json"],
        // 解析目录时要使用的文件名
        mainFiles: ["index"],
    },
    module: {
        rules: [
            {
                test:  /\.(js|jsx)$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            ['@babel/preset-env'],
                            ['@babel/preset-react']
                        ],
                       
                    },
                },
                exclude: /node_modules/
            },
        ]
    },


}