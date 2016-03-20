// NPM packages
var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var logger = require('morgan');

var app = express();

//Setting Up DB and connecting
var db = 'mongodb://localhost/yardsale';
var PORT = process.env.PORT || 8000;
mongoose.connect(db)

// Begin Using NPM Packages
app.use(logger('dev'));
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.json());

//Set Up Routes
var route = require('./routes/route.js');

route.routes(app);

app.listen(PORT, function(){
  console.log("Boom! Listening on port", PORT);
});
