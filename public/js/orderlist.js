"use strict";
var key = JSON.parse(localStorage.getItem("key"));
var orderList

$(window).on("load", function () {
   setOrderList();
 });
 

function setOrderList(){
   $.ajax({
      url: "/shopping-api/orders-details",
      headers: {
        Authorization: "Bearer " + key,
      },
      success: function (data) {
     console.log(data)
     orderList=data
     orderListAdd()
      },
    });
}


let orderListAdd=()=>{
   let template = Handlebars.compile(
      document.querySelector("#orderDetailsScript").innerHTML
      );
      let filled = template({
         orderList:orderList,
      });
      document.querySelector("#orderDetails").innerHTML =   filled ;
 
  
    


}