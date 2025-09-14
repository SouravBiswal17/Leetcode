const { config } = require("dotenv");
const User=require("../models/user")
const jwt=require("jsonwebtoken");
const redisClient=require("../config/redis");
 
 
 const adminMiddleware=async(req,res,next)=>{
   try { const{token}=req.cookies;
    if(!token)
        throw new Error("Invalid token3");
    
    const payload=jwt.verify(token,process.env.JWT_KEY);
    const {_id}=payload;
    if(!_id)
        throw new Error("Invalid token1");
    const result=await User.findById(_id);
    if(!result)
        throw new Error("User not found");
    if(payload.role!='admin')
        throw new Error("Unauthorized Admin");
    const IsBlocked=await redisClient.exists(`token:${token}`);

    if(IsBlocked)
        throw new Error("User blocked");
    next();
    }catch(err){
        res.status(400).send("Error: "+err);
    }
 }
 module.exports=adminMiddleware;