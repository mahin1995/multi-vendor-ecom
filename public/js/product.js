"use strict";


function increaseValue(e){
   let product_id=$(e).attr('data-product_id')
   let cartDefaultValue=$(`#${product_id}_value`).val()
   let newTotalqty=parseInt(cartDefaultValue)+1
   $(`#${product_id}_value`).val(newTotalqty)

  
}

function decreaseValue(e){
   let product_id=$(e).attr('data-product_id')
   let cartDefaultValue=$(`#${product_id}_value`).val()
   let newTotalqty=parseInt(cartDefaultValue)-1

   if(newTotalqty<0){
      $(`#${product_id}_value`).val(0)
  
      return true
   }
 
   $(`#${product_id}_value`).val(newTotalqty)
}

$('#id_add_to_cart').on('click',function(){
   let key =JSON.parse(localStorage.getItem('key'))
   let id= $(this).attr("data-product_id")
   let qty=$(`#${id}_value`).val()

      let url='/cart-api'
      $.ajax({
       url: url,
       type: "PUT", 
       data :{
          _id:id,
          qty:qty
       },
       headers: {
          "Authorization": "Bearer " + key
        },
       beforeSend: function(){
 
 
        },
       success: function(data, textStatus, xhr){ 
          setCartValue()
          Toast.fire({
             icon: 'success',
             title: 'Add to Cart in successfully'
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