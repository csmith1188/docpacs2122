const csv = require('csvtojson')
const fs = require('fs');
var sheets = {}


// Check Obj for property
// function hasOwnProperty(obj, prop) {
//     var proto = obj.__proto__ || obj.constructor.prototype;
//     return (prop in obj) &&
//         (!(prop in proto) || proto[prop] !== obj[prop]);
// }

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
function getTypeRows() {
	var data = JSON.parse(fs.readFileSync('public/data/sheets/sheets.json'));
	for (prop in data) {
		console.log(prop);
		data[prop].forEach((item, i) => {
			if (item.hasOwnProperty('Type')) {
				typeList.push(item)
				console.log(item);
			} else {
				// console.log('broke')
			}
		})
	}
}
getTypeRows()

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
getDate('8-Oct')



