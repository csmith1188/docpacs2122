const csv = require('csvtojson')
const fs = require('fs');
const sqlite3 = require('sqlite3').verbose();
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
var docpacDate = []


fs.readdir(__dirname + '/data', async (err, files) => {
  if (err) console.log(err)
  for (var file of files) {
    if (file.split('.')[1] == 'csv') {
      await csv().fromFile(__dirname + '/data/' + file).then((jsonObj) => {
        alldata[file.split('.')[0]] = jsonObj
      })
    }
  }


  function delay(n) {
    return new Promise(function(resolve) {
      setTimeout(resolve, n * 1000);
    });
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
          //docpacDate.push(alldata[x][y]);

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

  // Search by docpac date (ex: Dec03)
  //docpacSearch('Sep03')
  // Search by type of assignment (ex: Print or pg.2)
  //typeSearch("pg.2")

  async function dbInsert() {
    for (var x in alldata) {
      for (var y in alldata[x]) {
        await delay(0.1);
        if (x == "goals" || x == "changes") {
          // insert one row into the langs table
          let db = new sqlite3.Database('db/database.db');
          console.log(x);
          db.run(`INSERT INTO "${x}" (date, text) VALUES("${alldata[x][y]["DocPac Date"]}", "${alldata[x][y][x]}")`, function(err) {
            if (err) {
              return console.log(err.message);
            }
            // get the last insert id
            console.log(`A row has been inserted with rowid ${this.changes}`);
          });
          // close the database connection
          db.close();
        } else if (x == "included" || x == "required") {
          // insert one row into the langs table
          let db = new sqlite3.Database('db/database.db');
          console.log(x);
          db.run(`INSERT INTO "${x}" (date, type, name) VALUES("${alldata[x][y]["DocPac Date"]}", "${alldata[x][y]["Type"]}", "${alldata[x][y]["Assignment Name"]}")`, function(err) {
            if (err) {
              return console.log(err.message);
            }
            // get the last insert id
            console.log(`A row has been inserted with rowid ${this.changes}`);
          });
          // close the database connection
          db.close();
        } else if (x == "events") {
          // insert one row into the langs table
          let db = new sqlite3.Database('db/database.db');
          console.log(x);
          db.run(`INSERT INTO "${x}" (date, event, type, text) VALUES("${alldata[x][y]["DocPac Date"]}", "${alldata[x][y]["Event Date"]}", "${alldata[x][y]["Type"]}", "${alldata[x][y]["Event Text"]}")`, function(err) {
            if (err) {
              return console.log(err.message);
            }
            // get the last insert id
            console.log(`A row has been inserted with rowid ${this.changes}`);
          });
          // close the database connection
          db.close();
        }
      }
    }
  }

  function search(location) {
    let sql = "";
    if (location == "goals" || location == "changes") {
      sql = `SELECT
                        date date,
                        text text
                  FROM ${location}`;
    } else if (location == "included" || location == "required") {
      sql = `SELECT
                        date date,
                        type type,
                        name name
                  FROM ${location}`;
    } else if (location == "events") {
      sql = `SELECT
                        date date,
                        event event,
                        type type,
                        text text
                  FROM ${location}`;
    }
    let db = new sqlite3.Database('db/database.db');
    db.all(sql, (err, row) => {
      //console.log(row);
      docpacDate.push(row)
      //console.log(docpacDate);
      if (err) {
        throw err;
      }
    });
    //console.log(docpacDate);
    return docpacDate
    db.close()
  }

  // close the database connection

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
  app.get('/insert', (req, res) => {
    res.render('insert')
  });

  app.post('/', (req, res) => {
    let date = {
      info: req.body.info
    }
    console.log(date.info);
    var docPacDate = search(date.info)
    //console.log(docPacDate);
    res.render('info', {
      docpacDate: docPacDate,
      info: date.info
    })
  });
  app.post('/cleared', (req, res) => {
    docpacDate = []
    console.log(docpacDate);
    res.render("cleared")
  });
  app.post('/insert', (req, res) => {
    let db = new sqlite3.Database('db/database.db');
    db.serialize(() => {
    if (req.body.date) {
      if (req.body.goals) {
        db.run(`INSERT INTO "goals" (date, text) VALUES("${req.body.date}", "${req.body.goals}")`, function(err) {
          if (err) {
            return console.log(err.message);
          }
          // get the last insert id
          console.log(`A row has been inserted with rowid ${this.changes}`);
        });
        // close the database connection
      }
      if (req.body.changes) {
        db.run(`INSERT INTO "changes" (date, text) VALUES("${req.body.date}", "${req.body.changes}")`, function(err) {
          if (err) {
            return console.log(err.message);
          }
          // get the last insert id
          console.log(`A row has been inserted with rowid ${this.changes}`);
        });
        // close the database connection
      }
      if (req.body.event && req.body.event_type && req.body.event_text) {
        var errorCodeEvent = ""
        db.run(`INSERT INTO "events" (date, event, type, text) VALUES("${req.body.date}", "${req.body.event}", "${req.body.event_type}", "${req.body.event_text}")`, function(err) {
          if (err) {
            return console.log(err.message);
          }
          // get the last insert id
          console.log(`A row has been inserted with rowid ${this.changes}`);
        });
        // close the database connection
      } else if (req.body.event || req.body.event_type || req.body.event_text) {
        var errorCodeEvent = "Error: Event section wasn't filled out correctly"
      }
      if (req.body.included_type && req.body.included_text) {
        var errorCodeIncluded = ""
        db.run(`INSERT INTO "included" (date, type, name) VALUES("${req.body.date}", "${req.body.included_type}", "${req.body.included_text}")`, function(err) {
          if (err) {
            return console.log(err.message);
          }
          // get the last insert id
          console.log(`A row has been inserted with rowid ${this.changes}`);
        });
        // close the database connection
      } else if (req.body.included_type || req.body.included_text) {
        var errorCodeIncluded = "Error: Included section wasn't filled out correctly"
      }
      if (req.body.required_type && req.body.required_text) {
        var errorCodeRequired = ""
        db.run(`INSERT INTO "required" (date, type, name) VALUES("${req.body.date}", "${req.body.required_type}", "${req.body.required_text}")`, function(err) {
          if (err) {
            return console.log(err.message);
          }
          // get the last insert id
          console.log(`A row has been inserted with rowid ${this.changes}`);
        });
        // close the database connection
      } else if (req.body.required_type || req.body.required_text) {
        var errorCodeRequired = "Error: Required section wasn't filled out correctly"
      }
      if (errorCodeEvent || errorCodeIncluded || errorCodeRequired) {
        var errorCode = ""
        if (errorCodeEvent) {
           errorCode = errorCodeEvent
        } else if (errorCodeIncluded) {
           errorCode = errorCodeIncluded
        } else if (errorCodeRequired) {
           errorCode = errorCodeRequired
        }
        res.render('insertpost', {
          mainbody: errorCode
        })
      } else {
      res.render('insertpost', {
        mainbody: `You successfully inserted data to the table.`
      })
    }
    } else {
      res.render('insertpost', {
        mainbody: "Error: No date provided"
      })
    }
  })
  db.close()
  });

});
