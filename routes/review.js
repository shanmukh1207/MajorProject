

const express = require("express");
const router = express.Router({ mergeParams: true });


const Review = require("../Models/review");

const Listing = require("../Models/listing"); 



const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressErrors.js");
const { validateReview, isLoggedin,isReviewAuthor } = require("../middleware.js");




const reviewControllers = require("../controllers/reviews.js")




// 🔹 Add Review
router.post("/", isLoggedin, validateReview, wrapAsync(reviewControllers.createReview));

//Delete Review Route
router.delete("/:reviewId",isLoggedin,isReviewAuthor,wrapAsync(reviewControllers.destrowReview))

module.exports = router;


