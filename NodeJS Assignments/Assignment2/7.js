const express = require('express');
const bodyParser = require('body-parser');
const app = express();

var items = [{ id: 1, product: 'Product1' }, { id: 2, product: 'Product2' }, { id: 3, product: 'Product3' }];

app.use(bodyParser.urlencoded({ extended: false }));

app.get('/items', (req, res) => {
  if (items) {
    res.send(items);
  } else {
    res.send('Empty');
  }
});

app.post('/items', (req, res) => {
  var item = req.body;
  items.push(item);
  res.send('item added');
});

app.get('/items/:id', (req, res) => {
  const itemId = parseInt(req.params.id);
  const item = items.find(item => item.id === itemId);
  if (item) {
    res.send(item);
  } else {
    res.send('Item not present');
  }
});

app.patch('/items/:id', (req, res) => {
  var item = items.findIndex(item => item.id == req.params.id);
  if (items[item]) {
    items[item].product = req.body.product;
    res.send('Updated');
  }
  else {
    res.send('Item not present');
  }
});

app.delete('/items/:id', (req, res) => {
  const itemId = parseInt(req.params.id);
  var item = items.find(item => item.id == itemId);
  if (item) {
    items.splice(items.indexOf(item), 1);
    res.json(items);
  }
  else {
    res.send('Item not present');
  }
});

app.listen(8000, console.log("Listening to port 8000"));