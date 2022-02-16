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
    bodytext: "Joe"
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




})

app.listen(PORT, () => {
  console.log(`Listening on ${PORT}`)
});
