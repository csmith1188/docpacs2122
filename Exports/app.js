const csv = require('csvtojson')
const fs = require('fs');
const ejs = require('ejs');
const express = require('express');
const app = express()
const port = 8000;
app.use(express.urlencoded({
  extended: false
}))
app.set('view engine', 'ejs')
app.listen(8000)

console.log("Listening on port " + port);
var alldata = {}
let docpacDate = []

fs.readdir(__dirname + '/data', async (err, files) => {
  if (err) console.log(err)
  for (var file of files) {
    if (file.split('.')[1] == 'csv') {
      await csv().fromFile(__dirname + '/data/' + file).then((jsonObj) => {
        alldata[file.split('.')[0]] = jsonObj
      })
    }
  }
  //console.log(alldata);
  // console.log(alldata["required_documentation"]);

  function docpacSearch(docpacName) {
    for (var x in alldata) {
      //console.log(alldata[x]);
      for (var y in alldata[x]) {
        //console.log(alldata[x][y]);
        if (alldata[x][y]["DocPac Date"] == docpacName) {
          console.log(alldata[x][y]);
          docpacDate.push(alldata[x][y]);
        }
      }
    }
  }

  function typeSearch(typeName) {
    for (var x in alldata) {
      //console.log(alldata[x]);
      for (var y in alldata[x]) {
        //console.log(alldata[x][y]);
        if (alldata[x][y]["Type"] == typeName) {
          //console.log(alldata[x][y]);
        }
      }
    }
  }
  // // Search by docpac date (ex: Dec03)
  //docpacSearch('Sep03')
  // // Search by type of assignment (ex: Print or pg.2)
  // typeSearch("pg.2")

  // Website Code

  app.get('/', (req, res) => {
    res.render('index')
  });
  app.get('/cleared', (req, res) => {
    res.render('cleared')
  });

  app.post('/', (req, res) => {
    let date = {
      date: req.body.date
    }
    docpacSearch(date.date)
    res.render('info', {
      docpacDate: docpacDate
    })
  });
  app.post('/cleared', (req, res) => {
    docpacDate = []
    console.log(docpacDate);
    res.render("cleared")
  });
});
