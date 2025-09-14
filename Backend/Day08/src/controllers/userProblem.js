const {getLanguageById,submitBatch,submitToken}=require('../utils/ProblemUtility')
const problem=require('../models/problem')
const User=require('../models/user');


const createProblem = async (req, res) => {
    const { referenceSolution, visibleTestCases } = req.body;

    if (!referenceSolution || !Array.isArray(referenceSolution)) {
        return res.status(400).send("referenceSolution is missing or invalid");
    }

    try {
        for (const { language, completeCode } of referenceSolution) {
            const languageId = getLanguageById(language);
            const submissions = (visibleTestCases || []).map(testcase => ({
                source_code: completeCode,
                language_id: languageId,
                stdin: testcase.input,
                expected_output: testcase.output
            }));

            const submitResult = await submitBatch(submissions);
            console.log("submitResult received:", submitResult);
            if (!submitResult || !Array.isArray(submitResult)) {
                return res.status(500).send("submitBatch did not return expected result");
            }

            const resultToken = submitResult.map(value => value.token);
            console.log("resultToken:", resultToken);

            const testResult = await submitToken(resultToken);
            console.log("testResult:", testResult);
            for(const test of testResult){
            if(test.status_id!=3){
         return res.status(400).send("Error Occured");
        }
       }

        }

        const userProblem = await problem.create({
            ...req.body,
            problemCreator: req.result._id
        });
        res.status(201).send("Problem saved successfully");

    } catch (err) {
        res.status(500).send("Error: " + err.message);
    }
};
const updateProblem = async(req,res)=>{
    const {id}=req.params;
    const{title,description,deficulty,tags,visibleTestCases,HiddenTestCases,startCode,referenceSolution,problemCreater}=req.body;
    try{
        if(!id){
            return res.status(400).send("missing  Id");
            
        }
        const DsaProblem=await problem.findById(id);
        if(!DsaProblem){
                return res.status(404).send("Id is not present in server");
            }
        for(const {language,completeCode} of referenceSolution){
            //source code
            //language_id
            //stdin
            //expectedOutput:

            const languageId=getLanguageById(language);
            //creating batch submission
            const submissions = (visibleTestCases || []).map(testcase => ({
                                source_code: completeCode,
                                language_id: languageId,
                                stdin: testcase.input,
                                expected_output: testcase.output
                            }));


            const submitResult=await submitBatch(submissions);
            console.log("submitResult:", submitResult);
            const resultToken=submitResult.map((value)=>value.token);
            const testResult=await submitToken(resultToken);

            for(const test of testResult){
                if(test.status_id!=3){
                    return res.status(400).send("Error Occured"); 
                }
            }
        };
        // const newProblem=await problem.findOneAndUpdate(id,{...req.body},{runValidators:true,new:true});
        const updatedProblem = await problem.findOneAndUpdate(
             { _id: id },      
             { ...req.body },
             { runValidators: true, new: true }
            );
        res.status(200).send(updatedProblem );

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
       const deletedProblem= await problem.findByIdAndDelete(id);
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
        const getProblem=await problem.findById(id).select(' id title description difficulty tags visibleTestCases startCode ');
        if(!getProblem)
            return res.status(404).send("Problem is missing");

        res.status(200).send(getProblem);
    }catch(err){
            res.status(500).send("Error"+err);
    }

}

const getAllProblem=async(req,res)=>{
        
    try{
        
        const getProblem=await problem.find({}).select('id title difficulty tag');
        if(getProblem.length==0)
            return res.status(404).send("Problem is missing");

        res.status(200).send(getProblem);
    }catch(err){
            res.status(500).send("Error"+err);
    }
}

const solvedAllProblembyUser=async(req,res)=>{
    try{
            const userId=req.result._id;
            const user=await User.findById(userId).populate({
                path:'problemSolved',
            select:"_id title difficulty tags"
        });
            res.status(200).send(user);
    }catch(err){
        res.status(500).send("Server Error"+err);
    }
}

module.exports={createProblem,updateProblem,deleteProblem,getproblemById,getAllProblem,solvedAllProblembyUser};