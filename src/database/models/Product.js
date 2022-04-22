const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ProductSchema = new Schema({
    name: String,
    type: {type: String, enum: ['best', 'top','special']},
    unit: Number,
    price: Number,
    available: Boolean,
    suplier: String,
    info:String,
    brand:{
        type:mongoose.Types.ObjectId,
        ref:'Brand'
    },
    category:{
        type:mongoose.Types.ObjectId,
        ref:'Categories'
    },
    description:{
        title:String,
        desc:String
    },
    subcategories:[
        {
            type:mongoose.Types.ObjectId,
            ref:'SubCategories'
        },
    ],
    specification:[
        {
        title:String,
        desc:String
        },
    ],
    image:[
        {
            arg:String,
            path:String
        }
    ]
    


});

module.exports =  mongoose.model('product', ProductSchema);