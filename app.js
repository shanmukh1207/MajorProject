const express = require("express");
const app = express()
const mongoose = require("mongoose")
const methodOverride = require("method-override")
const Listing = require("./Models/listing")

// requiring things for pat b
const ejsMate = require("ejs-mate");
const wrapAsync = require("./utils/wrapAsync.js")
const ExpressError = require("./utils/ExpressErrors.js")
const Joi = require("joi");
const {listingSchema} = require("./schema.js");



const path = require("path")
const port = 8080;


MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust"

main().then(()=>{
    console.log('connected to db')
}).catch(err =>{
    console.log(err)
})
async function main(){
    await mongoose.connect(MONGO_URL)
}

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.urlencoded({extended:true}));// to parse data inurl
app.use(methodOverride("_method"))

// added in part b
app.engine('ejs',ejsMate)
app.use(express.static(path.join(__dirname,"/public")))

app.get("/",(req,res)=>{
    res.send("Hi, I am Root");
})


const validateListing =  (req,res,next)=>{
    let {error} = listingSchema.validate(req.body);
 if(error){
    //    throw  new ExpressError(400,error);
    throw  new ExpressError(400,errMsg);
    }else{
        next();

    }
}

    
    


app.get("/listings",async(req,res)=>{
    // Listing.find({}).then((res)=>{
    //     console.log(res)
    // })// to check weather we are getting the data or not

    const allListings = await Listing.find({})
    res.render("listings/index.ejs",{allListings})
})
//New route-> new will work as :id if you keep it after show /Route
app.get("/listings/new",(req,res)=>{
    res.render("listings/new.ejs")
})

//show Route
app.get("/listings/:id", async (req,res)=>{
    let {id} = req.params;
    const listing = await Listing.findById(id)
    res.render("listings/show.ejs",{listing})

})
//create Route
// app.post("/listings", async (req,res,next)=>{

//     try{
// //let listing = req.body.listing;
// const newListing = new Listing(req.body.listing);

//  await newListing.save()
//  res.redirect("/listings");
//  }catch(err){
//     next(err)
//  }
// })

// betterversion of writing trycatch with wrapAsync
// app.post("/listings",wrapAsync(async(req,res,next)=>{
    // if(!req.body.listing){
    //     throw new ExpressError(400,"Send valied data for listing")
    // }
    // const newListing = new Listing(req.body.listing);

    // for to deal with errors caused by individual fields..
    // if(!newListing.title){
    //     throw new ExpressError(400,"title is missing")
    // }
    // if(!newListing.description){
    //     throw new ExpressError(400,"description is missing")
    // }
    // if(!newListing.img){
    //     throw new ExpressError(400,"img is missing")
    // }
    // if(!newListing.location){
    //     throw new ExpressError(400,"location is missing")
    // }
    // if(!newListing.price){
    //     throw new ExpressError(400,"price is missing")
    // }

    // using schema validation


    app.post("/listings",wrapAsync(async(req,res,next)=>{
        //call for validate listing
        validateListing;

    let result = listingSchema.validate(req.body);

    console.log(result)
    if(result.error){
       throw  new ExpressError(400,result.error);
    }

    const newListing = new Listing(req.body.listing);

    
    await newListing.save();
    res.redirect("/listings");

}))





//edit route

app.get("/listings/:id/edit",async (req,res)=>{
    let {id} = req.params;
    const listing = await Listing.findById(id);
    res.render("listings/edit.ejs",{listing});

})

//update route

app.put("/listings/:id",async(req,res)=>{
    validateListing;
    let {id} = req.params;
   await Listing.findByIdAndUpdate(id,{...req.body.listing})// it is js object which contains all patameters
   res.redirect(`/listings/${id}`)
})

//delete Route
app.delete("/listings/:id", async(req,res)=>{
    let {id} = req.params // why params why not body 
   let deletedListing = await  Listing.findByIdAndDelete(id)

   console.log(deletedListing)
   res.redirect("/listings")
})

// app.all("*",(req,res,next)=>{
//     next(new ExpressError(404,"Page not Found !"))
// })


app.use((err,req,res,next)=>{
    let{statusCode = 500,message = "Somthig went wrong"} = err
    // res.status(statusCode).send(message);
    res.status(statusCode).render("listings/error.ejs",{message})
    //res.render("listings/error",{err})
})


 











app.listen(port,()=>{
    console.log(`app is listening at port ${port}`)
})

