
   "use strict";

  function addToCart(e){
     let key =JSON.parse(localStorage.getItem('key'))
  let id= $(e).attr("data-product_id")
     let url='/cart-api'
     $.ajax({
      url: url,
      type: "PUT", 
      data :{
         _id:id,
         qty:'1'
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
     
  }


