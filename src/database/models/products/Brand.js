const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const BrandSchema = new Schema({
    name: String,
    desc: String,
},
{
    timestamps:true
}
);

module.exports =  mongoose.model('Brand', BrandSchema);