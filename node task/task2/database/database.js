const mongodb=require("mongoose")
const connectionString="mongodb+srv://nit:123password456@cluster0.oxoyral.mongodb.net/?retryWrites=true&w=majority"
mongodb.connect(
    connectionString
).then(()=>{
    console.log("connected...")
}).catch((e)=>{
    console.log(e)
})

module.exports=mongodb;