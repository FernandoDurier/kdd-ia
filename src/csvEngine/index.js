var Q = require('q');
const csv = require('csvtojson');
var fs = require('fs');
const readStreamDefaults = {
  flags: 'r',
  encoding: null,
  fd: null,
  mode: 0o666,
  autoClose: true
};
exports.convertCSVtoJSON = function(filename){
  var conversionDefer = Q.defer();
  var csvStream = fs.createReadStream('./resources/'+filename+'.csv', readStreamDefaults);
  var finalJsonArray = [];
  csv({noheader:false})
  .fromStream(csvStream)
  .on('json',(jsonObj, rowIndex)=>{ // this func will be called 3 times
      console.log("CSV row to JSON: ", jsonObj);
      finalJsonArray.push(jsonObj);
  })
  .on('done',()=>{
      console.log("done");
      fs.writeFile('./resources/'+filename+'.csv',JSON.stringify(finalJsonArray),
        (err)=>{
          if(err){
            console.log(err);
          }
          else{
            console.log("written");
          }
        }
      );
      conversionDefer.resolve({"status":200,"body":finalJsonArray});
  });
  return conversionDefer.promise;
}
