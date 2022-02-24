const http = require('http');
const PORT = 5000;
const express = require('express');
const app = express();
const msql = require("mysql")


app.set('view engine' , 'ejs');
app.get('/', (req,res) =>{
  res.render('home', {
    bodytext: "Yurrr"
  })
})
app.listen(PORT, () => {
  console.log('listening')
});
