const csv=require('csvtojson')
const express = require('express');
const glob = require('glob');
const app = express()
app.set("view engine", "ejs")
app.use(express.urlencoded({ extended: true}));




glob("*.csv", function(er,files){
  console.log(files);
  for (var i = 0; i < files.length; i++) {

    csv().fromFile(files[i]).then(function(jsonObj){
      console.log(jsonObj);

    })
  }
})



app.listen(8000)
