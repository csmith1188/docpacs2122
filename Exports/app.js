const csv=require('csvtojson')
const express = require('express');
const glob = require('glob');
const app = express()
app.set("view engine", "ejs")
app.use(express.urlencoded({ extended: true}));


app.get('/', function(req,res){
  res.render('search', {
    error:""
  })
})

app.post('/', function(req,res){


  if (req.body.search){
    console.log(req.body.search);


    glob("*.csv", function(er,files){
      console.log(files);
      for (var i = 0; i < files.length; i++) {

        csv().fromFile(files[i]).then(function(jsonObj){
          for (var i = 0; i < jsonObj.length; i++) {
            console.log("start");
          console.log(jsonObj[i]);
          console.log("end");
          }
          console.log(jsonObj);

        })
      }
    })



    res.render('search', {
      error:""
    })} else {
      res.render('search', {
        error:" you forgot the imput "
      })
    }})


app.listen(8000)
