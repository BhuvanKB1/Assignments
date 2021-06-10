const express = require('express');
const event = new Date();
const app = express();
app.get('/', function (req, res) {
    res.send('Hello, world!');
})
app.get('/time', function (req, res) {
    res.send(`${event.toISOString()}`);
})
app.listen(process.env.port || 8080);