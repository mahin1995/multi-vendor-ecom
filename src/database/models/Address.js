const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const AddressSchema = new Schema({
    name:String,
    street: String,
    optional:String,
    postalCode: String,
    city: String,
    country: String,
    email:String,
    phone:String
});

module.exports =  mongoose.model('address', AddressSchema);