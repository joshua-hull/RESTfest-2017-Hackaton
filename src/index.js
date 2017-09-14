const express = require('express');
var MongoClient = require('mongodb').MongoClient;

const app = express();
const PORT = process.env.PORT || 3000;
const MONGO_URL = process.env.MONGO_URL || 'mongodb://<dbuser>:<dbpassword>@ds135444.mlab.com:35444/restfest-2017-hackathon';
let db; // will be assigned later

app.get('/', (req, res) => {
    res.send('Hello, World!');
});

app.get('/hospitals', (req, res) => {
    db.collection('hospitals').find()
        .toArray((err, hospitals) => {
            if (err) {
                console.error(err);
                res.status(500).send(err);
            }
            res.json(hospitals);
        });
});

MongoClient.connect('mongo-url', (err, database) => {
    if (err) console.error(err);

    db = database;
    app.listen(PORT, () => {
        console.log(`Listening on port ${PORT}`);
    })
});
