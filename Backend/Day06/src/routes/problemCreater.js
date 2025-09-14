const express=require('express');
const problemRouter=express.Router();
const adminMiddleware=require('../Middleware/adminMiddleware')
const {createProblem,updateProblem,deleteProblem}=require('../controllers/userProblem')
const userMiddleware=require('../Middleware/userMiddleware')


problemRouter.post("/create",adminMiddleware,createProblem);
problemRouter.put("/update:id",adminMiddleware,updateProblem);
problemRouter.delete("/problemDelete:id",adminMiddleware,deleteProblem);


problemRouter.get("/problemById:id",userMiddleware,getproblemById);
problemRouter.get("/allProblem",userMiddleware,getAllProblem);
problemRouter.get("/problemSolvedByUser",userMiddleware,solvedProblem);

module.exports=problemRouter;