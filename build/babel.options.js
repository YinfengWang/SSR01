module.exports = {
  presets: [
    ['@babel/preset-env'],
    ['@babel/preset-react']
  ],
  plugins: [
    // plugin-proposal-decorators is only needed if you're using experimental decorators in TypeScript
    ["@babel/plugin-proposal-decorators", { legacy: true }],
    ["@babel/plugin-proposal-class-properties", { loose: true }],
    "react-hot-loader/babel",
  ]
} 