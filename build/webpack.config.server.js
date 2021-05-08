const { merge } = require('webpack-merge');
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

};
module.exports = merge(baseConfig, config);
