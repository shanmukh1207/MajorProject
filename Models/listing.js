const mongoose = require("mongoose")

const Schema = mongoose.Schema;

const listingSchema = new Schema({
    //title:String,
    title:{
        type:String,
       
        required:true,
        
    },
    description:String,
    img:{
        type:"String",
        default:"https://media.istockphoto.com/id/117211856/photo/where-coconuts-grow.jpg?s=1024x1024&w=is&k=20&c=asnVSAWfN_SKJtf0b5k_fDc_DSnBknzA9I6noKXlY8k=",
         set:(v)=>v===""?"https://media.istockphoto.com/id/117211856/photo/where-coconuts-grow.jpg?s=1024x1024&w=is&k=20&c=asnVSAWfN_SKJtf0b5k_fDc_DSnBknzA9I6noKXlY8k=":v
    },
    price : Number,
    location : String,
    country : String

});

const Listing = mongoose.model("Listing",listingSchema);
module.exports = Listing;