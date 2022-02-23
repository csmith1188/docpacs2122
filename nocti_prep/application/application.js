const express = require('express');
const fs = require('fs');
var app = express()
app.set("view engine", 'ejs')
app.use(express.urlencoded({extended: true}))

var data = JSON.parse(fs.readFile('data.json', function(err, data){}))

app.get('/', function(req, res){
  res.render("main", {
    orderlist: "hi"
  })
})
app.get('/neworder', function(req, res){
  res.render("neworder", {

  })
})
app.post('/neworder', function(req, res){

})
app.listen(5000)
