const { merge } = require('webpack-merge');
const webpack = require('webpack');
const baseConfig = require('./webpack.config.base');
const path = require('path');
const { observe } = require('mobx');

const isDev = process.env.NODE_ENV === 'development';

const config = {
    target: 'node', // 打包候使用在那个环境
    mode: isDev ? 'development' : 'production',
    entry: {
        app: path.join(__dirname, '../client/server.entry.js'),
    },
    // eslint-disable-next-line global-require
    // externals: Object.keys(require('../package.json').dependencies),
    output: {
        filename: 'server.entry.js',
        libraryTarget: 'commonjs2', // 使用规范， 最新模块加载方案
    // clean: true,
    },
    // plugins: [
    //     new webpack.DefinePlugin({
    //         'process.env.API_BASE': '"http://127.0.0.1:8888"',
    //     }),
    // ],

};
module.exports = merge(baseConfig, config);
