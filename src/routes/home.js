var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    try{
        res.render('index', { title: 'ECOM Home' });
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