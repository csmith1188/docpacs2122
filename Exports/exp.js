const sqlite3 = require('sqlite3').verbose();
const express = require('express');
const app = express();
const port = 5600;
const fs = require('fs');
const path = require('path');

app.use(express.urlencoded({
  extended: true
}));
let db = new sqlite3.Database('data.db');
app.use( express.static( "public" ) );
app.use(express.static(path.join(__dirname, '/views')));
app.use('/images', express.static(__dirname + '/Images'));

app.set('view engine', 'ejs');
app.get('/',(req, res) => {
  res.render('index')
})
//404 Page
app.use((req, res) => {
  res.render('404.ejs');
})
app.get('/create',(req, res) => {
  res.render('create')
})
app.post('/create',(req, res) => {
  res.render('create')
})
app.post('/search', (req, res) => {
  let tableName= req.body.category;
  db.all(`SELECT * from ${tableName}`, [], (err, rows) => {
    if (err) {
      throw err;
    } else {
      console.log(rows);
      res.render('search', {
        data: rows
      });
    }
  });
})









app.listen(port);
