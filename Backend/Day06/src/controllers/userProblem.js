const {getLanguageById,submitBatch,submitToken}=require('../utils/ProblemUtility')
const problem=require('../models/problem')

const createProblem= async(req,res)=>{

    const{title,description,deficulty,tags,visibleTestCases,HiddenTestCases,startCode,referenceSolution,problemCreater}=req.body;
    try{
        for(const {language,completeCode} of referenceSolution){
            //source code
            //language_id
            //stdin
            //expectedOutput:

            const languageId=getLanguageById(language);
            //creating batch submission
            const submissions=visibleTestCases.map((testcase)=>{({
                source_code:completeCode,
                language_id:languageId,
                stdin:testcase.input,
                expected_output:testcase.output
            })})

            const submitResult=await submitBatch(submissions);
            const resultToken=submitResult.map((value)=>value.token);
            const testResult=await submitToken(resultToken);

            for(const test of testResult){
                if(test.status_id!=3){
                    return res.status(400).send("Error Occured"); 
                }
            }
        };

        const userProblem=await problem.create({
            ...req.body,
            problemCreater:req.result.id
        })    
        res.status(201).send("problem saved succesfully");

    }catch(err){
        res.send("Error"+err);
    }

}

const updateProblem= async(req,res)=>{
    const {id}=req.params;
    const{title,description,deficulty,tags,visibleTestCases,HiddenTestCases,startCode,referenceSolution,problemCreater}=req.body;
    try{
        if(!id){
            res.status(400).send("missing  Id");
            const DsaProblem=await problem.findById(id);
            if(!DsaProblem){
                return res.status(404).send("Id is not present in server");
            }
        }
        for(const {language,completeCode} of referenceSolution){
            //source code
            //language_id
            //stdin
            //expectedOutput:

            const languageId=getLanguageById(language);
            //creating batch submission
            const submissions=visibleTestCases.map((testcase)=>{({
                source_code:completeCode,
                language_id:languageId,
                stdin:testcase.input,
                expected_output:testcase.output
            })})

            const submitResult=await submitBatch(submissions);
            const resultToken=submitResult.map((value)=>value.token);
            const testResult=await submitToken(resultToken);

            for(const test of testResult){
                if(test.status_id!=3){
                    return res.status(400).send("Error Occured"); 
                }
            }
        };
        const newProblem=await problem.findOneAndUpdate(id,{...req.body},{runValidators:true,new:true});
        res.status(200).send(newProblem);

    }catch(err){
        res.status(404).send("Error"+err);
    }
}

const deleteProblem= async(req,res)=>{
    const {id}=req.params;
    try{
        if(!id){
           return res.status(400).send("missing field ID");
        }
       const deletedProblem= problem.findByIdAndDelete(id);
       if(!deleteProblem){
        return res.status(404).send("Error occur while deleting file");
       }
       else{
        return res.status(400).send("problem deleted succesfully");
       }
    }catch(err){
        res.status(500).send("Error"+err);
    }
}

const getproblemById=async(req,res)=>{
    const {id}=req.params;
    try{
        if(!id)
            return res.status(404).send("ID not found");
        const getProblem=await problem.findById(id);
        if(!getProblem)
            return res.status(404).send("Problem is missing");

        res.status(200).send(getProblem);
    }catch(err){
            res.status(500).send("Error"+err);
    }

}

const getAllProblem=async(req,res)=>{
        
    try{
        
        const getProblem=await problem.find({});
        if(getProblem.length==0)
            return res.status(404).send("Problem is missing");

        res.status(200).send(getProblem);
    }catch(err){
            res.status(500).send("Error"+err);
    }
}

module.exports={createProblem,updateProblem,deleteProblem,getproblemById,getAllProblem};