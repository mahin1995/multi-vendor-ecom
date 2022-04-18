const { ProductModel,productDetailsModel } = require("../models");
const { APIError,BadRequestError } = require('../../utils/app-errors')
const {BrandModel,CategoriesModel,ReviewModel,SubcategoriesModel} =productDetailsModel
//Dealing with data base operations
class ProductRepository {


    async CreateProduct({ name,  type, unit,price, available, suplier,info,brand,category,description,subcategories,specification,image}){

        try {
            const product = new ProductModel({
                name,  type, unit,price, available, suplier,info,brand,category,description,subcategories,specification,image
            })
    
            const productResult = await product.save();
            return productResult;
            
        } catch (err) {
            console.log("err",err)
            throw APIError('API Error', STATUS_CODES.INTERNAL_ERROR, 'Unable to Create Product')
        }
        
    }


     async Products(){
         try{
             return await ProductModel.find();
         }catch(err){
            throw APIError('API Error', STATUS_CODES.INTERNAL_ERROR, 'Unable to Get Products')
         }
    }
   
    async FindById(id){
        try{
            return await ProductModel.findById(id);
        }catch(err){
            throw APIError('API Error', STATUS_CODES.INTERNAL_ERROR, 'Unable to Find Product')
        }

    }
async FindByIdWithpopulate(props){
    try{
     
        const products = await ProductModel.findById(props.id).populate(props.populate);

        return products
    }
    catch(err){
        throw APIError('API Error', STATUS_CODES.INTERNAL_ERROR, 'Unable to Find Products')

    }
}
async FindCategroyWithPopulate(props){
    try{
     console.log(props.populate)
        const category = await CategoriesModel.find().populate('subcategories')
        return category
    }
    catch(err){
        throw APIError('API Error', STATUS_CODES.INTERNAL_ERROR, 'Unable to Find Products')

    }
}
    async FindByCategory(category){

        try{
            const products = await ProductModel.find({ type: category});
             return products;
            
        }catch(err){
            throw APIError('API Error', STATUS_CODES.INTERNAL_ERROR, 'Unable to Find Category')
        }
    }

    async FindSelectedProducts(selectedIds){
        try{
            const products = await ProductModel.find().where('_id').in(selectedIds.map(_id => _id)).exec();
            return products;
        }catch(err){
            throw APIError('API Error', STATUS_CODES.INTERNAL_ERROR, 'Unable to Find Product')
        }
       
    }

async CreateBrands(name,desc){
    try{
        const brand = new BrandModel({
            name, desc
        })

        const brandResult = await brand.save();
        return brandResult;
    }catch(err){
        console.log("err",err)
        throw APIError('API Error', STATUS_CODES.INTERNAL_ERROR, 'Unable to Create Brand')

    }

}
async CreateCategories({name,desc,subcategories}){
    try{
        const categories = new CategoriesModel({
            name, desc,subcategories
        })

        const categoriesResult = await categories.save();
        return categoriesResult;
    }catch(err){
        console.log("err",err)
        throw APIError('API Error', STATUS_CODES.INTERNAL_ERROR, 'Unable to Create categories')

    }

}
async CreateSubcategories({name,desc,products}){
    try{
        const subcategories = new SubcategoriesModel({
            name, desc,products
        })

        const subcategoriesResult = await subcategories.save();
        return subcategoriesResult;
    }catch(err){
        console.log("err",err)
        throw APIError('API Error', STATUS_CODES.INTERNAL_ERROR, 'Unable to Create Sub-categories')

    }

}
async CreateReviewsProduct({stars,name,email,review,products}){
    try{
        const reviews = new ReviewModel({
            stars,name,email,review,products
        })

        const reviewResult = await reviews.save();
        return reviewResult;
    }catch(err){
        console.log("err",err)
        throw APIError('API Error', STATUS_CODES.INTERNAL_ERROR, 'Unable to Create Sub-categories')

    }

}
async GetReviewsProduct(productsid){
    try{
        const review = await ReviewModel.find({ products: productsid});
     
        return review;
    }catch(err){
        console.log("err",err)
        throw APIError('API Error', STATUS_CODES.INTERNAL_ERROR, 'Unable to Create Sub-categories')

    }

}


    
}

module.exports = ProductRepository;