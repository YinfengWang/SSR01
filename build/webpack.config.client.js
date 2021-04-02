const path = require('path');
// const webpack = require('webpack');
const { merge } = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const baseConfig = require('./webpack.config.base');

const isDev = process.env.NODE_ENV === 'development';

const config = {
    mode: isDev ? 'development' : 'production',
    entry: path.join(__dirname, '../client/app.js'),
    output: {
        filename: 'bundle.js',
        chunkFilename: '[name].js',
    },

    plugins: [
        new HtmlWebpackPlugin({
            template: path.join(__dirname, '../client/template.html'),
        }),
    // new webpack.HotModuleReplacementPlugin()
    ],

};

if (isDev) {
    // config.devtool = 'source-map';
    config.entry = ['react-hot-loader/patch', path.join(__dirname, '../client/app.js')];

    config.devServer = {
        contentBase: path.join(__dirname, '../dist'),
        progress: true, // 进度条
        historyApiFallback: true,
        inline: true,
        // host: '0.0.0.0',
        host: '127.0.0.1',
        port: 8888,
        hot: true,
        overlay: {
            errors: true,
        },
    };
}


module.exports = merge(baseConfig, config);
