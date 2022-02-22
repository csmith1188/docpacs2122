const csv=require('csvtojson')
const express = require('express');
const glob = require('glob');
const app = express()
app.set("view engine", "ejs")
app.use(express.urlencoded({ extended: true}));


app.get('/', function(req,res){
  res.render('search', {
    error:"",
    found:""
  })
})



app.post('/', function(req,res){
  var found = 0
  var founddata = []
  if (req.body.search){
    console.log(req.body.search);


    glob("*.csv", function(er,files){
      console.log(files);
      for (var i = 0; i < files.length; i++) {

        csv().fromFile(files[i]).then(function(jsonObj){
          for (var x = 0; x < jsonObj.length; x++) {
            console.log("start");
          console.log(jsonObj[x]);
          console.log("end");

          if (jsonObj[x].Date.includes(req.body.search)) {
              console.log("HEY I FOUND IT");
               founddata.push(jsonObj[x])
              found ++
              console.log(found);
          }

          }

          console.log(founddata);
          console.log(files);
          console.log(files[files.length-1]);


        })
      }

})




  } else {

    res.render('search', {
      error:" you forgot the imput ",
      found:""
    })
    }
  })


app.listen(8000)
