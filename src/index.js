const express = require('express');
const mongo = require('mongodb');
const path = require('path');
const MongoClient = mongo.MongoClient;
const ObjectID = mongo.ObjectID;

const app = express();
const PORT = process.env.PORT || 3000;
const MONGO_URL = 'mongodb://api:password@ds135444.mlab.com:35444/restfest-2017-hackathon';
const COLLECTION = 'hospitals';
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

app.use(express.static(path.join(__dirname, 'public')));
app.get('/', (req, res) => {
    res.send(path.join(__dirname, 'public', 'index.html'));
});

app.get('/hospitals', (req, res) => {
    let selector = {};
    if (req.query.name !== undefined && req.query.name !== '') selector['Hospital Name'] = req.query.name;
    if (req.query.state !== undefined && req.query.state !== '') selector['State'] = req.query.state;
    console.log('Selector:', selector);
    db.collection(COLLECTION).find(selector)
        .toArray(returnResults(res));

    /*
    db.getCollection('hospitals').find({
        $and: [
            {"HCAHPS Measure ID": "H_CLEAN_STAR_RATING" },
            {"State": "SC"}
        ]
    },
    {
        "Hospital Name":1,
        "HCAHPS Measure ID": 1,
        "HCAHPS Question": 1,
        "Patient Survey Star Rating":1
    });
    */
});

app.get('/hospitals/:id', (req, res) => {
    db.collection(COLLECTION).findOne({ _id: new ObjectID(req.params.id) })
        .then(hospital => res.json(hospital));
});

app.get('/measures', (req, res) => {
    db.collection(COLLECTION).find()
        .toArray(returnResults(res));
})

app.get('/measures/:id', (req, res) => {
    db.collection(COLLECTION).findOne({ _id: new ObjectID(req.params.id) })
        .then(measure => res.json(measure));
});

MongoClient.connect(MONGO_URL, (err, database) => {
    if (err) console.error(err);

    db = database;
    app.listen(PORT, () => {
        console.log(`Listening on port ${PORT}`);
    })
});
