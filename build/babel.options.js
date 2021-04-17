module.exports = {
    presets: [
        ['@babel/preset-env', { targets: { esmodules: false } }],
        ['@babel/preset-react', { targets: { esmodules: false } }],
    ],
    plugins: [
    // plugin-proposal-decorators is only needed if you're using experimental decorators in TypeScript
        // ['transform-decorators-legacy', {legacy: true, decoratorsBeforeExport: true}],
        // '@babel/plugin-transform-runtime',
        // ['@babel/plugin-syntax-decorators', {legacy: true}],
        ['@babel/plugin-proposal-decorators', { legacy: true }], // 支持装饰器写法
        ['@babel/plugin-proposal-class-properties', { loose: true }],
        '@babel/plugin-syntax-class-properties',
        'react-hot-loader/babel',
    ],
};
