const ProductService = require('../services/product-service');
const CustomerService = require('../services/customer-service');
const UserAuth = require('./middlewares/auth')
const isAuth = require('./middlewares/isAuthenticate');
const path = require("path");
const multer=require('multer')
const UPLOAD_FOLDER="../../public/uploads/"
const storage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,path.resolve(__dirname, UPLOAD_FOLDER));
    },
    filename:(req,file,cb)=>{
        cb(null,  file.originalname);
    }
})
const upload = multer({storage:storage,limits:{fileSize:4000000}}).single('avatar')
const sharp = require('sharp')

module.exports = (app) => {
    
    const service = new ProductService();
    const customerService = new CustomerService();


    app.post('/product-api/create-product', async(req,res,next) => {
        
        try {
            const { name, desc, type, unit,price, available, suplier, banner,brand,category,description,subcategories,image,specification } = req.body; 
            // validation
            const { data } =  await service.CreateProduct({ name, desc, type, unit,price, available, suplier, banner,brand,category,description,subcategories,image,specification });
            return res.json(data);
            
        } catch (err) {
            next(err)    
        }
        
    });
    app.post('/product-api/create-brand', async(req,res,next) => {
        
        try {
            const { name, desc } = req.body; 
        
            // validation
            const { data } =  await service.CreateBrand({ name, desc });
            return res.json(data);
            
        } catch (err) {
            next(err)    
        }
        
    });
    app.post('/product-api/create-subcatagories', async(req,res,next) => {
        
        try {
            const { name,desc,products } = req.body; 
           
            // validation
            const { data } =  await service.CreateSubcategorie({ name, desc,products });
            return res.json(data);
            
        } catch (err) {
            next(err)    
        }
        
    });
    app.post('/product-api/create-catagories', async(req,res,next) => {
        
        try {
            const { name,desc,subcategories,image } = req.body; 
            // validation
            const { data } =  await service.Createcategorie({ name, desc,subcategories,image });
            return res.json(data);
            
        } catch (err) {
            next(err)    
        }
        
    });
    app.get('/product-api/get-catagories', async(req,res,next) => {
        
        try {
            const { name,desc,subcategories } = req.body; 
            // validation
            const { data } =  await service.GetAllCategorywitSubCategory();        

            return res.json(data);
            
        } catch (err) {
            next(err)    
        }
        
    });
    app.post('/product-api/create-review', async(req,res,next) => {
        
        try {
            const { stars,name,email,review,products } = req.body; 
            // validation
            const { data } =  await service.CreateReivew({ stars,name,email,review,products });
            return res.json(data);
            
        } catch (err) {
            next(err)    
        }
        
    });

    app.get('/category-api/:type', async(req,res,next) => {
        
        const type = req.params.type;
        
        try {
            const { data } = await service.GetProductsByType(type)
            return res.status(200).json(data);

        } catch (err) {
            next(err)
        }

    });

    app.get('/product-api/:id', async(req,res,next) => {
        
        const productId = req.params.id;

        try {
            const { data } = await service.GetProductDescription(productId);
            return res.status(200).json(data);

        } catch (err) {
            next(err)
        }

    });

    app.post('/product-api/ids', async(req,res,next) => {

        try {
            const { ids } = req.body;
            const products = await service.GetSelectedProducts(ids);
            return res.status(200).json(products);
            
        } catch (err) {
            next(err)
        }
       
    });
     
    app.put('/wishlist-api',UserAuth, async (req,res,next) => {

        const { _id } = req.user;
        
        try {
            const product = await service.GetProductById(req.body._id);
            const wishList = await customerService.AddToWishlist(_id, product)
            return res.status(200).json(wishList);
        } catch (err) {
            
        }
    });
    
    app.delete('/wishlist-api/:id',UserAuth, async (req,res,next) => {

        const { _id } = req.user;
        const productId = req.params.id;

        try {
            const product = await service.GetProductById(productId);
            const wishlist = await customerService.AddToWishlist(_id, product)
            return res.status(200).json(wishlist);
        } catch (err) {
            next(err)
        }
    });


    app.put('/cart-api',UserAuth, async (req,res,next) => {
        
        const { _id, qty } = req.body;
        
        try {     
            const product = await service.GetProductById(_id);
    
            const result =  await customerService.ManageCart(req.user._id, product, qty, false);
    
            return res.status(200).json(result);
            
        } catch (err) {
            next(err)
        }
    });
    
    app.delete('/cart-api/:id',UserAuth, async (req,res,next) => {

        const { _id } = req.user;

        try {
            const product = await service.GetProductById(req.params.id);
            const result = await customerService.ManageCart(_id, product, 0 , true);             
            return res.status(200).json(result);
        } catch (err) {
            next(err)
        }
    });

    //get Top products and category
    app.get('/products-api', async (req,res,next) => {
        //check validation
        try {
            const { data} = await service.GetProducts();        
            return res.status(200).json(data);
        } catch (err) {
            next(err)
        }
        
    });
    app.get('/products-api/sub-category/:id', async (req,res,next) => {
        //check validation
        try {
            const { data} = await service.GetProductBySubCategory(req.params.id);        
            return res.status(200).json(data);
        } catch (err) {
            next(err)
        }
        
    });

    app.post("/products-api/upload-product-image", (req, res,err) => {
        upload(req, res, async function(err){ 
            // check for error thrown by multer- file size etc
            if( err|| req.file === undefined){
                console.log(err)
                res.send("error occured")
            }else{
          
            console.log(
               
            )
               res.send( req.file.filename)
            }
           })

    });
    
}