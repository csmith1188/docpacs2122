let orders = [
  {price: 19.99, qty: 2, salesTax: 0.06},
  {price: 19.99, qty: 2, salesTax: 0.06},
  {price: 19.99, qty: 2, salesTax: 0.06} ]


function getOrder(obj){
 return {
   subtotal: obj.price * obj.qty ,
   total: obj.price * obj.qty * (1 + obj.salesTax)
 }
}

orders.forEach((order, i) => {
  let totals = getOrder(order)
  for (let amount in totals) order[amount] = totals[amount]
});

console.log(orders);
