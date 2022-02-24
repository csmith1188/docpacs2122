const express = require('express');
const ejs = require('ejs');
var app = express();
const PORT = 8080;

app.use(bodyParser.urlencoded({extended: false}));
//change view engine
app.set('view engine', 'ejs');

app.get('/', (req, res) => {

})

console.log("Server is running on localhost:8080");
