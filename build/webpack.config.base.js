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
            {
                test: /\.ejs$/,
                use: {
                    loader: 'ejs-compiled-loader',
                    options: {
                        htmlmin: true,
                        htmlminOptions: {
                            removeComments: true,
                        },
                    },
                },
            },
            {
                test: /\.(png|jpg|gif|svg)$/,
                use: {
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]?[hash]',
                    },
                },
            },
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader'],
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
