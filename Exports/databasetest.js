const sqlite3 = require('sqlite3').verbose();

// open the database
let db = new sqlite3.Database('data.db');

let data = {};
["changes", "events", "goals", "includedDocumentation", "requiredDocumentation"].forEach(tableName => {
  db.all(`SELECT * from ${tableName}`, [], (err, rows) => {
    if (err) {
      throw err;
    } else {
      data[tableName] = rows;
      if (Object.keys(data).length == 5) {
        //Do everything here -- this is when you have all the data
      };
    }
  });
});

// close the database connection
db.close();
