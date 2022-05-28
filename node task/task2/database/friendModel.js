const {Schema,model}=require("mongoose")
 
const friendSchema=new Schema({
    "name":{
        type:String,
        required:true
    }
})
const friend=model("friends",friendSchema)
friend.createIndexes()
module.exports=friend;