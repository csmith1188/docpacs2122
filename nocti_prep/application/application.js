const express = require('express');
const fs = require('fs');
var app = express()
app.set("view engine", 'ejs')
app.use(express.urlencoded({extended: true}))

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
  res.render("orderform", {

  })
})
app.get('/additem', function(req, res){
  res.render("additem", {

  })
})
app.post('/additem', function(req, res){
  res.render("itemaddform", {

  })
})
app.get('/view', function(req, res){
  res.render('viewlist', {
    
  })
})




app.listen(5000)
