// dependencies
const dotenv = require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

const db = require('./models');

const PORT = process.env.PORT ||8080;

// scraping tools 
// Axios is a promised-based http library, similar to jQuery's Ajax method
// It works on the client and on the server
const axios = require('axios');
const cherrio = require('cheerio');

// initialize express
const app = express();

// setup morgan for logging requests 
const logger = require('morgan');
app.use(logger('dev'));

// setup JSON for parsing request body
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Make public a static folder
app.use(express.static("public"));

// setup handlebars
const exphbs = require('express-handlebars');
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view-engine', 'handlebars');

// database connection - local/delpoyed
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";

mongoose.connect('https://pacific-anchorage-70357.herokuapp.com/', { useNewUrlParser: true });

// Routes


app.listen(PORT, () => {
    console.log('Running on port ' + PORT + "!");
});