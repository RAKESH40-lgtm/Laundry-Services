const mongoose = require("mongoose");

let loginSchema = new mongoose.Schema({
    email:{
        type: String,
        required:true
    },
    password:{
        type:String,
        required:true,
    }
})
const loginModals = mongoose.model("login",loginSchema)
module.exports = loginModals;