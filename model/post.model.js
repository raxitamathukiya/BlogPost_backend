const mongoose=require("mongoose")
const postSchema=mongoose.Schema({
    title:{type:String,require:true},
    description:{type:String,require:true},
    image:{type:String,require:true},
    user:{type:String,require:true},
    user_id:{type:String,require:true}
})
const postModel=mongoose.model("post",postSchema)
module.exports={
    postModel
}