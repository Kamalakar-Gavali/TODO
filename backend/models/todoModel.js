const mongoose=require('mongoose');
const todoSchema=new mongoose.Schema({
    task:String,
    creationTime:Date
    
})
module.exports=todoModel=mongoose.model('todo',todoSchema);