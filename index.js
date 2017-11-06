var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var cfenv = require('cfenv');
var conductor = require('./src/conductor.js');

var app = express();
app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));
app.use(express.bodyParser({uploadDir:'./resources'}));

app.post('/convert/csv/json',conductor.csvToJSON);
app.post('/analyze/wnlu',conductor.arrayAnalyzer);
app.post('/analyze/wta',conductor.arrayAnalyzerByTone);

app.listen(3000);
console.log("Listenning in localhost:3000");
