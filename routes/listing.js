const express = require("express");
const router = express.Router()




const wrapAsync = require("../utils/wrapAsync.js");

const {isLoggedin,isOwner,validateListing} = require("../middleware.js")

const listingController = require("../controllers/listing.js");

const multer  = require('multer')
const {storage} = require("../cloudConfig.js")
const upload = multer({ storage})



 
//routes

router
    .route("/")
    // 🔹 Index Route
    .get( wrapAsync(listingController.index))
    .post( 
        // 🔹 Create Route
        isLoggedin,
        validateListing, 
        upload.single("listing[img]"),
        wrapAsync(listingController.createListing)
    );
    // .post(upload.single("listing[img]"),(req,res)=>{
    //     res.send(req.file)
    // })
// New Route
router.get("/new", isLoggedin, listingController.renderNewForm);

// Edit Route
router.get("/:id/edit", isLoggedin, isOwner, wrapAsync(listingController.renderEditForm));

router
    .route("/:id")
    //show route
    .get(wrapAsync(listingController.showListings))
    //update route
    .put(
         isLoggedin,
         isOwner,
         upload.single("listing[img]"),
         validateListing,
         wrapAsync(listingController.updateListing))

    .delete(
        isLoggedin,
        isOwner,
        wrapAsync(listingController.destroyListing))











module.exports = router;



