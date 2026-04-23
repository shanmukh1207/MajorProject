if(process.env.NODE_ENV != "production"){
 require("dotenv").config();
}



const express = require("express");
const app = express();
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const Listing = require("./Models/listing");
const Review = require("./Models/review");
const listings = require("./routes/listing.js")
const reviews = require("./routes/review.js")
const user = require("./routes/user.js")

const ejsMate = require("ejs-mate");
const wrapAsync = require("./utils/wrapAsync.js");
const ExpressError = require("./utils/ExpressErrors.js");
const { listingSchema, reviewSchema } = require("./schema.js");

const session = require("express-session")
const flash = require("connect-flash");


const passport = require("passport")
const localStrategy = require("passport-local")
const User = require("./Models/user.js");


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
    secret:"mysupersecretcode",
    resave:false,
    saveUninitialized:true,

    cookie:{
        expires:Date.now() + 7*24*60*60*1000,
        maxAge : 7*24*60*60*1000,
        httpOnly:true,
    }
};


app.use(session(sessionOptions));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
    res.locals.success = req.flash("success") || [];

    let failureMsg = req.flash("failure");
    let errorMsg = req.flash("error"); // passport default
    res.locals.failure = (failureMsg && failureMsg.length) ? failureMsg : (errorMsg || []);

    res.locals.currUser = req.user;
    next();
});

// Root
// app.get("/", (req, res) => {
//     res.send("Hi, I am Root");
// });

app.get("/demouser",async (req,res)=>{
    let fakeUser = new User({
        email:"student@gmail.com",
        username:"delta-student"
    });

    let registeredUser = await User.register(fakeUser,"hello world");
    res.send(registeredUser)
})

app.use("/listings", listings);
app.use("/listings/:id/reviews", reviews);
app.use("/", user);




// 🔹 Error Handling Middleware
app.use((err, req, res, next) => {
    let { statusCode = 500, message = "Something went wrong" } = err;
    res.status(statusCode).render("listings/error.ejs", { message });
});

// Start Server
app.listen(port, () => {
    console.log(`app is listening at port ${port}`);
});
