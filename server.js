const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const logger = require('morgan');

const express = require('express');
const app = express();

app.use(logger("dev"));
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);

app.use(express.static(process.cwd() + "/public"));

const exphbs = require('express-handlebars');
app.engine('handlebars', exphbs({ defaultLayout: 'main'})
);

app.set('view engine', 'handlebars');

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";
// Connect to the Mongo DB
mongoose.connect(MONGODB_URI, { useNewUrlParser: true });

// mongoose.connect('mongodb://localhost/newsApp');
const db = mongoose.connection;



db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log('Connected to mongoose');
});

let port = process.env.PORT || 3000;
app.listen(port, function() {
  console.log('Listening on port ' + port);
});