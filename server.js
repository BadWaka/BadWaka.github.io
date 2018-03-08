const express = require('express');

// initial
const app = express();

// set static files path
app.use('/static', express.static('static'));

// routers
app.get('/', function (req, res) {
    res.send('hello world!');
});

// server
const server = app.listen(3001, function () {
    const host = server
        .address()
        .address;
    const port = server
        .address()
        .port;
    console.log(`Example app listening at http://${host}:${port}`);
});