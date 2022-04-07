var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'ECOM Home' });
});
router.get('/wishlist', function(req, res, next) {
  res.render('wishlist', { title: 'wishlist' });
});
router.get('/cart', function(req, res, next) {
  res.render('cart', { title: 'cart' });
});
router.get('/checkout', function(req, res, next) {
  res.render('checkout', { title: 'checkout' });
});

module.exports = router;
