const express = require('express');
const app = express();
const port = 9000;

app.use(express.urlencoded({extended: true}));

app.set('view engine', 'ejs');


app.get('/additem', (req, res) => {
  res.render('additem')
})


app.post('/additem', (req, res) =>{
res.send('dATA HAS BEEN GOTEN')

})


app.listen(port, function(){
  console.log('Server has become a reality on port 9000');
})
