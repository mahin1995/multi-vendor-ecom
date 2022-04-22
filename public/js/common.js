

"use strict";
var category;
var cart;
$( window ).on("load", function() {
   setSideNavbar()
   setCartValue()
})
function setSideNavbar(){
   $.ajax({
      url: "/product-api/get-catagories",
      success: function(data){ 
         
          category=[...data]
   
   let template = Handlebars.compile(
   document.querySelector("#sidbarNavMenu").innerHTML
   );
   
   let filled = template({
      category:category,
   });
   document.querySelector("#sidbarNavMenuEdited").innerHTML =   filled ;


   let template2 = Handlebars.compile(
   document.querySelector("#catagoryDetails").innerHTML
   );
   
   let filled2 = template2({
      category:category,
   });
   document.querySelector("#catagoryDetailsOutput").innerHTML =   filled2 ;
      },
      error: function(err){
         err.then(err=>{
   
            console.log(err)
         })
      }
   });
}






const Toast = Swal.mixin({
   toast: true,
   position: 'top-end',
   showConfirmButton: false,
   timer: 3000,
   timerProgressBar: true,
   didOpen: (toast) => {
     toast.addEventListener('mouseenter', Swal.stopTimer)
     toast.addEventListener('mouseleave', Swal.resumeTimer)
   }
 })
 
 function setCartValue(){
    
   let key =JSON.parse(localStorage.getItem('key'))

   $.ajax({
      url: "/shopping-api/cart",
      headers: {
         "Authorization": "Bearer " + key
      },
      success:function(data){
         cart=data
      
console.log(data.length)
let template = Handlebars.compile(
   document.querySelector("#cartCountShow").innerHTML
   );
   
   let filled = template({
      cartLength:cart.length,
   });
   document.querySelector("#cartCountEdited").innerHTML =   filled ;
   document.querySelector("#cartCountEdited2").innerHTML =   filled ;
}
})
 }

