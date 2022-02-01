const csv = require('csvtojson')
const fs = require('fs');

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

console.log(getAllFromType("Review"));
