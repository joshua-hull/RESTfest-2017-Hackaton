const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.send('Hello, World!');
});

app.get('/hospitals', (req, res) => {
    // res.json()
});

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
})