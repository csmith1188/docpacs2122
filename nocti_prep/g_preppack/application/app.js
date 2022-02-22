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
    fs.writeFile("data.json", JSON.stringify(data), () => console.log("Wrote to file"));
  }
});
