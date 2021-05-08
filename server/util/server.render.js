const axios = require('axios');
const webpack = require('webpack');
const ReactDomServer = require('react-dom/server');
const MemoryFs = require('memory-fs');
const path = require('path');
const proxy = require('http-proxy-middleware');
const { matchRoutes } = require('react-router-config');
const ejs = require('ejs');
const serialize = require('serialize-javascript');
const Helmet = require('react-helmet').default;
const webpackServerConfig = require('../../build/webpack.config.server');


const getStoreState = (stores) => Object.keys(stores).reduce((result, storeName) => result[storeName] = stores[storeName].toJson(), {}
);

module.exports = (bundle, template, req, res) => new Promise((resolve, reject) => {

    const stores = bundle.createStoreMap();
    const createApp = bundle.default;
    const routes = bundle.routes;
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
        const routerContext = {};
        const app = createApp(stores, routerContext, req.url);
        const states = getStoreState(stores);
        const content = ReactDomServer.renderToString(app);
        // 处理路由跳转
        if (routerContext.url) {
            res.status(302).setHeader('location', routerContext.url);
            res.end();
            return;
        }
        const helmet = Helmet.renderStatic();// 用法欠缺
        const html = ejs.render(template, {
            appString: content,
            initialVlaue: serialize(states),
            meta: helmet.meta.toString(),
            title: helmet.title.toString(),
            style: helmet.style.toString(),
            link: helmet.link.toString(),
        });
        res.send(html);
    // res.send(template.replace('<!-- App -->', content));
    });

});
