(function ($) {
   "use strict";
var category;
$( window ).on("load", function() {
   cartlist()
})
$('#loginBtn').on('click',function(){
})





function cartlist(){


   $.ajax({
      url: "/customer/login",
      type: "GET", 
      beforeSend: function(){
         

       },
      success: function(data){ 
  
      },
      error: function(err){
         err.then(err=>{
   
            console.log(err)
         })
      }
   });
}

})(jQuery);