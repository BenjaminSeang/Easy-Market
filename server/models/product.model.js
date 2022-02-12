const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({

    title: {
        type: String,
        required: [true, "Please enter the product's title"],
        minlength: [3, "A title must be at least 3 character-long"] 
    },

    price: {
        type: Number,
        required: [true, "Please enter a price"],
        min: [ 0, "A price must be larger than 0"]
    },

    description: {
        type: String,
        required: [true, "Please enter a description for the product"],
        minlength: [3, "A description must be at least 3 character-long "] 
    },

    shipping: {
        type: String,
        required: [true, "Please indicate the shipping method"],
        enum: [
            "Free Shipping",
            "Buyer pays for the shipping"
        ]
    },

    image:{
        type: String,
        required: [true, "Please include an image for the product"] 
    },

    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }

}, {timestamps: true})



const Product = mongoose.model("Product", ProductSchema);

module.exports = Product;