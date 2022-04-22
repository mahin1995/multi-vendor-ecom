"use strict";
var category;
var cart;

$( window ).on("load", function() {
   cartlist()

})

Handlebars.registerHelper('totalPrice', function(price,qty) {
  let totalprice= parseFloat(price)*parseInt(qty)
   return totalprice;
 });

function cartlist(){
    
   let key =JSON.parse(localStorage.getItem('key'))

   $.ajax({
      url: "/shopping-api/cart",
      headers: {
         "Authorization": "Bearer " + key
      },
      success:function(data){
       
         cart=data
      
         cartDataAdd()

}
})
 }

 let cartDataAdd=()=>{
   console.log(cart)
   let price=[];
   for(let i=0; i<cart.length; i++){
      price.push(parseFloat(cart[i].product.price)*parseInt(cart[i].unit))
   }
   const subprice = price.reduce((a, b) => a + b, 0);
   const totalPrice = subprice+25
   console.log(subprice)
   console.log(totalPrice)
   let template = Handlebars.compile(
      document.querySelector("#chekoutDetailsScript").innerHTML
      );
      let filled = template({
         cart:cart,
         subprice:subprice,
         total:parseFloat(totalPrice)
      });
      document.querySelector("#checkoutDetails").innerHTML =   filled ;


}