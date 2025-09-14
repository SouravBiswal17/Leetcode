const express=require('express');
const problemRouter=express.Router();
const adminMiddleware=require('../Middleware/adminMiddleware')
const problemCreate=require('../controllers/userProblem')

problemRouter.post("/create",adminMiddleware,problemCreate);
// problemRouter.patch("/:id",problemUpdate);
// problemRouter.delete("/:id",problemDelete);


// problemRouter.get("/:id",problemFaatch);
// problemRouter.get("/",getAllProblem);
// problemRouter.get("/user",solvedProblem);

module.exports=problemRouter;