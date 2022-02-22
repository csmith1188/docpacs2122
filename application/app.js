const ejs = require('ejs');
const express = require('express');
const app = express()
const port = 9000
const fs = require('fs');

var rawdata = fs.readFileSync('data.json');
var data = JSON.parse(rawdata);

app.use(express.urlencoded({  extended: true  }));
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("homepage.ejs");
})

app.get("/neworder", (req, res) => {
  res.render("neworder.ejs");
})

//The res.send statements need to be replaced with an EJS template containing a message and a link to "/"
app.post("/neworder", (req, res) => {
  let formdata = req.body;
  if (!formdata.customername || !formdata.customeraddress) res.send("Error: missing data");
  else {
    data.orders.push({
      ordernumber: data.orders.length,
      customername: formdata.customername,
      customeraddress: formdata.customeraddress,
      items: [],
      subtotal: 0,
      tax: 0,
      total: 0
    });
    res.send(`Order ${data.orders.length} was created`);
    data = JSON.stringify(data);
    fs.writeFile("data.json", data, () => console.log("Wrote to file"));
  }
});

app.listen(port, () => {
  console.log(`Port ${port} connected. Welcome to the Worse Company Delivery Management System.`)
})
