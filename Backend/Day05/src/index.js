const express=require("express")
const app=express();
require('dotenv').config();
const main=require("./config/db");
const cookieParser=require('cookie-parser')
const authRouter=require("./routes/userAuth")
const redisClient=require("./config/redis");
const problemRouter=require('./routes/problemCreater')
app.use(express.json());
app.use(cookieParser());

app.use("/user",authRouter);
app.use("/problem",problemRouter);



const initializeConnection=async()=>{
    try{
        await Promise.all([main(), redisClient.connect()])
        .then(async()=>{
            console.log("redis and db connected");
            app.listen(process.env.PORT,()=>{
            console.log("listing at port number :"+process.env.PORT);
})
        })
    }
    catch(err){
        console.log("Error :"+err);
    }
}

initializeConnection();
    




