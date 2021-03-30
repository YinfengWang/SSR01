const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const config = {
  mode: 'development',
  entry: path.join(__dirname, '../client/app.js'),
  watch: false,
  output: {
    path: path.join(__dirname, '../dist'),
    publicPath: '/public',
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
              ["@babel/plugin-proposal-class-properties", { "loose": true }],
            ]
          },
        },
        exclude: /node_modules/
      },
    ]
  },
  resolve: {
    extensions: ['.json', '.js', '.jsx']
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, '../client/template.html')
    }),
  ],

};

module.exports = (env, argv) => {

  if (argv.mode === 'development') {
    // config.devtool = 'source-map';
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