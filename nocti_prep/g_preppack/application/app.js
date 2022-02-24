const ejs = require('ejs');
const express = require('express');
const app = express()
const port = 9000
const fs = require('fs');

var rawdata = fs.readFileSync('data.json');
var data = JSON.parse(rawdata);

app.use(express.urlencoded({
  extended: true
}));
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("homepage.ejs");
})

app.get("/neworder", (req, res) => {
  res.render("neworder.ejs");
})

app.get('/additem', (req, res) => {
  res.render('additem')
})


app.post('/additem', (req, res) => {

  if (req.body.orderNumber && req.body.itemName && req.body.quantity && req.body.price) {

    let theNumber = req.body.orderNumber
    var rawdata = fs.readFileSync('data.json');
    var parsed = JSON.parse(rawdata)
    if (req.body.orderNumber > 0 && req.body.orderNumber < data.orders.length - 1) {
      res.render('newitem', {
      sent: 'does not exist'
    })
    } else {
      let itemname = req.body.itemName
let price = req.body.price
let quantity = req.body.quantity
let item = {
  itemname,
  quantity,
  price
}
parsed.orders[theNumber].items.push(item)
fs.writeFile("data.json", JSON.stringify(parsed), () => console.log("Wrote to file"));
      data.orders[theNumber].subtotal = 0;
      data.orders[theNumber].tax = 0;
      data.orders[theNumber].total = 0;

      data.orders[theNumber].items.forEach((item, i) => {
        data.orders[theNumber].subtotal = item.price * item.quantity
        data.orders[theNumber].tax = data.orders[theNumber].subtotal * 0.06
        data.orders[theNumber].total = data.orders[theNumber].subtotal + data.orders[theNumber].tax

        fs.writeFile('data.json', JSON.stringify(data), (err) => {
          if (!err) {
            console.log('done');
            res.render('newitem', {
            sent: 'all data sent'
          })
          }
        })
      })
    }
  } else {
    res.render('newitem', {
    sent: 'not all params sent'
  })
  }
})



app.post("/neworder", (req, res) => {
  let formdata = req.body;
  if (!formdata.customername || !formdata.customeraddress) {
    res.render("message.ejs", {
      message: "Error: missing data"
    });
  } else {
    data.orders.push({
      ordernumber: data.orders.length,
      customername: formdata.customername,
      customeraddress: formdata.customeraddress,
      items: [],
      subtotal: 0,
      tax: 0,
      total: 0
    });
    res.render("message.ejs", {
      message: `Order ${data.orders.length} was created`
    });
    data = JSON.stringify(data);
    fs.writeFile("data.json", data, () => console.log("Wrote to file"));
  }
});

app.listen(port, () => {
  console.log(`Port ${port} connected. Welcome to the Worse Company Delivery Management System.`)
})
