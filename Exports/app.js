const csv = require('csvtojson')
const fs = require('fs');
const sqlite3 = require('sqlite3').verbose();


var data = {};

fs.readdir(__dirname + '/csv/', async (err, files) => {
	if (err) console.log(err)
	for (var file of files) {
		if (file.split('.')[1] == 'csv') {
			var csvFilePath = __dirname + `/csv/${file}`;
			// Async / await usage
			data[file.split('.')[0]] = await csv({
				delimiter: ','
			}).fromFile(csvFilePath);
		}
	}
  data = JSON.stringify(data);
	fs.writeFile(__dirname + '/data.json', data, (err) => {
		if (err) {
			console.log(err);
		}
	})
});


let jsonData = fs.readFileSync(__dirname + '/data.json', 'utf8');
jsonData = JSON.parse(jsonData);

function getAllFromDate(date) {
  let dateData = {};
  for (let sheet in jsonData) {
    dateData[sheet] = [];
    jsonData[sheet].forEach(row => {
      if (row.docPacDate == date) dateData[sheet].push(row);
    });
  };
  return dateData;
}

function getAllFromType(type) {
  let typeData = {};
  for (let sheet in jsonData) {
    typeData[sheet] = [];
    jsonData[sheet].forEach(row => {
      if (row.type == type) typeData[sheet].push(row);
    });
  };
  return typeData;
}

// console.log(getAllFromType("Review"));




const db = new sqlite3.Database('./data.db', sqlite3.OPEN_READWRITE, (err) => {
	if (err) return console.error(err.message);

	console.log("connection online")
});

for (let table in jsonData) {
	jsonData[table].forEach(row => {
		let columns = ``;
		let values = ``;
		for (let key in row) {
			columns += `"${key}", `;
			values += `"${row[key]}", `;
		};
		columns = columns.slice(0, -2);
		values = values.slice(0, -2);
		console.log(`
			INSERT INTO ${table} (${columns})
			VALUES (${values})
		`);
		db.run(`
			INSERT INTO ${table} (${columns})
			VALUES (${values})
		`);
	});
}
db.close((err) =>{
	if (err) return console.error(err.message);
});
