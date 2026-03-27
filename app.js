const express = require("express");
const app = express();
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const Listing = require("./Models/listing");
const Review = require("./Models/review");
const listings = require("./routes/listing.js")
const reviews = require("./routes/review.js")

const ejsMate = require("ejs-mate");
const wrapAsync = require("./utils/wrapAsync.js");
const ExpressError = require("./utils/ExpressErrors.js");
const { listingSchema, reviewSchema } = require("./schema.js");

const session = require("express-session")
const flash = require("connect-flash");

const path = require("path");
const port = 8080;

const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

// DB Connection
async function main() {
    await mongoose.connect(MONGO_URL);
}
main()
    .then(() => console.log("connected to db"))
    .catch(err => console.log(err));

// View Engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.engine("ejs", ejsMate);

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "/public")));
// app.use("/listings", listings)
// app.use("/listings/:id/reviews",reviews)


// -- session options

const sessionOptions = {
    secret:"musupersecretcode",
    resave:false,
    saveUninitialized:true,

    cookie:{
        expires:Date.now() + 7*24*60*60*1000,
        maxAge : 7*24*60*60*1000,
        httpOnly:true,
    }
};
// Root
app.get("/", (req, res) => {
    res.send("Hi, I am Root");
}); 



app.use(session(sessionOptions))
app.use(flash())// has to kept befor app.use listngs, 


// then create a middleware
app.use((req,res,next )=>{
    res.locals.success = req.flash("success")
    res.locals.failure = req.flash("failure")
    next();

})

app.use("/listings", listings)
app.use("/listings/:id/reviews",reviews)






// 🔹 Error Handling Middleware
app.use((err, req, res, next) => {
    let { statusCode = 500, message = "Something went wrong" } = err;
    res.status(statusCode).render("listings/error.ejs", { message });
});

// Start Server
app.listen(port, () => {
    console.log(`app is listening at port ${port}`);
});