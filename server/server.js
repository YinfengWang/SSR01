const express = require('express');
const ReactSSR = require('react-dom/server');

const serverEntry = require('../dist/server.entry.js').default;
const fs = require('fs');
const path = require('path')
const template = fs.readFileSync(path.join(__dirname, '../dist/index.html'), 'UTF-8');


const app = express()

app.use('/pulic', express.static((path.join(__dirname, '../dist/'))))
app.get('*', function (reg, res) {
    const appString = ReactSSR.renderToString(serverEntry)
    console.log(template)
    res.send(template.replace('<app/>', appString))
})

app.listen(3333, function () {
    console.log('server is listening is 3333 !')
})