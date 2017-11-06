var wta = require('./watson-tone-analyzer/index.js');
var wna = require('./watson-nlu/index.js');
var csvEngine = require('./csvEngine/index.js');

exports.wnlu = function(req,res){
  wnlu.arrayAnalyzer(req.body.msgArray)
  .then((data)=>{
    res.status(data.status);
    res.json(data);
  });
}
exports.wtna = function(req,res){
  wta.arrayAnalyzerByTone(req.body.msgArray)
  .then((data)=>{
    res.status(data.status);
    res.json(data)
  });
}
exports.csvToJSON = function(req,res){
  csvEngine.convertCSVtoJSON(req.body.filename)
  .then((data)=>{
    res.status(data.status);
    res.json(data);
  });
}
