const csv = require('csvtojson')
const express = require('express');
const glob = require('glob');
const app = express()
app.set("view engine", "ejs")
app.use(express.urlencoded({
  extended: true
}));


app.get('/', function(req, res) {
  res.render('search', {
    error: "",
    found: ""
  })
})



app.post('/', function(req, res) {
  var found = 0
  var founddata = []
  if (req.body.search) {
    console.log(req.body.search);


    glob("*.csv", function(er, files) {
      console.log(files);

      for (var i = 0; i < files.length; i++) {

        csv().fromFile(files[i]).then(function(jsonObj) {
          for (var x = 0; x < jsonObj.length; x++) {
            console.log("start");
            console.log(jsonObj[x]);
            console.log("end");
            console.log(files);

            if (jsonObj[x].Date.includes(req.body.search)) {
              console.log("Record found");
              founddata.push(jsonObj[x])
            }

          }

          console.log(founddata);
        })
      }

    })

    res.render('search', {
      error: "",
      found: founddata
    });


  } else {

    res.render('search', {
      error: " you forgot the input ",
      found: ""
    })
  }
})


app.listen(8000)
