const express = require('express');

var app = express();

app.use(express.static("public"));

app.get('/', function (req, res) {
  res.sendFile('index.html');
});

app.get('/about', function (req, res) {
  res.sendFile('about.html');
});

var server = app.listen(8000, function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log('Example app listening at http://%s:%s', host, port);
});
