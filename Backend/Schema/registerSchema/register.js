const mongoose = require("mongoose");

const registerSchema = new mongoose.Schema({
    username:{
       type:String,
        required:true
    },  
    phoneno:{
        type:Number,
         required:true
     },
    district:{
        type:String,
         required:true
     },
    state:{
         type:String,
         required:true
     },
    email:{
        type:String,
         required:true
     },
    address:{
        type:String,
         required:true
     },
    password:{
        type:String,
         required:true
     },
    pincode:{
         type:Number,
         required:true
     },
})

const registerModals = mongoose.model("registerInfo",registerSchema);
module.exports = registerModals;