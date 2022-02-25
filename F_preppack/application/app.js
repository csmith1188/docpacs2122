const express = require('express');
const app = express();
const ejs = require('ejs');
const fs = require('fs');
const port = 8000;
app.use(express.urlencoded({
  extended: false
}))
app.use(express.static(__dirname + '/public'));
app.use('/public', express.static('public'));
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
    mainbody: ""
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
    data.order.push(newOrder)
    data = JSON.stringify(data)
    fs.writeFile('data.json', data, 'UTF8', (err) => {
      if (err) {
        console.log('Error. Could not write to file.' + err);
      } else {
        console.log(`Wrote ${data} to 'data.json'`);
      }
    })
    res.render('newOrder', {
      mainbody: `Order ${newOrder.orderNumber} was created`
    })
  } else {
  res.render('newOrder', {
    mainbody: "You forgot to enter name or address"
  })
}
})

app.get('/additem', (req, res) => {
  res.render('addItem', {
    mainbody: ""
  })
})

app.post('/additem', (req, res) => {
  var rawData = fs.readFileSync('data.json')
  var data = JSON.parse(rawData)
  console.log(data);
  var orderNumber = parseInt(req.body.orderNumber) - 1
  console.log(orderNumber);
  var itemName = req.body.itemName
  var quantity = req.body.quantity
  var price = req.body.price
  if (orderNumber && itemName && quantity && price) {
    if (orderNumber >= 0 && orderNumber <= data.order.length) {
      var newItem = {
        itemName: itemName,
        quantity: quantity,
        price: price
      }
      data.order[orderNumber].items.push(newItem)
      data.order[orderNumber].subtotal = 0; data.order[orderNumber].tax = 0; data.order[orderNumber].total = 0;
      for (var item in data.order[orderNumber].items) {
        var subtotal = data.order[orderNumber].items[item].price * data.order[orderNumber].items[item].quantity
        data.order[orderNumber].subtotal = data.order[orderNumber].subtotal + subtotal
      }
      var tax = subtotal * 0.06; tax = parseFloat(tax.toFixed(2));
      data.order[orderNumber].tax = tax
      data.order[orderNumber].total = data.order[orderNumber].subtotal + data.order[orderNumber].tax
      data.order[orderNumber].total = parseFloat(data.order[orderNumber].total.toFixed(2))
      data = JSON.stringify(data)
      fs.writeFile('data.json', data, 'UTF8', (err) => {
        if (err) {
          console.log('Error. Could not write to file.' + err);
        } else {
          console.log(`Wrote ${data} to 'data.json'`);
        }
      })
      res.render('addItem', {
        mainbody: `The item was successfully added to the order.`
      })
    } else {
      res.render('addItem', {
        mainbody:'That order does not exist'
      })
    }
  } else {
  res.render('addItem', {
    mainbody:'The fields were not filled out correctly/complete'
  })
}
})
app.get('/view', (req, res) => {
  if (req.query.order) {
    var listofItems = []
    for (var x in data.order) {
      listofItems.push(data.order[x].orderNumber); listofItems.push(data.order[x].customerName);
    }
  } else {
    res.render('view', {
      mainbody: "Invalid order number"
    })
}
})

app.listen(8000)
