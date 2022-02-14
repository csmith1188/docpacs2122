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
app.get('/create',(req, res) => {
  res.render('create')
})
app.post('/create',(req, res) => {
  if (!req.body.date) {
    res.send("Error: No DocPac date");
  } else {
    let categories = ["changes", "events", "goals", "included", "required"];
    categories.forEach(category => {
      if (req.body[category + "Type"] && !req.body[category]) {
        res.send("Error: Not enough data");
      } else {
        db.serialize(() => {
          db.run(`INSERT INTO changes ("date, "type", "text") VALUES ("${req.body.date}", "${req.body.changesType}", "${req.body.changes}")`);
          db.run(`INSERT INTO events ("date, "type", "text") VALUES ("${req.body.date}", "${req.body.eventsType}", "${req.body.events}")`);
          db.run(`INSERT INTO goals ("date, "type", "text") VALUES ("${req.body.date}", "${req.body.goalsType}", "${req.body.goals}")`);
          db.run(`INSERT INTO includedDocumentation ("date, "type", "text") VALUES ("${req.body.date}", "${req.body.includedType}", "${req.body.included}")`);
          db.run(`INSERT INTO requiredDocumentation ("date, "type", "text") VALUES ("${req.body.date}", "${req.body.requiredType}", "${req.body.required}")`);
        });
        res.send("Inserted into database.");
      }
    });
  }
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
