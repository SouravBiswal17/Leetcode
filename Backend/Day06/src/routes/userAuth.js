const express=require("express");
const {register,adminRegister,login,logout}=require("../controllers/userAuthent");
const userMiddleware=require("../Middleware/userMiddleware");
const adminMiddleware=require("../Middleware/adminMiddleware");

const authRouter=express.Router();

//register
authRouter.post("/register",register);

//admin register
authRouter.post("/admin/register",adminMiddleware,adminRegister);

//login
authRouter.post("/login",login);

//logout
authRouter.post("/logout",userMiddleware,logout);


// //get Porfile
// authRouter.get("/getProfile",getProfile);

module.exports=authRouter;