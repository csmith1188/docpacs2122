const express = require('express');
const app = express();
const ejs = require('ejs');
const fs = require('fs');
const port = 8000;
app.use(express.urlencoded({
  extended: false
}))
app.set('view engine', 'ejs')

var rawData = fs.readFileSync('data.json')
var data = JSON.parse(rawData)
console.log(data);

app.get('/', (req, res) => {
  res.render('index', {

  })
})

app.get('/neworder', (req, res) => {
  res.render('newOrder', {

  })
})

app.post('/neworder', (req, res) => {
  var custName = req.body.custName
  var custAdd = req.body.custAdd
  if (custName && custAdd) {
    var newOrder = {
      orderNumber: data.order.length + 1,
      customerName: custName,
      customerAddress: custAdd,
      items: [],
      subtotal: 0,
      tax: 0,
      total: 0
    }
    console.log(newOrder);
    res.render('newOrder', {

    })
  } else {
  res.render('newOrder', {
    mainbody: "You forgot to enter name or address"
  })
}
})

app.get('/additem', (req, res) => {
  res.render('additem', {

  })
})

app.get('/view', (req, res) => {
  res.render('view', {

  })
})

app.listen(8000)
