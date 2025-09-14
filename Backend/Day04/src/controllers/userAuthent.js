const redisClient = require("../config/redis");
const User =require("../models/user");
const validate =require("../utils/validator");
const  bcrypt=require('bcrypt');
const jwt =require('jsonwebtoken');


const register= async(req,res)=>{ 
    try{
        //validate user every field is not in proper format
        validate(req.body);
       const{firstName,emailId,password}= req.body;

       //password ta directly save nai kari kina hash code kari ki save karba
       req.body.password= await bcrypt.hash(password,10);
       req.body.role='user';
       //digital signature
       const user=await User.create(req.body);
       const token=jwt.sign({_id:user._id,emailId:emailId,role:user.role},process.env.JWT_KEY,{expiresIn:60*60});
        res.cookie('token',token,{maxAge:60*60*1000});
       //creating user in database
       
       res.status(201).send("User Registered Succesfully");
    }
    catch(err){
        res.status(400).send("ERROR :"+err);

    }
}
const adminRegister=async(req,res)=>{
   try {
    validate(req.body);

    const {firstName,emailId,password}=req.body;
    req.body.password= await bcrypt.hash(password,10);
    req.body.role='admin';
   //digital signature
   const user=await User.create(req.body);
   const token=jwt.sign({_id:user._id,emailId:emailId,role:user.role},process.env.JWT_KEY,{expireAt:60*60});

   res.cookie("token",token,{maxAge:60*60*1000});

   
   res.status(201).send("registered success fully")
}catch(err){
    res.status(400).send("Error :"+err);
}
}
const login=async(req,res)=>{
    try{
        const {emailId,password}=req.body;
        if(!emailId) 
            throw new Error("Invalid Credential");
        if(!password)
            throw new Error("Invalid Credential");


        const user=await User.findOne({emailId});
        const match=bcrypt.compare(password,user.password);

        if(!match)
            throw new Error("Invalid Credential");

        const token=jwt.sign({_id:user._id,emailId},process.env.JWT_KEY,{expiresIn:60*60});
        res.cookie('token',token,{maxAge:60*60*1000},{httpOnly: true});

        res.send("login succesfully");
    }
    catch(err){
        res.status(401).send("Error:"+err);
    }
}


const logout=async(req,res)=>{ 
    try{
        const{token}=req.cookie;
        const payload=jwt.decode(token);
        await redisClient.set(`token:${token}`,"blocked");
        await redisClient.expireAt(`token:${token}`,payload.exp);

        res.cookie("token",null,{expire:new Date(Date.now())});
        res.send("Logout succesfully");
        
    }
    catch(err){
        res.status(502).send("Error :"+err);
    }
}

module.exports={register,adminRegister,login,logout};