//imports and
const express = require('express');
const app = express()
app.set('view engine', 'ejs')
const port = 8080
const ip = '127.0.0.1'
const sqlite3 = require('sqlite3').verbose();
const fs = require('fs');
app.use(express.urlencoded({extended:true}))

const db = new sqlite3.Database('usr_data.db')


app.get('/', function(req,res){
  res.render('index.ejs')
})

app.post('/', function(req,res){
  const usr = {
    name: req.body.Name ,
    age: req.body.Age,
    aboutYourSelf: req.body.PerInfo
  }

  db.run(`INSERT INTO usr_data (Name, Age, abtYou) VALUES (?,?,?)`, [usr.name, usr.age, usr.aboutYourSelf], function(){
    res.render('index.ejs')
  })
})



app.listen(port, ip, function(){
  console.log("server up");
})
