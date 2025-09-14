const mongoose=require("mongoose")
const Schema=mongoose.Schema;

const submissionSchema=new Schema({
   userId:{
    type:Schema.Types.ObjectId,
    ref:'user',
    required:true
   } ,
   problemId:{
    type:Schema.Types.ObjectId,
    ref:'Problem',
    required:true
   },
   code:{
    type:String,
    required:true,
   },
   language:{
    type:String,
    required:true,
    enum:['cpp','java','pythone','javascript','c'],
   },
   status:{
    type:String,
    enum:['pending','accepted','wrong','error'],
    default:'pending'
   },
   runtime:{
    type:Number,
    default:0
   },
   memory:{
    type:Number,
    default:0
   },
   errorMessage:{
    type:String,
    default:''
   },
   testCasePassed:{
    type:Number,
    default:0
   },
   testCaseTotal:{
    type:Number,
    default:0
   }
},{
    timestamps:true
})
const submission=mongoose.model('submission',submissionSchema);
module.exports=Submission;