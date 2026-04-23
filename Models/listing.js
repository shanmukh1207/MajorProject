const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const Review = require("./review.js")

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
        // type:String,
        // default:"https://media.istockphoto.com/id/117211856/photo/where-coconuts-grow.jpg?s=1024x1024&w=is&k=20&c=asnVSAWfN_SKJtf0b5k_fDc_DSnBknzA9I6noKXlY8k=",
        // set:(v)=> v === ""
        // ? "https://media.istockphoto.com/id/117211856/photo/where-coconuts-grow.jpg?s=1024x1024&w=is&k=20&c=asnVSAWfN_SKJtf0b5k_fDc_DSnBknzA9I6noKXlY8k="
        // : v

        url : String,
        filename : String,
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
    },
    reviews:[{
        type:Schema.Types.ObjectId,
        ref:"Review"
    }],

    owner : {
        type : Schema.Types.ObjectId,
        ref: "User",

    },
    geometry :
        {
    type: {
      type: String, // Don't do `{ location: { type: String } }`
      enum: ['Point'], // 'location.type' must be 'Point'
      required: true
    },
    coordinates: {
      type: [Number],
      required: true
    }
    }



});


// we will make changes in the listigs schema and add an array list of reviews...

//widdleware 
listingSchema.post("findOneAndDelete", async(listing)=>{
if(listing){
    await Review.deleteMany({_id:{$in: listing.reviews}});


}



 
})


const Listing = mongoose.model("Listing", listingSchema);

module.exports = Listing;