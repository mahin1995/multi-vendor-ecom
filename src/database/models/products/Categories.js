const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const CategoriesSchema = new Schema({
    name: String,
    desc: String,
    image:String,
    subcategories:[
        {
            type:mongoose.Types.ObjectId,
            ref:'Subcategories'
        }
    ],

},
{
    timestamps:true
}
);

module.exports =  mongoose.model('Categories', CategoriesSchema);