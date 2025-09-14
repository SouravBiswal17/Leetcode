const mongoose=require('mongoose');
const{Schema}=mongoose;

const problemSchema=new Schema({
    title:{
        type:string,
        required:true
    },
    description:{
        type:string,
        required:true
    },
    deficulty:{
        type:string,
        enum:['easy','medium','hard'],
        required:true
    },
    tags:{
        type:string,
        enum:['array','string','graph','dp'],
        required:true
    },
    visibleTestCases:[
        {
            input:{
                type:string,
                required:true
            },
            output:{
                type:string,
                required:true
            },
            explanation:{
                type:string,
                required:true
            }
        }
    ],
    HiddenTestCases:[
        {
            input:{
                type:string,
                required:true
            },
            output:{
                type:string,
                required:true
            }
        }
    ],
    startCode:[
        {
            language:{
                type:string,
                required:true
            },
            initialCode:{
                type:string,
                required:true
            }
        }
    ],
    referenceSolution:[
        {
            language:{
                type:string,
                required:true
            },
            completeCode:{
                type:string,
                required:true
            }
        }
    ],
    problemCreater:{
        type:Schema.Types.ObjectId,
        ref:'user',
        required:true
    }

})
const problem=mongoose.model('problem',problemSchema);
module.exports=problem;



const referenceSolution=[
    {
        language:"c++",
        completeCode:"c++ code"
    },
    {
        language:"java",
        completeCode:"java code"
    },
    {
        language:"js",
        completeCode:"js code"
    }

]