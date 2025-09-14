const express=require('express')
const submitRouter= express.Router();
const userMiddleware=require('../Middleware/userMiddleware')
const {submitcode,runCode}=require('../controllers/userSubmission')

submitRouter.post("/submision/:id",userMiddleware,submitcode);
submitRouter.post("/run/:id",userMiddleware,runCode);

module.exports=submitRouter;