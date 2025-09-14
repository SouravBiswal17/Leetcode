
const mongoose=require("mongoose");
const {schema}=mongoose;

const userSchema= new schema({
    firstName:{
        type:String,
        required:true,
        minLength:3,
        maxLength:20
    },
    lastName:{
        type:String,
        minLength:3,
        maxLength:20
    },
    emailId:{
        type:String,
        required:true,
        unique:true,
        immutable:true,
        lowerCase:true,
        trim:true
    },
    age:{
        type:Number,
        min:6,
        max:80
    },
    role:{
        type:String,
        enum:['user','admin'],
        default:'user'

    },
    problemSolved:{
        type:[String]
    },
    password:{
        type:String,
        required:true
    }
},{timestamps:true});

const User=mongoose.model("user",userSchema);
module.exports= User;
