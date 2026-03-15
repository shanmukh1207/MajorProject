const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const listingSchema = new Schema({

    title:{
        type:String,
        required:true
    },

    description:{
        type:String,
        required:true
    },

    img:{
        type:String,
        default:"https://media.istockphoto.com/id/117211856/photo/where-coconuts-grow.jpg?s=1024x1024&w=is&k=20&c=asnVSAWfN_SKJtf0b5k_fDc_DSnBknzA9I6noKXlY8k=",
        set:(v)=> v === ""
        ? "https://media.istockphoto.com/id/117211856/photo/where-coconuts-grow.jpg?s=1024x1024&w=is&k=20&c=asnVSAWfN_SKJtf0b5k_fDc_DSnBknzA9I6noKXlY8k="
        : v
    },

    price:{
        type:Number,
        required:true
    },

    location:{
        type:String,
        required:true
    },

    country:{
        type:String,
        required:true
    }

});

const Listing = mongoose.model("Listing", listingSchema);

module.exports = Listing;