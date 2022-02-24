const express = require('express');
const fs = require('fs');
var app = express()
app.set("view engine", 'ejs')
app.use(express.urlencoded({extended: true}))

var rawdata = fs.readFileSync('data.json', function(err,data){})
var data = JSON.parse(rawdata)

app.get('/', function(req, res){
  res.render("main", {
    orderlist: data.data
  })
})
app.get('/neworder', function(req, res){
  res.render("neworder", {

  })
})

app.get('/view', function(req, res){
  res.render("viewlist", {

  })
})

app.get('/additem', function(req, res){
  res.render("additem", {

  })
})

app.post('/neworder', function(req, res){

})
app.listen(5000)
