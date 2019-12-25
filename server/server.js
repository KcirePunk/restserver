require('./config/config');

const express = require('express');
const mongoose = require('mongoose');
const app = express();

const bodyParser = require('body-parser');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.use(require('./routes/index'));




mongoose.set('useCreateIndex', true)
mongoose.connect(process.env.URLDB, { useNewUrlParser: true, useUnifiedTopology: true },
        (err, res) => {
            if (err) throw err;

            console.log('Base de datos Online');
        })
    .catch(error => handleError(error));

app.listen(process.env.PORT, () => {
    console.log('Escuchando puerto: ', process.env.PORT);
});