var fs = require('fs');
var credentials = require('./credentials.json');
var Q = require('q');
var ToneAnalyzerV3 = require('watson-developer-cloud/tone-analyzer/v3');
var tone_analyzer = new ToneAnalyzerV3({
  username: credentials.username,
  password: credentials.password,
  version_date: '2016-05-19'
});
var analyzerByTone = function(msg){
var analyzerDefer = Q.defer();
  var params =   {
    "text":msg,
    "tones":"emotion"
  }
  tone_analyzer.tone(params, function(error, response) {
    if (error){
      console.log('error:', error);
      analyzerDefer.resolve({"status":500, "body":error, "msg":msg});
    }
    else{
      console.log(JSON.stringify(response, null, 2));
      analyzerDefer.resolve({"status":200,"body":response,"msg":msg});
    }
  }
  );
 return analyzerDefer.promise;
}
//var textArray = ["Eu sou apaixonado por maçãs.","Eu odeio pêras.","Eu tolero uvas."];
exports.arrayAnalyzerByTone = functions(textArray){
  var arrayDefer = Q.defer();
  var analysisArray = [];
  for(var i=0;i<textArray.length;i++){
    analyzerByTone(textArray[i])
    .then(
      (data)=>{
        console.log("----------------------------------------");
        console.log("Text: ", data.msg);
        console.log("Tone: ", JSON.stringify(data.body,null,2) );
        analysisArray.push({"text":data.msg,"tone":data.body});
      }
    );
    if(i+1==textArray.length){
      console.log("------------------------------------");
      arrayDefer.resolve({"status":200,"body":analysisArray});
    }
  }
  return arrayDefer.promise;
}
