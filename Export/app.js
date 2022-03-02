//Converter Declarations
const fs = require("fs");
const csv = require('csvtojson');
const csvFilePath='Changes.csv'

//Server Declarations
const http = require('http');
const PORT = 5000;
const ejs = require('ejs');
const express = require('express');
const app = express();
const sqlite3 = require('sqlite3');


let files = ['Changes.csv', 'Events.csv', 'Goals.csv', 'ID.csv', 'RD.csv']
let allData = {}

files.forEach((file, i) => {
  csv()
  .fromFile(file)
  .then((jsonObj)=>{
    // console.log(jsonObj);
    console.log(file);
    console.log(file.split('.'));
    console.log(file.split('.')[0]);

    allData[file.split('.')[0]] = jsonObj;
  })
});

let db = new sqlite3.Database('database.db', (err) => {
  if (err) {
    return console.error(err.message);
  }
  console.log('Connected to the in-memory SQlite database.');
});

console.log(allData);

app.set('view engine' , 'ejs');

app.use(express.urlencoded({extended:true}))

app.get('/', (req,res) =>{
  res.render('home', {
    bodytext: "This is where the banana slamma will happen!"
  })
})

app.post('/search', (req, res) => {
  console.log(req.body.category);
  let categories = ['Changes', 'ID', 'RD', 'Goals', 'Events']
  if (categories.includes(req.body.category)) {
    db.all(`SELECT * from ${req.body.category};`, (err, results) => {
      if (err) {
        console.log(err);
      } else {
        res.render('home', {
          bodytext: results
        })
      }
    });
  }

app.get('/add', (req, res) => {
  //res.render('add')
  var data = {
      date: req.body.dates,
      goals: req.body.goals,
      id: req.body.ID,
      rd: req.body.RD,
      changes: req.body.changes,
      events: req.body.events,
      inc_type: req.body.ID_type,
      req_type: req.body.req_doc_type,
      event_type: req.body.events_type,
      event_due_date: req.body.event_due
    }

    if (data.date && data.goals) {
      db.run(`INSERT INTO goals(field1, field2) VALUES (?, ?)`, [data.date, `${data.goals}`], (err) => {
        if (err) {
          return console.log(err.message);
        }
        console.log('data was added to goals in DB template')
      })
    }

    if (data.date && data.id) {
      db.run(`INSERT INTO included_doc(field1, field2, field3) VALUES (?, ?, ?)`, [data.date, `${data.inc_type}`, `${data.id}`], (err) => {
        if (err) {
          return console.log(err.message);
        }
        console.log('data was added to included_doc in DB template')
      })
    }

    if (data.date && data.rd) {
      db.run(`INSERT INTO required_doc(field1, field2, field3) VALUES (?, ?, ?)`, [data.date, `${data.req_type}`, `${data.req_doc}`], (err) => {
        if (err) {
          return console.log(err.message);
        }
        console.log('data was added to required_doc in DB template')
      })
    }

})

})

app.listen(PORT, () => {
  console.log(`Listening on ${PORT}`)
});
