
   "use strict";
var category;
$( window ).on("load", function() {
   cartlist()

})
$('#loginBtn').on('click',function(){
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

function increaseValue(e){
   let product_id=$(e).attr('data-product_id')
   let cartDefaultValue=$(`#${product_id}_value`).val()
   let newTotalqty=parseInt(cartDefaultValue)+1
   $(`#${product_id}_value`).val(newTotalqty)
   cart.filter(data=>{
      if(data.product._id===product_id){
         data.unit=newTotalqty
      }
      return data
   })
  
}

function decreaseValue(e){
   let product_id=$(e).attr('data-product_id')
   let cartDefaultValue=$(`#${product_id}_value`).val()
   let newTotalqty=parseInt(cartDefaultValue)-1

   cart.filter(data=>{
      if(data.product._id===product_id){
         data.unit=newTotalqty
      }
      return data
   })
   if(newTotalqty<0){
      $(`#${product_id}_value`).val(0)
      cart.filter(data=>{
         if(data.product._id===product_id){
            data.unit=0
         }
         return data
      })
      return true
   }
 
   $(`#${product_id}_value`).val(newTotalqty)
}

$('#id_update_cart').on('click',function(){
   updateCart()
})

function deleteCart(e){
 let id=$(e).attr('data-cart_id')
 let url =`/cart-api/${id}`
 let key =JSON.parse(localStorage.getItem('key'))

 $.ajax({
   url: url,
   type: "DELETE", 
   headers: {
      "Authorization": "Bearer " + key
    },
   beforeSend: function(){


    },
   success: function(data, textStatus, xhr){ 
    
      cartlist()
      Toast.fire({
         icon: 'success',
         title: 'Item Deleted successfully'
       })

},
error: function(jqXHR, textStatus, errorThrown){
   console.log(textStatus + ": " + jqXHR.status + " " + errorThrown);
   if(jqXHR.status===500 || jqXHR.status===403){
      // window.location.replace("/login");

   }
    
   }
});
}
function updateCart(){
   let url='/cart-api'
   let key =JSON.parse(localStorage.getItem('key'))

cart.map(data=>{
 
   $.ajax({
      url: url,
      type: "PUT", 
      data :{
         _id:data.product._id,
         qty:data.unit
      },
      headers: {
         "Authorization": "Bearer " + key
       },
      beforeSend: function(){


       },
      success: function(data, textStatus, xhr){ 
       
         cartDataAdd()
         Toast.fire({
            icon: 'success',
            title: 'cart Update'
          })

},
   error: function(jqXHR, textStatus, errorThrown){
      console.log(textStatus + ": " + jqXHR.status + " " + errorThrown);
      if(jqXHR.status===500 || jqXHR.status===403){
         // window.location.replace("/login");

      }
       
      }
   });
})
 
}

let cartDataAdd=()=>{
   let template = Handlebars.compile(
      document.querySelector("#cartDetailsScript").innerHTML
      );
      let filled = template({
         cart:cart,
      });
      document.querySelector("#cartDetails").innerHTML =   filled ;
   let template2 = Handlebars.compile(
      document.querySelector("#subTotalScript").innerHTML
      );
      console.log(cart)
      let price=[];
      for(let i=0; i<cart.length; i++){
         price.push(parseFloat(cart[i].product.price)*parseInt(cart[i].unit))
      }
      const subprice = price.reduce((a, b) => a + b, 0);
      const totalPrice = subprice+25
      console.log(subprice)
      console.log(totalPrice)
      let filled2 = template2({
      subprice:subprice,
      // totalPrice:totalPrice,
      total:totalPrice

      });
      document.querySelector("#subTotal").innerHTML =   filled2 ;

}