const express=require('express');
var cors = require('cors');
const { connection } = require('./db');
const { Userrouter } = require('./Routes/User.route');
const { Blogrouter } = require('./Routes/Blogrouter');
const { Auth } = require('./Middleware/Auth');
const app=express();
app.use(cors());
app.use(express.json());

app.get("/",(req,res)=>{
    res.send("Home page");
});

app.use("/users",Userrouter);

app.use(Auth);

app.use("/blogs",Blogrouter);


app.listen(8080,async()=>{
    try {
        console.log("Connecting...");
        await connection;
        console.log("Connected");
    } catch (error) {
        res.send({"msg":error.message});
    }
})