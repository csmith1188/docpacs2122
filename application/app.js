const ejs = require('ejs');
const express = require('express');
const app = express()
const port = 9000

app.use(express.urlencoded({  extended: true  }));
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


app.post('/additem', (req, res) =>{
res.send('dATA HAS BEEN GOTEN')

})


app.listen(port, () => {
  console.log(`Port ${port} connected. Welcome to the Worse Company Delivery Management System.`)
})
