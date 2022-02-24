const express = require('express');
const app = express();
const ejs = require('ejs');
const fs = require('fs');
const port = 8000;
app.use(express.urlencoded({
  extended: false
}))
app.set('view engine', 'ejs')
app.listen(8000)
