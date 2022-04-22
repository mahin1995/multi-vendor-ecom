"use strict";
var category;
var cart;
var key = JSON.parse(localStorage.getItem("key"));
$(window).on("load", function () {
  cartlist();
});

const makeid = (length) => {
  var result = "";
  var characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};

Handlebars.registerHelper("totalPrice", function (price, qty) {
  let totalprice = parseFloat(price) * parseInt(qty);
  return totalprice;
});

function cartlist() {


  $.ajax({
    url: "/shopping-api/cart",
    headers: {
      Authorization: "Bearer " + key,
    },
    success: function (data) {
      cart = data;

      cartDataAdd();
    },
  });
}

$("#id_place_order").on("click", () => {
  placeOrder();
});


function placeOrder() {
  let txnId = makeid(8);
  let form = $("#checkoutForm");
  let mathod = $("input[name='checkout_payment_method']:checked").val();


  console.log(form.serialize());
  console.log(mathod);

  
    $.ajax({
      url: "/customer/address/",
      type: "POST",
      data: form.serialize(),
      headers: {
        Authorization: "Bearer " + key,
      },

      success: function (data) {
        let addressId = data._id;
        $("#checkoutForm").trigger("reset");
        if (mathod === "payWithCash") {
        addOrder(addressId,txnId)
        window.location.replace(`/order-complite?txnId=${txnId}`);
      } else {
         addOrder(addressId,txnId)
         window.location.replace(`/payment-gateway?txnId=${txnId}`);
      }
     
      },
      error:function(err){
         console.log(err)
      }
    });
 
}
let addOrder=(addressId,txnId)=>{
   $.ajax({
      url: "/shopping-api/order",
      type: "POST",
      data: {
        txnId: txnId,
        address: addressId,
      },
      headers: {
        Authorization: "Bearer " + key,
      },

      success: function (data) {
        return True
      },
    });
}
let cartDataAdd = () => {
  console.log(cart);
  let price = [];
  for (let i = 0; i < cart.length; i++) {
    price.push(parseFloat(cart[i].product.price) * parseInt(cart[i].unit));
  }
  const subprice = price.reduce((a, b) => a + b, 0);
  const totalPrice = subprice + 25;
  console.log(subprice);
  console.log(totalPrice);
  let template = Handlebars.compile(
    document.querySelector("#chekoutDetailsScript").innerHTML
  );
  let filled = template({
    cart: cart,
    subprice: subprice,
    total: parseFloat(totalPrice),
  });
  document.querySelector("#checkoutDetails").innerHTML = filled;
};
