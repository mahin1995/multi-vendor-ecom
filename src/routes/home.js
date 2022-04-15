var express = require('express');
var router = express.Router();
const ProductService = require('../services/product-service');


const service = new ProductService();

/* GET home page. */
router.get('/', async function(req, res, next) {
    try{
      const { data} = await service.GetProducts();        
      const selectedProduct  = await service.GetProductDescription("62584df6f875cc35ba874848");        

        res.render('index', { title: 'ECOM Home',products:data.products,bestProduct:selectedProduct.data});
    }catch(err){
        next(err)
    }
});
router.get('/wishlist-view', function(req, res, next) {
  res.render('wishlist', { title: 'wishlist' });
});
router.get('/cart-view', function(req, res, next) {
  res.render('cart', { title: 'cart' });
});
router.get('/checkout-view', function(req, res, next) {
  res.render('checkout', { title: 'checkout' });
});

module.exports = router;