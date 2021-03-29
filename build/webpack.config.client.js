const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
module.exports = {
    entry: {
        app: path.join(__dirname, '../client/app.js')
    },
    output: {
        filename: '[name].[hash].js',
        path: path.join(__dirname, '../dist'),
        publicPath: '/public',
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
                test: /\.(js|jsx)$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            ['@babel/preset-env' ],
                            ['@babel/preset-react']
                        ],
                       
                    },
                },
                  exclude: /node_modules/

            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template:path.join(__dirname,'../client/template.html')
        }),
    ],


}