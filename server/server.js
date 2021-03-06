const express = require('express');
const ReactSSR = require('react-dom/server');
const bodyparser = require('body-parser');
const session = require('express-session');
const fs = require('fs');
const path = require('path');
const favicon = require('serve-favicon');
const serverRender = require('../server/util/server.render');
const { action } = require('mobx');

const isDev = process.env.NODE_ENV === 'development';


const app = express();
app.use(favicon(path.join(__dirname, '../favicon.ico')));
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended: false}));
app.use(session({
    maxAge: '10' * '60' * '1000',
    name: 'tid',
    resave: false,
    saveUninitialized: false,
    secret: 'react cnode class',
}));

app.use('/api/user', require('./util/handle-login'));
app.use('/api', require('./util/proxy'));

// if (!isDev) {
//     const serverEntry = require('../dist/server.entry.js');//eslint-disable-line
//     const template = fs.readFileSync(path.join(__dirname, '../dist/index.html'), 'UTF-8');

//     app.use('/pulic', express['static']((path.join(__dirname, '../dist'))));
//     app.get('*', function (req, res, next) {
//         serverRender(serverEntry, template, req, res).catch(next);
//     });

// } else {
//     const devStatic = require('./util/dev-static');//eslint-disable-line
//     devStatic(app);
// }

app.use(function (error, req, res, next) {
    console.log(error);
    res.status(500).send(error);
});

app.listen('3333', function () {
    console.log('server is listening is 3333 !');
});
