var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/admin-panel', function(req, res, next) {
  const isAuth=req.session.isAuthenticated;
if(!isAuth){
 return res.redirect('/')
}
  res.render('admin/admin', { title: 'admin' ,isAuth:isAuth});
});

module.exports = router;