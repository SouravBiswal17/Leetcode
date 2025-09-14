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
module.exports=createProblem;