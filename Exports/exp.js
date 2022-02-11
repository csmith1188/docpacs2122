const sqlite3 = require('sqlite3').verbose();
const express = require('express');
const app = express();
const port = 5600;
const fs = require('fs');
app.use(express.urlencoded({
  extended: true
}));
let db = new sqlite3.Database('data.db');

app.set('view engine', 'ejs');
app.get('/',(req, res) => {
  res.render('index')
})
app.post('/search', (req, res) => {
let tableName= req.body.category
    db.all(`SELECT * from ${tableName}`, [], (err, rows) => {
      if (err) {
        throw err;
      } else {
console.log(rows);
          res.render('search', {
            data: rows
          })
        };

  });

})









app.listen(port);
