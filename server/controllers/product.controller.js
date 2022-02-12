const Product = require('../models/product.model');
const jwt = require("jsonwebtoken");
const User = require('../models/user.model');

module.exports = {

    findAllProducts: (req, res) =>{
        Product.find()
            .populate("createdBy", "username email")
            .then((allProducts)=>{
                res.json(allProducts);
            })
            .catch((err)=>{
                console.log("Find All Products failed");
                res.json({message: "Error in findAllProducts", error: err})
            })
    },

    createNewProduct: (req, res)=>{

        const newProductObject = new Product(req.body);

        newProductObject.createdBy = req.jwtpayload.id;

        newProductObject.save()
            .then((newProduct)=>{
                console.log(newProduct);
                res.json(newProduct)
            })
            .catch((err)=>{
                console.log("Error in createNewProduct");
                res.status(400).json(err);
            })
    },

    findOneProduct: (req, res)=>{
        Product.findOne({_id: req.params.id}) 
            .then((oneProduct)=>{
                console.log(oneProduct);
                res.json(oneProduct)
            })
            .catch((err)=>{
                console.log("Find One Product failed");
                res.json({message: "Error in findOneProduct", error: err})
            })
    },

    deleteProduct: (req, res)=>{
        Product.deleteOne({_id: req.params.id})
            .then((deletedProduct)=>{
                console.log(deletedProduct);
                res.json(deletedProduct)
            })
            .catch((err)=>{
                console.log("Delete One Product failed");
                res.json({message: "Error in deleteProduct", error: err})
            })
    },

    updateProduct: (req, res)=>{
        Product.findOneAndUpdate({_id: req.params.id},
            req.body,
            {new: true, runValidators: true} 
            )
            .then((updatedProduct)=>{
                console.log(updatedProduct);
                res.json(updatedProduct)
            })
            .catch((err)=>{
                console.log("Error in updateProduct");
                res.status(400).json(err); 
            })
    },


    findAllProductsByUser: (req, res)=>{

        console.log("req.jwtpayload.username :", req.jwtpayload.username )
        console.log(" req.params.username:", req.params.username)

        if(req.jwtpayload.username !== req.params.username){
            console.log("not user")
            User.findOne({username: req.params.username})
                .then((userNotLoggedIn)=>{
                    Product.find({createdBy: userNotLoggedIn._id})
                        .populate("createdBy", "username")
                        .then((allProductsFromUser)=>{
                            console.log(allProductsFromUser);
                            res.json(allProductsFromUser);
                        })
                        .catch((err)=>{
                            console.log(err);
                            res.status(400).json(err);
                        })
                })
                .catch((err)=>{
                    console.log(err);
                    res.status(400).json(err);
                })
        }
        else{
            console.log("current user")
            console.log("req.jwtpayload.id:", req.jwtpayload.id);
            Product.find({createdBy: req.jwtpayload.id})
                .populate("createdBy", "username")
                .then((allProductsFromLoggedInUser)=>{
                    console.log(allProductsFromLoggedInUser);
                    res.json(allProductsFromLoggedInUser);
                })
                .catch((err)=>{
                    console.log(err);
                    res.status(400).json(err);
                })

        }
    } 

}