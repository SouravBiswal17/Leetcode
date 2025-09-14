const mongoose=require('mongoose');
const{Schema}=mongoose;

const problemSchema=new Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    deficulty:{
        type:String,
        enum:['easy','medium','hard'],
        required:true
    },
    tags:{
        type:String,
        enum:['array','string','graph','dp'],
        required:true
    },
    visibleTestCases:[
        {
            input:{
                type:String,
                required:true
            },
            output:{
                type:String,
                required:true
            },
            explanation:{
                type:String,
                required:true
            }
        }
    ],
    HiddenTestCases:[
        {
            input:{
                type:String,
                required:true
            },
            output:{
                type:String,
                required:true
            }
        }
    ],
    startCode:[
        {
            language:{
                type:String,
                required:true
            },
            initialCode:{
                type:String,
                required:true
            }
        }
    ],
    referenceSolution:[
        {
            language:{
                type:String,
                required:true
            },
            completeCode:{
                type:String,
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