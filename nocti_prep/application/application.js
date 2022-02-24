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
    message: ""
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
  if (req.body.name && req.body.address) {
    var rawdata = fs.readFileSync('data.json', function(err,data){})
    var data = JSON.parse(rawdata)
    data.data.push({ordernumber: data.data.length +1, customername: req.body.name, customeraddress: req.body.address, items: [], subtotal: 0, tax: 0, total: 0 })
    var stringdata = JSON.stringify(data)

    fs.writeFileSync("data.json",stringdata, "utf8")

      res.render("neworder", {
        message: `order ${data.data[data.data.length - 1].ordernumber} was created`

    })
  } else {

      res.render("neworder", {
        message: "one of the feild is empty"
      })

  }
})
app.listen(5000)
