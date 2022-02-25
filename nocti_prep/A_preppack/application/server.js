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
  const number = req.body.cOrder
  const user = {
    usrName: name,
    usrAddress: address,
    usrOrder: number
    }
    if(name == "" || address == ""){
      res.render('neworder.ejs', {
        error: "Must Fill Out All Fields"
      })
    }

    const order = {
      orderNumber: number ,
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
  res.render('additem.ejs')
})



app.get('/view', function(req,res){
  res.render('view.ejs')
})



app.listen(port, ip, function(){
  console.log("Server: Functional");
})
