const csv=require('csvtojson')
const express = require('express');
const glob = require('glob');
const sqlite3 = require('sqlite3').verbose();
const app = express()
app.set("view engine", "ejs")
app.use(express.urlencoded({ extended: true}));

let db = new sqlite3.Database('sql.db', (err) => {
 console.log('Connected to the db database.');
});
var search = []


//db.close();

console.log("last");
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





console.log(db.all("SELECT * FROM Goals", function(err, rows) {
  rows.forEach(function (row) {
    console.log(row.date);
    if (row.date.includes('Sep17')){
      search.push(row)

    }


  })
  console.log(search);
  res.render('search', {error:"",  found:search  });
}));
  } else {

    res.render('search', {
      error:" you forgot the imput ",
      found:""
    })
    }
  })


app.listen(8000)
