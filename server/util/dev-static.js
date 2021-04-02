const axios = require('axios');
const webpack = require('webpack');
const ReactDomServer = require('react-dom/server');
const MemoryFs = require('memory-fs');
const path = require('path');
const proxy = require('http-proxy-middleware');
const favicon = require('serve-favicon');

const webpackServerConfig = require('../../build/webpack.config.server');

const getTemplate = () => new Promise((resolve, reject) => {
    axios.get('http://127.0.0.1:8888/public/index.html')
        .then((res) => {
            resolve(res.data);
        })
        .catch(reject);
});
let serverBundle;
const Moudle = module.constructor;
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

    const m = new Moudle();
    m._compile(bundleJs, webpackServerConfig.output.filename);
    serverBundle = m.exports['default'];
});
module.exports = (app) => {
    app.use(favicon(path.join(__dirname, '../../favicon.ico')));
    app.use('/public', proxy.createProxyMiddleware({ target: 'http://127.0.0.1:8888', changeOrigin: true }));
    app.get('*', (req, res) => {
        getTemplate().then((template) => {
            const content = ReactDomServer.renderToString(serverBundle);
            res.send(template.replace('<!-- App -->', content));
        });
    });
};
