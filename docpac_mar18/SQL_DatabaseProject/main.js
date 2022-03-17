//imports and
const express = require('express');
const app = express()
app.set('view engine', 'ejs')
const port = 8080
const ip = '127.0.0.1'
const sqlite3 = require('sqlite3');
const fs = require('fs');
app.use(express.urlencoded({extended:true}))



app.get('/', function(req,res){
  res.render('index.ejs')
})

app.post('/', function(req,res){
  const usr = {
    name: req.body.Name ,
    age: req.body.Age,
    aboutYourSelf: req.body.PerInfo
  }
  const stringData = JSON.stringify(usr)
  fs.writeFileSync('usr_data.json', stringData)
  console.log(usr);
  INSERT INTO 'usr_data' VALUES (usr.name, usr.age, usr.aboutYourSelf);
})



app.listen(port, ip, function(){
  console.log("server up");
})
