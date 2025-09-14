const getLanguageById=require('../utils/ProblemUtility')


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
            const submissions=visibleTestCases.map((input,output)=>{({
                source_code:completeCode,
                language_id:languageId,
                stdin:input,
                expected_output:output
            })})};

            const submitResult=await submitBatch(submissions);


    }catch(err){

    }

}