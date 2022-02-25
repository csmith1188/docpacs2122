const express = require('express');
const fs = require('fs');
var app = express()
app.set("view engine", 'ejs')
app.use(express.urlencoded({extended: true}))

var rawdata = fs.readFileSync('data.json', function(err,data){})
var data = JSON.parse(rawdata)

console.log(data.data.length);

app.get('/', function(req, res){
  res.render("main", {
    orderlist: JSON.stringify(data.data)
  })
})

app.get('/neworder', function(req, res){
  res.render("neworder", {
    message: ""
  })
})

app.get('/view', function(req, res){
  if (req.body === false) {
    console.log('It worked');
  }
  res.render("viewlist", {
    
  })
})

app.get('/additem', function(req, res){
  res.render('additem', {
  error: []
  })
})

app.post('/neworder', function(req, res){
  if (req.body.name && req.body.address) {
    var rawdata = fs.readFileSync('data.json', function(err,data){})
    var data = JSON.parse(rawdata)
    data.data.push({ordernumber: data.data.length + 1, customername: req.body.name, customeraddress: req.body.address, items: [], subtotal: 0, tax: 0, total: 0 })
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

app.post('/additem', function(req, res){
  var rawdata = fs.readFileSync('data.json', function(err,data){})
  var data = JSON.parse(rawdata)
  if (req.body.num == false || req.body.itemname == false || req.body.qty == false || req.body.price == false) {
    res.render('additem', {
      error: "You Forgot Something"
    })
  } else if (req.body.num < 0 || req.body.num > data.data.length) {
    res.render('additem', {
      error: "THE ORDER IS IN THE BLACK ABYESS WHERE NOTHING EXIST please put in order number of this realm"
    })
    console.log(data.data.length);
  } else {
    data.data[req.body.num - 1].items.push({itemname: req.body.itemname, quantity: req.body.qty, price: req.body.price })
    data.data[req.body.num - 1].subtotal = 0
    data.data[req.body.num - 1].tax = 0
    data.data[req.body.num - 1].total = 0
    data.data[req.body.num - 1].items.forEach((item, i) => {
      var opsub = data.data[req.body.num - 1].items[i].price * data.data[req.body.num - 1].items[i].quantity
      data.data[req.body.num - 1].subtotal = opsub + data.data[req.body.num - 1].subtotal
      data.data[req.body.num - 1].tax = data.data[req.body.num - 1].subtotal * 0.06
      data.data[req.body.num - 1].total = data.data[req.body.num - 1].tax + data.data[req.body.num - 1].subtotal
    });

    var stringdata = JSON.stringify(data)
    fs.writeFileSync("data.json",stringdata, "utf8")
    res.render('additem', {
      error: 'Item added'
    })
  }

})

app.listen(5000)


//EOF
