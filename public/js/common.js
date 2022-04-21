
(function ($) {
   "use strict";
var category;
$( window ).on("load", function() {
   setSideNavbar()
})
function setSideNavbar(){
   $.ajax({
      url: "/product-api/get-catagories",
      success: function(data){ 
          console.log(data)
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



})(jQuery);


