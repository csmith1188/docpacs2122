const csv = require('csvtojson')
const fs = require('fs');
const sqlite3 = require('sqlite3').verbose();

var alldata = {}

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
      for (var y in x) {
        //console.log(alldata[x][y]);
        if (alldata[x][y]["DocPac Date"] == docpacName) {
          console.log(alldata[x][y]);
        }
      }
    }
  }

  function typeSearch(typeName) {
    for (var x in alldata) {
      for (var y in x) {
        if (alldata[x][y]["Type"] == typeName) {
          console.log(alldata[x][y]);
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
});
