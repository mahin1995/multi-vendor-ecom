$('#id_product_img').on('change',function(){
   imageUpload()
})
function imageUpload(){
   var formData = new FormData()
   // formData.append('name', document.getElementById('name').value)     // the text data
   formData.append('avatar', document.getElementById('id_product_img').files[0])
 
    
      console.log(formData.get('avatar'))
      $.ajax({
         url: '/products-api/upload-product-image',
         method: 'POST',
    processData: false,
    contentType: false,
    cache: false,
 
    enctype: 'multipart/form-data',
         data: formData,
         // headers: { "Content-Type": "multipart/form-data" },
         success: function(response){
            if(response != 0){
               $("#id_image_uploded").attr("src",`uploads/${response}`); 
               // $(".preview img").show(); // Display image element
            }else{
               Swal.fire({
                  icon: 'error',
                  title: 'Oops...',
                  text: 'File Not upladed',
                 
                })
            }
         },
      });
  
}