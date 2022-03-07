// Modules
const csv = require('csvtojson')
const fs = require('fs');
var sheets = {};
var express = require('express');
var app = express();
var path = require('path');
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('Bank.db');
//Express Settings
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({ extended: true}));
app.use(express.static('public'));

// READING AND UPDATING CSV FILE!!!!!
fs.readdir(__dirname + '/public/data/sheets/', async (err, files) => {
	if (err) console.log(err)
	for (var file of files) {
		if (file.split('.')[1] == 'csv') {
			var csvFilePath = __dirname + `/public/data/sheets/${file}`;
			// Async / await usage
			sheets[file.split('.')[0]] = await csv({
				delimiter: '|'
			}).fromFile(csvFilePath);
		}
	}
	sheets = JSON.stringify(sheets).replaceAll('/wh40k9ed', 'https://wahapedia.ru/wh40k9ed')
	fs.writeFile(__dirname + `/public/data/sheets/sheets.json`, sheets, (err) => {
		if (err) {
			console.log(err);
		}
	})
});
console.log('JSON File Updated.');
// END OF UPDATING CSV FILE

var typeList = [];
function getTypeRows(category) {
	var data = JSON.parse(fs.readFileSync('public/data/sheets/sheets.json'));
	for (prop in data) {
		console.log(prop);
		data[prop].forEach((item, i) => {
			if (item.hasOwnProperty(category)) {
				typeList.push(item)
				console.log(item);
			} else {
				// console.log('broke')
			}
		})
	}
}
// Enter Certain Type of Column EX: Type , Goal Text , DocPac Date , Event Date
// getTypeRows('Goal Text')

// Search by Date
var dateList = [];
function getDate(inpdate) {
	var data = JSON.parse(fs.readFileSync('public/data/sheets/sheets.json'));
	for (prop in data) {
		console.log(prop);
		data[prop].forEach((item, i) => {
			if (item["DocPac Date"] == inpdate) {
				dateList.push(item)
				console.log(item);
			} else {}
		})
	}
}
// DATE BY DD/MONTH NAME     EX: 4-Feb
// getDate('8-Oct')

app.get('/', function (req, res) {
    res.render('home', {
    });
})
app.get('/', function(req, res) {
  db.all("SELECT * FROM ConvertJson", function(err, rows) {
    if (err) {
      console.log(err)
    } else if (rows) {
      console.log(rows);
      res.render('/', {
        rows: rows
      })
    }
  });
});

app.get('/search', function (req, res) {
    res.render('search')
})
app.post('/search', function(req, res){
    if (req.body.user && req.body.cdata) {

	}
});

// Start Website Server / Open Connections
var port = 5000
app.listen(port, function () {
    console.log(`DocPac Search Site active on port ${port}`)
})
