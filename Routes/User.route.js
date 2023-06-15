const express=require("express");
const bcrypt = require('bcrypt');
const { Usermodel } = require("../Models/User.module");
const Userrouter=express.Router();
var jwt = require('jsonwebtoken');

Userrouter.post("/register",async(req,res)=>{
    try {
        const {name,avatar,email,password}=req.body;
        bcrypt.hash(password, 3,async function(err, hash) {
            // Store hash in your password DB.
            if(hash)
            {
                const user=new Usermodel({
                    name:name,
                    avatar:avatar,
                    email:email,
                    password:hash
                });
                await user.save();
                res.send("New user registered");
            }
        });

    } catch (error) {
        res.send({"msg":error.message});
    }
});


Userrouter.post("/login",async(req,res)=>{
    try {
        const {email,password}=req.body;
       const user =await Usermodel.findOne({email:email});
       if(user)
       {
        bcrypt.compare(password, user.password, function(err, result) {
            // result == true
            if(result)
            {
                var token = jwt.sign({ userid: user.id }, 'masai');
                res.send({"msg":"Login Successfull","token":token,"user":user});
            }else{
                res.send({"msg":"wrong credentials"});
            }
        });
       }else{
        res.send({"msg":"wrong credentials"});
       }
    } catch (error) {
        res.send({"msg":error.message});
    }
});

module.exports={Userrouter};