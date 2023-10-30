const express = require('express');

const app = express();
const port = 8000;
const db = require('./db');
app.use(express.urlencoded());

app.get('/list', async (req, res) => {
    const client = await db.connect();
    const result = await db.list_parts(client);

    res.json(result);

    db.close(client);
})

app.get('/insert', async function(req, res) {
    const client = await db.connect();
    let data = {
        name: "test",
        price: 10.00,
        in_stock: 0
    }
    let result = await db.insert(client, data);
    res.send(result);

    db.close(client);
});

app.get('/delete', async function(req, res) {
    const client = await db.connect();

    let part_id = "653f96873f2edd5319f2fed7";

    let result = await db.delete_part(client, part_id);
    res.send(result);

    db.close(client);
});

app.listen(port, () => {
    console.log("Express działa na porcie " + port);
});