
(function ($) {
   "use strict";
$.ajax({
   url: "/product-api/get-catagories",
   success: function(data){ 
       console.log(data)
   },
   error: function(){
      alert("There was an error.");
   }
});

})(jQuery);