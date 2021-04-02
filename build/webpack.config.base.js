const path = require('path');
const ESLintPlugin = require('eslint-webpack-plugin');
const babelOptions = require('./babel.options');

module.exports = {
    mode: 'none',
    output: {
        path: path.join(__dirname, '../dist'),
        publicPath: '/public/',
        // clean: true,
    },

    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                use: {
                    loader: 'babel-loader',
                    options: babelOptions,
                },
                exclude: /node_modules/,
            },
        ],
    },
    resolve: {
        extensions: ['.json', '.js', '.jsx'],
        alias: {
            'react-dom': '@hot-loader/react-dom',
        },
    },
    plugins: [
        new ESLintPlugin({
            fix: true,
            extensions: ['js', 'json', 'coffee'],
            exclude: '/node_modules/',
        }),
    ],
};
