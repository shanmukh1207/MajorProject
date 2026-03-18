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