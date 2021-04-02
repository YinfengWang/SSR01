const express = require('express');
const ReactSSR = require('react-dom/server');
const fs = require('fs');
const path = require('path');

const isDev = process.env.NODE_ENV === 'development';


const app = express();

if (!isDev) {
    const serverEntry = require('../dist/server.entry.js').default;//eslint-disable-line
    const template = fs.readFileSync(path.join(__dirname, '../dist/index.html'), 'UTF-8');

    app.use('/pulic', express['static']((path.join(__dirname, '../dist'))));
    app.get('*', function (reg, res) {
        const appString = ReactSSR.renderToString(serverEntry);
        res.send(template.replace('<!-- App -->', appString));
    });

} else {
    const devStatic = require('./util/dev-static');//eslint-disable-line
    devStatic(app);
}


app.listen('3333', function () {
    console.log('server is listening is 3333 !');
});
