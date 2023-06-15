const mongoose=require("mongoose");

const UserSchema=mongoose.Schema({
    name:String,
    avatar:String,
    email:String,
    password:String
});

const Usermodel=mongoose.model("user",UserSchema);

module.exports={Usermodel};