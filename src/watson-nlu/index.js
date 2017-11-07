var fs = require('fs');
var NaturalLanguageUnderstandingV1 = require('watson-developer-cloud/natural-language-understanding/v1.js');
var credentials = require('./credentials.json');
var Q = require('q');
var nlu = new NaturalLanguageUnderstandingV1({
  username: credentials.username,
  password: credentials.password,
  version_date:'2017-02-27'
});
var analyzer = function(msg){
var analyzerDefer = Q.defer();
nlu.analyze({
  'html': msg,
  'features': {
    'keywords': {},
    'sentiment': {},
    'concepts':{},
    'entities': {},
    'categories': {},
    'metadata': {}
  }
}, function(err, response) {
     if (err){
       console.log('error:', err);
       analyzerDefer.resolve({"status":response.statusCode,"body":err,"msg":msg});
     }
     else{
       analyzerDefer.resolve({"status":response.statusCode,"body":response,"msg":msg});
     }
 });
 return analyzerDefer.promise;
}
//var textArray = ["Eu sou apaixonado por maçãs.","Eu odeio pêras.","Eu tolero uvas."];
exports.arrayAnalyzer = function(textArray){
  var arrayDefer = Q.defer();
  var analysisArray = [];
  for(var i=0;i<textArray.length;i++){
    var x = i;
    var limit = textArray.length;
    analyzerByTone(textArray[i])
    .then(
      (data)=>{
        //console.log("----------------------------------------");
        //console.log("Text: ", data.msg);
        //console.log("Tone: ", JSON.stringify(data.body,null,2) );
        analysisArray.push({"text":data.msg,"sentiment":data.body.sentiment});
        if((x+1)==limit){
          //console.log("------------------------------------");
          arrayDefer.resolve({"status":200,"body":analysisArray});
        }
      }
    );
  }
  return arrayDefer.promise;
}
