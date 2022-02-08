const csv=require('csvtojson')
const express = require('express');
const glob = require('glob');
const app = express()
const sqlite3 = require('sqlite3').verbose();
app.set("view engine", "ejs")
app.use(express.urlencoded({ extended: true}));

let db = new sqlite3.Database('sqlDataBase.sqlite3', (err) => {
  console.log('Connected to the db database.');
});

console.log(db.all("SELECT * FROM Goals", function(err, rows) {
        rows.forEach(function (row) {
            console.log(row.date, row.goal);
        })}));

db.close();

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



res.render('search', {error:"",  found:founddata  });


  } else {

    res.render('search', {
      error:" you forgot the imput ",
      found:""
    })
    }
  })


app.listen(8000)
