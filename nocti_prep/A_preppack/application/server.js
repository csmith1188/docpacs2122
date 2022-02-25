const express = require('express');
const app = express()
const fs = require('fs');
const port = 8080
const ip = '127.0.0.1'
app.set('view engine', 'ejs')
app.use(express.urlencoded({extended:true}))




app.get('/', function(req,res){
  res.render('index.ejs')
})



app.get('/neworder', function(req,res){
  res.render('neworder.ejs', {
    error:"",
    alert: ""
  })
})



app.post('/neworder', function(req,res){
  const name = req.body.cName
  const address = req.body.cAddress
  const user = {
    usrName: name,
    usrAddress: address
    }
    if(name == "" || address == ""){
      res.render('neworder.ejs', {
        error: "Must Fill Out All Fields"
      })
    }

    const order = {
      orderNumber:  ,
      order:1 ,
      customerName: name ,
      customerAddress: address,
      item: [],
      subtotal: 0,
      tax: 0,
      total: 0
    }

    console.log(order);
    outData = JSON.stringify(order)
    fs.writeFileSync('data.json', outData, function(){
      console.log("Data Saved: ");
    })
  }
)


app.get('/additem', function(req,res){
  res.render('additem.ejs', {
    error:""
  })
})

app.post('/additem?', function(req,res){
  var data = {
    orderNumber: req.body.orderNumber,
    itemName: req.body.itemName,
    quantity: req.body.quantity,
    price: req.body.price,
  }
  console.log(data.orderNumber)

  if (data.orderNumber == "" || data.itemName == "" || data.quantity == "" || data.price == "") {
    res.render('additem.ejs', {
      error: "One or more fields has been left empty: "
    })
  }
  if (data.orderNumber != '' && data.itemName != '' && data.quantity != '' && data.price != '') {
    let rawInfo = fs.readFileSync(__dirname + '/data.json')
    let feed = JSON.parse(rawInfo)
    feed.comments.push(data)
    console.log(feed)
    fs.writeFile(__dirname + '/data.json', JSON.stringify(feed), 'utf8', function() {
      console.log('wrote to file')
    })
})


app.get('/view', function(req,res){
  res.locals.query = req.query;
  res.render('view.ejs')
  if(res.locals.query){
     //how to put shit here and yeet it to view.ejs
     //wait this isnt google
    console.log(req.query);
  }else{
    console.log('no') //lol stupid this isnt gonna work, the parmaters are still there its just empty
  }
})



app.listen(port, ip, function(){
  console.log("Server running at 127.0.0.1:8080");
})
