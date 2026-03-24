const Joi = require("joi");


// now we write our schema to validate here
// inside joi we get an object as listing--> it should have some attributes, inside obj we keep the parameters..


// and will export the listingSchema
module.exports =  listingSchema = Joi.object({
    listing:Joi.object({
        title:Joi.string().required(),
        description:Joi.string().required(),
        location:Joi.string().required(),
        country:Joi.string().required(),
        price:Joi.number().required().min(0),
        img:Joi.string().allow("",null),

    }).required()


})


// schema for review validation

module.exports.reviewSchema = Joi.object({
    review: Joi.object({
        rating:Joi.number().required().min(1).max(5),
        comment:Joi.string().required()
    }).required()
})
// acquire this as similar to how we aquired the listing Schema in app.js

