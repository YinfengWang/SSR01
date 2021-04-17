module.exports = {
    presets: [
        ['@babel/preset-env'],
        ['@babel/preset-react'],
    ],
    plugins: [
    // plugin-proposal-decorators is only needed if you're using experimental decorators in TypeScript
        // ['transform-decorators-legacy', {legacy: true, decoratorsBeforeExport: true}],
        '@babel/plugin-transform-runtime',
        // ['@babel/plugin-syntax-decorators', {legacy: true}],
        // '@babel/plugin-syntax-dynamic-import',
        ['@babel/plugin-proposal-decorators', { legacy: true }],
        ['@babel/plugin-proposal-class-properties', { loose: false, useDefineForClassFields: true }],
        'react-hot-loader/babel',
    ],
};
