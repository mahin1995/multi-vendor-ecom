var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/login', function(req, res, next) {
  const isAuth=req.session.isAuthenticated;
if(isAuth){
 return res.redirect('/')
}
  res.render('login', { title: 'Login' ,isAuth:isAuth});
});
router.get('/signup', function(req, res, next) {
  const isAuth=req.session.isAuthenticated;
if(isAuth){
 return res.redirect('/')  
}
res.render('signup', { title: 'signup',isAuth:isAuth });
});
router.get('/order-complite', function(req, res, next) {
  const isAuth=req.session.isAuthenticated;
  let txnId=req.query.txnId
if(isAuth){
  return res.render('order-complite', { title: 'order-complite',isAuth:isAuth,txnId:txnId });
}
return res.redirect('/')  
});

module.exports = router;
