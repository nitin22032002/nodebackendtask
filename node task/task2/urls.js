const express=require("express");
const { getAllFriend, getFriendById, addFriend } = require("./routes");
const router=express.Router()

router.get("/friends",getAllFriend);

router.get("/friends/:id",getFriendById);

router.post("/friends",addFriend);

module.exports=router;