var express = require('express');
var router = express.Router();
const ProductService = require('../services/product-service');


const service = new ProductService();
/* GET home page. */

router.get('/',async function(req, res, next) {
  const isAuth=req.session.isAuthenticated;

  try{
    const id=req.query.id
    const { data} = await service.GetProducts(); 
    const selectedProduct  = await service.GetProductWithPopulate(id); 
    const productReview  = await service.GetReview(id);
        res.render('product', { title: 'Express',currentProduct:selectedProduct.data,review:productReview.data,products:data.products,isAuth:isAuth});
  }catch(err){
    next(err)
  }
});
router.get('/productBySubCategory',async function(req, res, next) {
  const isAuth=req.session.isAuthenticated;

  try{

    const { data} = await service.GetProductBySubCategory(req.query.id); 
        res.render('shopgrid', { title: 'Products-list',isAuth:isAuth,product:data});
  }catch(err){
    next(err)
  }
});

module.exports = router;