const friendModel=require("./database/friendModel")

const getAllFriend=async(req,res)=>{
    try{
        let data=await friendModel.find({}).sort({name:1})
        
        return res.status(200).json({data})
    }
    catch(e){
        console.log(e)
        return res.status(500).json({data:[]})
    }
}

const getFriendById=async(req,res)=>{
    try{
        let id=req.params.id
        let data=await friendModel.findOne({id})
        
        return res.status(200).json(data)
    }
    catch(e){
        console.log(e)
        return res.status(500).json({})
    }
}

const addFriend=async(req,res)=>{

    try{
        let name=req.body.name
        friendModel.create({name},(err)=>{
            if(err){
                console.log(err)
                return res.status(500).json({status:false})
            }
            else{
                return res.status(200).json({status:true})
            }
        })
    }
    catch(e){
        console.log(e)
        return res.status(500).json({status:false})
    }

}

module.exports={getAllFriend,getFriendById,addFriend};