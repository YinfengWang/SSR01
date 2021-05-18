const axios = require('axios');
const webpack = require('webpack');
const MemoryFs = require('memory-fs');
const path = require('path');
const proxy = require('http-proxy-middleware');
const webpackServerConfig = require('../../build/webpack.config.server');

const serverRender = require('./server.render');

const getTemplate = () => new Promise((resolve, reject) => {
    axios.get('http://127.0.0.1:8888/public/server.ejs')
        .then((res) => {
            resolve(res.data);
        })
        .catch(reject);
});

const NativeModule = require('module');
const vm = require('vm');
const getModuleFromString = (bundle, filename) => {
    const m = { exports: {} };
    const wrapper = NativeModule.wrap(bundle);
    const script = new vm.Script(wrapper, {
        filename: filename,
        displayErrors: true,
    });
    const result = script.runInThisContext();
    result.call(m.exports, m.exports, require, m);
    return m;
};

let serverBundle;
const mfs = new MemoryFs();
const webpackServerCompiler = webpack(webpackServerConfig);
webpackServerCompiler.outputFileSystem = mfs;
webpackServerCompiler.watch({}, (err, stats) => {
    if (err) {throw err;}
    stats = stats.toJson();
    stats.errors.forEach((err) => {
        console.error(err);
    });
    stats.warnings.forEach((err) => {
        console.warn(err);
    });

    const bundlePath = path.join(
        webpackServerConfig.output.path,
        webpackServerConfig.output.filename
    );

    const bundleJs = mfs.readFileSync(bundlePath, 'utf-8');

    // const m = new Moudle();
    // m._compile(bundleJs, webpackServerConfig.output.filename);
    const m = getModuleFromString(bundleJs, webpackServerConfig.output.filename);

    serverBundle = m.exports;
});


module.exports = (app) => {

    app.use('/public', proxy.createProxyMiddleware({ target: 'http://127.0.0.1:8888', changeOrigin: true }));
    app.get('*', (req, res, next) => {
        if (!serverBundle) {
            return res.send('Waiting for complie,refresh later');
        }
        getTemplate().then((template) => serverRender(serverBundle, template, req, res))
            .catch(next);
    });

};
