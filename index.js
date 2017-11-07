var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var cfenv = require('cfenv');
var conductor = require('./src/conductor.js');

var app = express();

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));


app.post('/convert/csv/json',conductor.csvToJSON);
app.post('/analyze/wnlu',conductor.wnlu);
app.post('/analyze/wtna',conductor.wtna);

var appEnv = cfenv.getAppEnv();

// start server on the specified port and binding host
app.listen(appEnv.port, '0.0.0.0', function() {
  // print a message when the server starts listening
  console.log("server starting on " + appEnv.url);
});
