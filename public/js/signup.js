
(function ($) {
   "use strict";
var category;
$( window ).on("load", function() {
$('#successMessage').hide()
$('#errorMessage').hide()
$('#errorMessageEmail').hide()
})
$('#signupBtn').on('click',function(){
   signUpRequest()
})

function signUpRequest(){
   let emailAdress=$('#email').val()
   let regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
   if (!emailAdress.match(regexEmail)) {
      $('#errorMessageEmail').show()
      return false
   }
   let form=$('#signUpForm')

   $.ajax({
      url: "/customer/signup",
      type: "POST", 
      data :form.serialize(),
      beforeSend: function(){
         $('#successMessage').hide()
         $('#errorMessage').hide()
$('#errorMessageEmail').hide()

       },
      success: function(data){ 
         $('#successMessage').show()
         localStorage.setItem(`id`, JSON.stringify(data.id));
         localStorage.setItem(`key`, JSON.stringify(data.token));
         setTimeout(() => {
            
            window.location.replace("/");
         }, 1000);
      },
      error: function(err){
         err.then(err=>{
$('#errorMessage').show()
   
            console.log(err)
         })
      }
   });
}

})(jQuery);