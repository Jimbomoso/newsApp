// dependencies
const dotenv = require('dotenv').config();
const express = require('express');
const axios = require('axios');
const cherrio = require('cheerio');
const mongoose = require('mongoose');
const path = require('path');

const PORT = process.env.PORT ||8080;

// require models
const note = require('./models/note');
const article = require('./models/article')

// initialize express
const app = express();

// setup morgan for logging requests 
const logger = require('morgan');
app.use(logger('dev'));

// setup JSON for parsing request body
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// setup handlebars
const exphbs = require('express-handlebars');
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view-engine', 'handlebars');

// database connection - local/delpoyed
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";

mongoose.connect('https://pacific-anchorage-70357.herokuapp.com/', { useNewUrlParser: true });

app.listen(PORT, () => {
    console.log('Running on port ' + PORT + "!");
});