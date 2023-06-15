const express=require("express");
const { Blogmodel } = require("../Models/Blog.module");

const Blogrouter=express.Router();

Blogrouter.post("/blog",async(req,res)=>{
    try {
        let blog= new Blogmodel(req.body);
        await blog.save();
        res.send("New blog has been added");
    } catch (error) {
        res.send({"msg":error.message});
    }
});

Blogrouter.get("/blog",async(req,res)=>{
    try {
       let {page,limit,title,category,sort,order}=req.query;

    let limits=100;
    let skip=0;
    let titles={};
    let categories={};
    let sortted={Date:-1};

    if(page && limit)
    {
        skip=(page-1)*limit;
    }else{
        limit=limits;
    }

    if(title)
    {
        titles={title:title}
    }

    if(category)
    {
        categories={category:category}
    }

    if(order && sort)
    {
        if(order=="asc")
        {
            sortted={Date:1}
        }
    }

    let blogs=await Blogmodel.find(categories).sort(sortted).skip(skip).limit(limit);

    res.send(blogs);

    } catch (error) {
        res.send({"msg":error.message});
    }

  
});

Blogrouter.patch("/blog/:id",async(req,res)=>{
    try {
        const {id}=req.params;

  await Blogmodel.findByIdAndUpdate({_id:id},req.body);
  res.send({"msg":"Item has been updated"})

    } catch (error) {
        res.send({"msg":error.message});
    }

  
});

Blogrouter.delete("/blog/:id",async(req,res)=>{
    try {
        const {id}=req.params;

  await Blogmodel.findByIdAndDelete({_id:id});
  res.send({"msg":"Item has been Deleted"})

    } catch (error) {
        res.send({"msg":error.message});
    }

  
});

Blogrouter.patch("/blog/:id/like",async(req,res)=>{
    try {
        const {id}=req.params;
  let user =await Blogmodel.findOne({_id:id});
 
        await Blogmodel.findByIdAndUpdate({_id:id},{likes:user.likes+1});
        res.send({"msg":"liked"});

    } catch (error) {
        res.send({"msg":error.message});
    }

  
});

Blogrouter.patch("/blog/:id/comment",async(req,res)=>{
    try {
        const {id}=req.params;
  let user =await Blogmodel.findOne({_id:id});
 
        await Blogmodel.findByIdAndUpdate({_id:id},{Comments:[...user.Comments,req.body]});
        res.send({"msg":"commented"});

    } catch (error) {
        res.send({"msg":error.message});
    }

  
});




module.exports={Blogrouter};



// {
//     "name":"jayesh",
//    "title":"construction business",
//    "content":"Construction material ledger prices",
//    "category":"Business",
//    "Date":"2023-04-15",
//    "likes":0,
//    "Comments":[]
// }