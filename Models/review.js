const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const reviewSchema = new Schema({
    comment:String,
    rating:{
        type:Number,
        min:1,
        max:5

    },
    createdAt:{
        type:Date,
        default:Date.now()
    }
})



//. it is going to be   1 to n relation because one listings can have multiple reviews


module.exports = mongoose.model("Review",reviewSchema)

