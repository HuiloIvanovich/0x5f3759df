const express = require('express');
const bodyParser = require('body-parser');
const db = require('../config/db');

const users = require('./routes/api/users');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

db();

app.use('/api/users', users);

if (process.env.NODE_ENV === 'production') {
    // Set static folder
    app.use(express.static('../client/build'));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
} else {
    app.get('/', (req, res) => {
        res.send('On server')
    });
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log('Server started');
});