'use strict';

var express = require('express');
var mongo = require('mongodb');
var mongoose = require('mongoose');

var cors = require('cors');

var app = express();

// Basic Configuration 
var port = process.env.PORT || 3000;

/** this project needs a db !! **/ 
// mongoose.connect(process.env.MONGOLAB_URI);
process.env.MONGO_URI = 'mongodb+srv://zgleman:grey1127@cluster0-2my3z.mongodb.net/test?retryWrites=true&w=majority';
mongoose.connect(process.env.MONGO_URI);
app.use(cors());

/** this project needs to parse POST bodies **/
// you should mount the body-parser here
var bodyParser = require('body-parser');
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function(req, res){
  res.sendFile(process.cwd() + '/views/index.html');
});

var Schema = mongoose.Schema;
var UrlSchema = new Schema({
  original_url : String,
  short_url : Number
  
});

var Url = mongoose.model("Url", UrlSchema)  
// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.post("/api/shorturl/new", function(req, res){
  var urlToShorten = req.body.url;
  
  var createAndSaveUrl = function(done) {
  var inputUrl = new Url({
  "old_url": urlToShorten,
  "short_url": ""
  });

  inputUrl.save(function(err, data){
  if (err) return done(err);
  
  done(null, data);

})};

  
  
});

app.listen(port, function () {
  console.log('Node.js listening ...');
});
