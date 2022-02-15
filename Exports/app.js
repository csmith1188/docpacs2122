const csv=require('csvtojson')
const express = require('express');
const glob = require('glob');
const sqlite3 = require('sqlite3').verbose();
const app = express()
app.set("view engine", "ejs")
app.use(express.urlencoded({ extended: true}));
app.use(express.static(__dirname + '/public'));

let db = new sqlite3.Database('sql.db', (err) => {
 console.log('Connected to the db database.');
});

var error = []
var search = []
let goallo = 'INSERT INTO Goals(date,goal) VALUES(?,?)';
let includedDoclo = 'INSERT INTO IncludedDocumentation(date,Type,AssignmentNamei) VALUES(?,?,?)';
let requiredDoclo = 'INSERT INTO RequiredDocumentation(date,Type,AssingmentName) VALUES(?,?,?)';
let eventlo = 'INSERT INTO Events(date,EventData,Type,Event) VALUES(?,?,?,?)';
let changelo = 'INSERT INTO Changes(date,Changes) VALUES(?,?)';
//db.close();
console.log("last");
app.get('/', function(req,res){
  res.render('search', {
    error:"",
    found:"",
    date:""

  })
})

app.get('/create', function(req,res){
  res.render('create',
          {error: ""  })
})



app.post('/create', function(req,res){

if (req.body.dateBox) {
  if (req.body.goalBox) {
    let goalvalue = [req.body.dateBox,req.body.goalBox]
    db.serialize(function () {db.run(goallo, goalvalue )})
  }
  if (req.body.incdocType || req.body.incdocBox) {

    if (req.body.incdocBox && req.body.incdocType) {
      let incdocvalue = [req.body.dateBox,req.body.incdocType,req.body.incdocBox]
      db.serialize(function () {db.run(includedDoclo, incdocvalue )})
    } else {
      error.push(" included documentation does not have all data")
    }
  }
  if (req.body.reqdocType || req.body.reqdocBox) {
    if (req.body.reqdocBox && req.body.reqdocType) {
    let reqdocvalue = [req.body.dateBox,req.body.reqdocType,req.body.reqdocBox]
    db.serialize(function () {db.run(requiredDoclo, reqdocvalue )})
    } else {error.push("required documentation does not have all data ")}
}
  if (req.body.changeBox) {
  let changevalue = [req.body.dateBox,req.body.changeBox]
  db.serialize(function () {db.run(changelo, changevalue )})
  }
  if (req.body.eventDate || req.body.eventType || req.body.eventBox) {
    if (req.body.eventType && req.body.eventBox && req.body.eventDate) {
    let eventvalue = [req.body.dateBox,req.body.eventDate,req.body.eventType,req.body.eventBox]
    db.serialize(function () {db.run(eventlo, eventvalue )})
    } else { error.push("event does not have all the data") }
}
} else {
error.push("no date")

}


if (error) {
  res.render('create',
  { error: error})

  }
 else {
  res.render('create',
  { error: ""})
}
console.log(error);
error = []

})


app.post('/', function(req,res){
  var found = 0
  var founddata = []
  if (req.body.search || req.body.dropdown != 'all'){
    if (req.body.dropdown == 'goals'){
      console.log(db.all("SELECT * FROM Goals   ", function(err, rows) {
        rows.forEach(function (row) {
          console.log(row);
          if (req.body.search){
            if (row.date.includes(req.body.search)){
              search.push(row)
            }
          } else {
            search.push(row)
          }
        })
        console.log(search);
        res.render('search', {error:"",  found:search, date: req.body.search });
        search = []
      }));
    }
    if (req.body.dropdown == 'events'){
      console.log(db.all("SELECT * FROM Events   ", function(err, rows) {
        rows.forEach(function (row) {
          console.log(row);
          if (req.body.search){
            if (row.date.includes(req.body.search)){
              search.push(row)
            }
            } else{ search.push(row) }
        })
          console.log(search);
          res.render('search', {error:"",  found:search, date: req.body.search });
          search = []
      }));
    }

    if (req.body.dropdown == 'changes'){
      console.log(db.all("SELECT * FROM Changes   ", function(err, rows) {
        rows.forEach(function (row) {
          console.log(row);
          if (req.body.search){
            if (row.date.includes(req.body.search)){
              search.push(row)
            }
          } else {
            search.push(row)
          }
        })
        console.log(search);
        res.render('search', {error:"",  found:search, date: req.body.search });
        search = []
      }));
    }

    if (req.body.dropdown == 'incdoc'){
      console.log(db.all("SELECT * FROM IncludedDocumentation   ", function(err, rows) {
        rows.forEach(function (row) {
          console.log(row);
          if (req.body.search){
            if (row.date.includes(req.body.search)){
              search.push(row)
            }
          } else {
            search.push(row)
          }
        })
        console.log(search);
        res.render('search', {error:"",  found:search, date: req.body.search });
        search = []
      }));
    }

    if (req.body.dropdown == 'reqdoc'){
      console.log(db.all("SELECT * FROM RequiredDocumentation   ", function(err, rows) {
        rows.forEach(function (row) {
          console.log(row);
          if (req.body.search){
            if (row.date.includes(req.body.search)){
              search.push(row)
            }
          } else {
            search.push(row)
          }
        })
        console.log(search);
        res.render('search', {error:"",  found:search, date: req.body.search });
        search = []
      }));
    }
  } else {
      res.render('search', {
        error:" you forgot the input ",
        found:"",
        date:""
      })
    }
})


app.listen(8000)
