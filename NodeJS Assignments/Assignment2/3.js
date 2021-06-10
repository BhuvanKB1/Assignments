const express = require('express')
const app = express()
app.get('/home', function(req, res) {
  res.end('Hello world!');
});
app.listen(process.argv[2]);