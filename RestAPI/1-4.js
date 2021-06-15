const express = require('express');
const bodyParser = require('body-parser');
const app = express();
class Main {
    constructor() {
        this.items = [
            {
                "name": "Apples",
                "quantity": 3
            },
            {
                "name": "Oranges",
                "quantity": 7
            },
            {
                "name": "Pomegranates",
                "quantity": 55
            }
        ];
        this.middleware();
        this.routes();
        this.start();
    }
    middleware() {
        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({ extended: false }));
    }
    routes() {
        var items = this.items;
        app.get('/inventory', (req, res) => {
            if (items) {
                res.json(items);
            } else {
                res.send('List is empty.');
            }
        });
        app.get('/inventory/:itemname', (req, res) => {
            const item = items.find(item => item.name === req.params.itemname);
            if (item) {
                res.send(item);
            } else {
                res.send('Item not present.');
            }
        });
        app.post('/inventory', (req, res) => {
            var item = req.body;
            items.push(item);
            res.json(items);
        });
        app.put('/inventory/:itemname', (req, res) => {
            var item = items.findIndex(item => item.name == req.params.itemname);
            if (items[item]) {
                items[item].quantity = req.body.quantity;
                res.json(items);
            }
            else {
                res.send('Item not present');
            }
        });
        app.delete('/inventory', (req, res) => {
            if (items) {
                items.length = 0;
                res.json(items);
            }
            else {
                res.send('Item not present');
            }
        });
        app.delete('/inventory/:itemname', (req, res) => {
            const item = items.find(item => item.name === req.params.itemname);
            if (item) {
                items.splice(items.indexOf(item), 1);
                res.json(items);
            }
            else {
                res.send('Item not present');
            }
        });
    }
    start() {
        app.listen(8081, () => {
            console.log("Listening to 8081");
        });
    }
}
const main = new Main();