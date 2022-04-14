const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const SubCategoriesSchema = new Schema({
    name: String,
    desc: String,
    products:[
        {
            type:mongoose.Types.ObjectId,
            ref:'product'
        }
    ],

    
},
{
    timestamps:true
}
);

module.exports =  mongoose.model('SubCategories', SubCategoriesSchema);