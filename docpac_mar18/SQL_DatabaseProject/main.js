const express = require('express');
const app = express()
app.set('view engine', 'ejs')
const port = 8080
const ip = '127.0.0.1'
const sqlite3 = require('sqlite3');





app.get('/', function(req,res){
  res.render('index.ejs')
})




app.listen(port, ip, function(){
  console.log("server up");
})
