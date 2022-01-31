const csv=require('csvtojson')
const glob = require('glob');
glob("*.csv", function(er,files){
  console.log(files);
  for (var i = 0; i < files.length; i++) {

    csv().fromFile(files[i]).then(function(jsonObj){
      console.log(jsonObj);
      
    })
  }
})
