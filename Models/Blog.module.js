const mongoose=require("mongoose");

const BlogSchema=mongoose.Schema({
    name:String,
    title:String,
    content:String,
    category:String,
    Date:String,
    likes:Number,
    Comments:Array
});

const Blogmodel=mongoose.model("blog",BlogSchema);

module.exports={Blogmodel};