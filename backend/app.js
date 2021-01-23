const express=require('express');
const app=express();
const bodyParser=require('body-parser');
const todoModel=require('./models/todoModel')
const cors=require('cors');
app.use(express.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cors());
const isNullOrUndefined=(data)=>data!==''&&data!==null?true:false;

app.post('/addItem',async(req,res)=>{
    const data=req.body;
    data.creationTime=new Date();
    const newItem=new todoModel(data);
    await newItem.save();
    res.status(201).send(newItem);
})
app.get('/getItems',async(req,res)=>{
     
    const data=await todoModel.find();
    res.send(data);
    
})
app.get('/getItem/:taskid',async(req,res)=>{
    const id=req.params.taskid;
    try{
    const data=await todoModel.findOne({_id:id});
    console.log(data);
    if(isNullOrUndefined(data))
    {
        res.send(data);
    }
    else{
        res.status(400).send(`id ${id} not found`);
    }
  }
  catch(e)
  {
    res.status(400).send(`id ${id} not found`);
  }

    
})

app.delete('/deleteItem/:taskid',async(req,res)=>{
    const id=req.params.taskid;
    const data=await todoModel.findOne({_id:id});
    if(isNullOrUndefined(data))
    {
        await todoModel.deleteOne({_id:id});
        res.status(200).send(`task with id ${id} deleted`);
    }
    else{
        res.send(`${id} not present`);   
    }
    
})
app.put('/editItem/:taskid',async(req,res)=>{
    const {task}=req.body;
    const id=req.params.taskid;
    const data=await todoModel.findOne({_id:id});
    if(isNullOrUndefined(data))
    {
        data.task=task;
        await data.save();
        res.send(`Data Updated as ${data}`);
    }
    else{
        res.status(400).send(`${id} not found`);
    }
})

module.exports=app;