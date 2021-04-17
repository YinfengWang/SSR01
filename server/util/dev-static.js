const axios = require('axios');
const webpack = require('webpack');
const ReactDomServer = require('react-dom/server');
const MemoryFs = require('memory-fs');
const path = require('path');
const proxy = require('http-proxy-middleware');
const { matchRoutes } = require('react-router-config');

const webpackServerConfig = require('../../build/webpack.config.server');

const getTemplate = () => new Promise((resolve, reject) => {
    axios.get('http://127.0.0.1:8888/public/index.html')
        .then((res) => {
            resolve(res.data);
        })
        .catch(reject);
});
let serverBundle, createStoreMap, routes;
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
    serverBundle = m.exports.default;
    createStoreMap = m.exports.createStoreMap;
    routes = m.exports.routes;
});
module.exports = (app) => {

    app.use('/public', proxy.createProxyMiddleware({ target: 'http://127.0.0.1:8888', changeOrigin: true }));
    app.get('*', (req, res) => {

        const stores = createStoreMap();

        const matchedRoutes = matchRoutes(routes(), req.path);
        const promises = [];

        matchedRoutes.forEach((item) => {
            if (item.route.loadData) {
                let promise = new Promise((resolve, reject) => {
                    item.route.loadData(stores).then(resolve)
                        .catch(resolve);
                });
                promises.push(promise);
            }
        });
        Promise.all(promises).then((data) => {
            getTemplate().then((template) => {
                const routerContext = {};
                console.log(stores.appStore.name);
                const app = serverBundle(stores, routerContext, req.url);
                const content = ReactDomServer.renderToString(app);
                // 处理路由跳转
                if (routerContext.url) {
                    res.status(302).setHeader('location', routerContext.url);
                    res.end();
                    return;
                }
                res.send(template.replace('<!-- App -->', content));
            });
        });

    });
};
