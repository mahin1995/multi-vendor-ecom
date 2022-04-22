var express = require('express');
var router = express.Router();
const ProductService = require('../services/product-service');
const isAuth= require('./middlewares/isAuthenticate')

const service = new ProductService();

/* GET home page. */
router.get('/', async function(req, res, next) {
    try{
      const { data} = await service.GetProducts();        
  
      const selectedProduct  = await service.GetProductDescription("62584df6f875cc35ba874848");        
      const isAuth=req.session.isAuthenticated;
        res.render('index', { title: 'ECOM Home',products:data.products,bestProduct:selectedProduct.data,isAuth:isAuth});
    }catch(err){
        next(err)
    }
});
router.get('/wishlist-view',isAuth, function(req, res, next) {
  const isAuth=req.session.isAuthenticated;

    res.render('wishlist', { title: 'wishlist',isAuth:isAuth });
  
});
router.get('/cart-view',isAuth, function(req, res, next) {
  const isAuth=req.session.isAuthenticated;

    res.render('cart', { title: 'cart',isAuth:isAuth });
});
router.get('/checkout-view', function(req, res, next) {
  const isAuth=req.session.isAuthenticated;
if(isAuth){

  return res.render('checkout', { title: 'checkout',isAuth:isAuth });
}else{
  return res.redirect('/login')  
}
});
router.get('/contact-view', function(req, res, next) {
  const isAuth=req.session.isAuthenticated;

  res.render('contact', { title: 'checkout',isAuth:isAuth });
});

module.exports = router;