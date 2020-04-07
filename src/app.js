const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();
const router = express.Router();

mongoose.connect('mongodb://localhost/spotfree', { useFindAndModify: false });

// rotas
const main = require('./routes/main');
const music = require('./routes/music');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/', main);
app.use('/music', music);

module.exports = app;