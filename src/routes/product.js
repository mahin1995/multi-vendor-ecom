var express = require('express');
var router = express.Router();
const ProductService = require('../services/product-service');


const service = new ProductService();
/* GET home page. */

router.get('/',async function(req, res, next) {
  try{
    const id=req.query.id
    const { data} = await service.GetProducts(); 
    const selectedProduct  = await service.GetProductWithPopulate(id); 
    const productReview  = await service.GetReview(id); 
    console.log(productReview)
        res.render('product', { title: 'Express',currentProduct:selectedProduct.data,review:productReview.data,products:data.products});
  }catch(err){
    next(err)
  }
});

module.exports = router;