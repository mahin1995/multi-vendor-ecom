const { ProductRepository } = require("../database");
const { FormateData } = require("../utils");
const { APIError } = require('../utils/app-errors');

// All Business logic will be here
class ProductService {

    constructor(){
        this.repository = new ProductRepository();
    }

    async CreateProduct(productInputs){
        try{
            const productResult = await this.repository.CreateProduct(productInputs)
            return FormateData(productResult);
        }catch(err){
            console.log(err)
            throw new APIError('Data Not found')
        }
    }
    
    async GetProducts(){
        try{
            const products = await this.repository.Products();
    
            let categories = {};
    
            products.map(({ type }) => {
                categories[type] = type;
            });
            
            return FormateData({
                products,
                categories:  Object.keys(categories) ,
            })

        }catch(err){
            throw new APIError('Data Not found')
        }
    }


    async GetProductDescription(productId){
        try {
            const product = await this.repository.FindById(productId);
            return FormateData(product)
        } catch (err) {
            throw new APIError('Data Not found')
        }
    }

    async GetProductWithPopulate(productId){
        try {
            const product = await this.repository.FindByIdWithpopulate({id:productId,populate:['brand',"subcategories","category"]});
            return FormateData(product)
        } catch (err) {
            throw new APIError('Data Not found')
        }
    }
    async GetAllCategorywitSubCategory(){
        try {
            const product = await this.repository.FindCategroyWithPopulate({populate:"subcategories"});
            return FormateData(product)
        } catch (err) {
            throw new APIError('Data Not found')
        }
    }
    async GetProductsByType(type){
        try {
            const products = await this.repository.FindByType(type);
            return FormateData(products)
        } catch (err) {
            throw new APIError('Data Not found')
        }

    }

    async GetSelectedProducts(selectedIds){
        try {
            const products = await this.repository.FindSelectedProducts(selectedIds);
            return FormateData(products);
        } catch (err) {
            throw new APIError('Data Not found')
        }
    }

    async GetProductById(productId){
        try {
            return await this.repository.FindById(productId);
        } catch (err) {
            throw new APIError('Data Not found')
        }
    }


    async CreateBrand(brandInputs){
        try{
            const {name,desc}=brandInputs
            const brandResult = await this.repository.CreateBrands(name,desc)
            return FormateData(brandResult);
        }catch(err){
            throw new APIError('Data Not found')
        }
    }
    async CreateSubcategorie(subcategoriesInputs){
        try{
            const result = await this.repository.CreateSubcategories(subcategoriesInputs)
            return FormateData(result);
        }catch(err){
            throw new APIError('Data Not found')
        }
    }
    async Createcategorie(categoriesInputs){
        try{
            const result = await this.repository.CreateCategories(categoriesInputs)
            return FormateData(result);
        }catch(err){
            throw new APIError('Data Not found')
        }
    }
    async CreateReivew(categoriesInputs){
        try{
            const result = await this.repository.CreateReviewsProduct(categoriesInputs)
            return FormateData(result);
        }catch(err){
            throw new APIError('Data Not found')
        }
    }
    async GetReview(ProductId){
        try{
            const result = await this.repository.GetReviewsProduct(ProductId)
            return FormateData(result);
        }catch(err){
            throw new APIError('Data Not found')
        }
    }
    async GetProductBySubCategory(subCategoryId){
        try{
            const result = await this.repository.FindBySubCategory(subCategoryId)
            return FormateData(result);
        }catch(err){
            throw new APIError('Data Not found')
        }
    }
     
}

module.exports = ProductService;