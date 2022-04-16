const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ReviewSchema = new Schema({
    stars: Number,
    name: String,
    email: String,
    review:String,
    products:{
        type:mongoose.Types.ObjectId,
        ref:'product'
    }

},
{
    timestamps:true
}
);

module.exports =  mongoose.model('Review', ReviewSchema);