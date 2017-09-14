const express = require('express');
const mongo = require('mongodb');
const MongoClient = mongo.MongoClient;
const ObjectID = mongo.ObjectID;

const app = express();
const PORT = process.env.PORT || 3000;
const MONGO_URL = 'mongodb://api:password@ds135444.mlab.com:35444/restfest-2017-hackathon';
const COLLECTIONS = {
    hospitals: 'hospitals',
    measures: 'measures'
};
let db; // will be assigned later

function returnResults(res) {
    return (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).send(err);
        }
        res.json(results);
    }
}

app.get('/', (req, res) => {
    res.send('Hello, World!');
});

app.get('/hospitals', (req, res) => {
    db.collection(COLLECTIONS.hospitals).find()
        .toArray(returnResults(res));
});

app.get('/hospitals/:id', (req, res) => {
    db.collection('hospitals').findOne({ _id: new ObjectID(req.params.id) })
        .then(hospital => res.json(hospital));
});

MongoClient.connect(MONGO_URL, (err, database) => {
    if (err) console.error(err);

    db = database;
    app.listen(PORT, () => {
        console.log(`Listening on port ${PORT}`);
    })
});
