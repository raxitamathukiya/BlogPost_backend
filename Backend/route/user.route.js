const express=require("express")
const userRoute=express.Router()
const {userModel}=require("../model/user.model")
const {connection}=require("../db")
const jwt=require("jsonwebtoken")
const bcrypt=require("bcrypt")


userRoute.post("/register",async(req,res)=>{
    const {name,age,email,password}=req.body
    try {
        bcrypt.hash(password, 5, async(err, hash)=> {
            const adddata=new userModel({name,age,email,password:hash})
            await adddata.save()
            res.status(200).send({msg:`Hello ${req.body.name} registration is successful done!!`})
        }); 
    } catch (error) {
        console.log("error")
    }
})

userRoute.post("/login",async(req,res)=>{
    try {
        const {email,password}=req.body
        const data= await userModel.findOne({email})
        if(data){
           
            bcrypt.compare(password,data.password,(err,result)=> {
                console.log(password,data.password)
                if(result){ 
                    let token = jwt.sign({ user:data.name,user_id:data._id }, 'raxita');
                    res.status(200).send({message:`Hello ${data.name} login successfully`,"token":token})
                }
                else{
                    res.status(200).send({message:".........wrong credentials......."})
                }
            })
            
        }else{
            res.status(200).send({message:".........wrong credentials......."})
        }

    } catch (error) {
        console.log(error)
    }
})


module.exports={
    userRoute
}