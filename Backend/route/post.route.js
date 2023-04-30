const express=require("express")
const postRoute=express.Router()
const {postModel}=require("../model/post.model")
const {connection}=require("../db")
postRoute.post("/create",async(req,res)=>{
    try {
       let data=new postModel(req.body)
       await data.save()
       res.status(200).send("New Post Has Been Added!!!!") 
    } catch (error) {
        console.log(error)
    }
})
postRoute.get("/get",async(req,res)=>{
try {
   let data=await postModel.find({user_id:req.body.user_id})
   res.status(200).send(data) 
} catch (error) {
    console.log(error)
}
    
})
postRoute.patch("/update/:id",async(req,res)=>{
    try{
            const {id}=req.params
            const data =await postModel.findOne({_id:id})
            if((req.body.user_id)!==(data.user_id)){
                res.send(`you are not Authorized to do this action`)
            }else{
                await postModel.findByIdAndUpdate({_id:id},req.body)
                res.status(200).send(`The post with id=${id} is updated`)
            }
            await postModel.findByIdAndUpdate({_id:id},req.body)
             res.status(200).send(`The post with id=${id} is updated`)
           
    }catch(error){
        console.log(error)
    }
})
postRoute.delete("/delete/:id",async(req,res)=>{
    try{
        const {id}=req.params
        const post =await postModel.findOne({_id:id})
        if(req.body.user_id!==post.user_id){
            res.status(200).send(`you are not Authorized to do this action`)
        }
        else{
            await postModel.findByIdAndDelete({_id:id})
            res.status(200).send(`The post with id=${id} is deleted`)
        }
        
}catch(error){
    console.log(error)
}
})

module.exports={
    postRoute
}