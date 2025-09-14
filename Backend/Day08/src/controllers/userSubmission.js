const { create } = require("../models/user");
const {getLanguageById,submitBatch,submitToken}=require('../utils/ProblemUtility')
const Problem = require("../models/problem"); 
const submission = require("../models/submission");
const submitcode=async(req,res)=>{
    try{
    const userId= req.result._id;
    const problemId=req.params.id;

    const {code,language}=req.body;
        if(!userId || !problemId ||!code ||!language){
            res.status(400).send("some field are missing");
        }
        //fetch the problem from data base

        const problem=await Problem.findById(problemId);

        //first store the users code 
        const submitedResult=await submission.create({
            code,
            problemId,
            userId,
            language,
            testCasePassed:0,
            status:'pending',
            testCaseTotal:problem.hiddenTestCases.length,
            
            
        })
        //submit to judge zero
        const languageId  = getLanguageById(language);
        

        const hiddenTestCases = problem.hiddenTestCases ;
        if (hiddenTestCases.length === 0) {
          return res.status(400).send("No hidden test cases found for this problem");
        }
        const submissions = hiddenTestCases.map(testcase => ({
                source_code: code,
                language_id: languageId,
                stdin: testcase.input,
                expected_output: testcase.output
            }));

        const submitResult=await submitBatch(submissions);
        const resultToken = submitResult.map(value => value.token);
        const testResult = await submitToken(resultToken);
            let testCasePassed=0;
            let runTime=0;
            let memory=0;
            let status='accepted';
            let errorMessage=null;
        for(let test of testResult){
            if(test.status.id===3){
                testCasePassed++;
                runTime=runTime+parseFloat(test.time);
                memory=Math.max(memory,test.memory);
            }else{
                if(status.id===4){
                    status='error';
                    errorMessage=test.stderr;
                }else{
                    status='wrong';
                    errorMessage=test.stderr;
                }
            }
        }
        submitedResult.status = status;
        submitedResult.testCasePassed = testCasePassed;
        submitedResult.errorMessage = errorMessage;
        submitedResult.memory = memory;
        submitedResult.runTime = runTime;
        await submitedResult.save();


        //isert problem id for tracking problem solved

        if(!req.result.problemSolved.includes(problemId)){
            req.result.problemSolved.push(problemId);
            await req.result.save();
        }
        return res.status(200).send(submitedResult);
    }catch(err){
        res.status(505).send("Internal Server Error :"+err);
    }
}
const runCode=async(req,res)=>{
     try{
    const userId= req.result._id;
    const problemId=req.params.id;

    const {code,language}=req.body;
        if(!userId || !problemId ||!code ||!language){
            res.status(400).send("some field are missing");
        }
        //fetch the problem from data base

        const problem=await Problem.findById(problemId);

        
        //submit to judge zero
        const languageId  = getLanguageById(language);
        

        const visibleTestCases = problem.visibleTestCases ;
        if (visibleTestCases.length === 0) {
          return res.status(400).send("No hidden test cases found for this problem");
        }
        const submissions = visibleTestCases.map(testcase => ({
                source_code: code,
                language_id: languageId,
                stdin: testcase.input,
                expected_output: testcase.output
            }));
         const submitResult=await submitBatch(submissions);
        const resultToken = submitResult.map(value => value.token);
        const testResult = await submitToken(resultToken);
        return res.status(200).send(testResult);
    }catch(err){
        res.status(505).send("Internal Server Error :"+err);
    }
}

module.exports={submitcode,runCode};