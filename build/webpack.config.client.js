const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const config = {
  mode : 'production',
  entry:  path.join(__dirname, '../client/app.js'),
  watch: false,
  output: {
    path: path.join(__dirname, '../dist'),
    publicPath: '/public/',
    filename: "bundle.js",
    chunkFilename: '[name].js'
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              ['@babel/preset-env'],
              ['@babel/preset-react']
            ],
            plugins: [
              // plugin-proposal-decorators is only needed if you're using experimental decorators in TypeScript
              // ["@babel/plugin-proposal-decorators", { legacy: true }],
              ["@babel/plugin-proposal-class-properties", { loose: true }],
              "react-hot-loader/babel",
            ]
          },
        },
        exclude: /node_modules/
      },
    ]
  },
  resolve: {
    extensions: ['.json', '.js', '.jsx'],
    alias: {
      'react-dom': '@hot-loader/react-dom',
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, '../client/template.html')
    }),
   // new webpack.HotModuleReplacementPlugin()
  ],

};

module.exports = (env, argv) => {

  if (argv.mode === 'development') {
    // config.devtool = 'source-map';
    config.entry=['react-hot-loader/patch', path.join(__dirname, '../client/app.js')],
    config.devServer = {
      contentBase: path.join(__dirname, '../dist'),
      progress: true,//进度条
      historyApiFallback: true,
      inline: true,
      host: '0.0.0.0',
      port: 8888,
      hot: true,
      overlay: {
        errors: true,
      }
    }
  }

  if (argv.mode === 'production') {
    //...
  }

  return config;
};