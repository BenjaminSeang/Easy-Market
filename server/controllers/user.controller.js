const User = require("../models/user.model");
const Product = require('../models/product.model');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


module.exports = {

    register: (req, res)=>{
        const user = new User(req.body);
        
            user.save()
            .then((newUser)=>{
                console.log(newUser);
                console.log("Registration Successful");
                res.json({
                    successMessage: "Registration Successful",
                    user: newUser
                });
            })
            .catch((err)=>{
                console.log("Registration Failed")
                res.status(400).json(err);
            })

    },

    login: (req, res)=>{
        User.findOne({email: req.body.email})
            .then((userRecord)=>{
                if(userRecord === null){
                //email not found
                res.status(400).json({message: "Invlaid Email/Password"})
                }
                else{
                    //email is found
                    bcrypt.compare(req.body.password, userRecord.password) 
                        .then((isPasswordValid)=>{
                            if(isPasswordValid){
                                console.log("password is valid");
                                res.cookie(
                                    "usertoken",
                                    jwt.sign(
                                        {
                                            id: userRecord._id,
                                            email: userRecord.email,
                                            username: userRecord.username,
                                            type: userRecord.type
                                        },
                                        process.env.JWT_SECRET
                                    ),
                                    {
                                        httpOnly: true,
                                        expires: new Date(Date.now() + 9000000)
                                    },
                                ).json({
                                    message: "Succesfully",
                                    userLoggedIn: userRecord.username,
                                    userId: userRecord._id,
                                    type: userRecord.type
                                });
                            }
                            else{
                                res.status(400).json({
                                    message: "Invlaid Email/Password"
                                })
                            }
                            
                        })
                        .catch((err)=>{
                            console.log(err);
                            res.status(400).json({ message: "Invlaid Email/Password" });
                        })
                }
            })
            .catch((err)=>{
                console.log(err);
                res.status(400).json({ message: "Invlaid Email/Password" });
            })

    },

    logout: (req, res) => {
        console.log("logging out");
        res.clearCookie("usertoken");
        res.json({
            message: "You have successfully logged out",
        });
    },


    getLoggedInUser: (req, res) => {
        User.findOne({ _id: req.jwtpayload.id })
            .then(user => res.json(user))
            .catch(err => res.json(err))
    },

    findAllUsers: (req, res) => {
        User.find()
            .then((allUsers) => {
                res.json(allUsers);
            })
            .catch((err) => {
                console.log("Find All Users failed");
                res.json({ message: "Error in findAllUsers", error: err })
            })
    },


}
