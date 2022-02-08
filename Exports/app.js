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

  function dbCreate() {
    // insert one row into the langs table
    db.run(`INSERT INTO goals(date) VALUES(?)`, ['C'], function(err) {
      if (err) {
        return console.log(err.message);
      }
      // get the last insert id
      console.log(`A row has been inserted with rowid ${this.lastID}`);
    });

    // close the database connection
    db.close();
  }
});
