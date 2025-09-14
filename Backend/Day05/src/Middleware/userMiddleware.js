const jwt=require('jsonwebtoken');
const User = require("../models/user");
const redisClient = require("../config/redis");

const userMiddleware=async(req,res,next)=>{
    
   try{ const {token}=req.cookies;
    if(!token)
        throw new Error("Invalid Token");
        const payload=jwt.verify(token,process.env.JWT_KEY);
        const {_id}=payload;
        if(!_id)
            throw new Error("invalid Id");
        const result=await  User.findById(_id);

        if(!result)
            throw new Error("User not found");

        IsBlocked=await redisClient.exists(result);

        if(IsBlocked)
            throw new Error("User is already blocked");

        req.result=result;
        next();
    }catch(err){
        res.status(401).send("Error"+err);
    }
    }


module.exports=userMiddleware;