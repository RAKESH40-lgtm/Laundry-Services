const express = require("express");
const app = express();
const mongoose = require("mongoose");
const registerModals = require("./Schema/registerSchema/register");
const orderSchema = require("./Schema/OrderSchema/orderSchema")
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cors = require("cors");
require('dotenv').config();
const checkExistingMail = require("./reuseabaility");
const orders = require('./ordersPage')
const salt = 7;
app.use("/orders", orders)
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:false}))
app.listen(process.env.PORT ||8000,(err)=>{
    if(!err)
    console.log("Server started on port 8000");
    else
    {
        console.log("Server not started")
    }
});
mongoose.connect("mongodb+srv://Laundry-Cart:Laundry-Cart@laundry-cart.iqvsh4y.mongodb.net/?retryWrites=true&w=majority",()=>{
    console.log("db connected");
},(err)=>{
    console.log("db not connected")
})
app.post("/register",async (req,res)=>{
    // console.log(req.body.signup.email)
    if (await checkExistingMail(req.body.signup.email))
    {
        res.status(403).send("Try with another email");
    }
    else
    {   
        bcrypt.genSalt(salt).then((hashsalt)=>{
        bcrypt.hash(req.body.signup.password,hashsalt).then((hashedpassword)=>{
            registerModals.create({username:req.body.signup.name,phoneno:req.body.signup.phoneno,district:req.body.signup.district,email:req.body.signup.email,address:req.body.signup.address,pincode:req.body.signup.pincode,password:hashedpassword,state:req.body.signup.state}).then((data)=>{
                res.status(200).send({message:"New user has registered"})
            }).catch((err)=>{
                res.status(404).send({message:"Try with different email id"})
            })
        })
       })
    }
})
//login using email and password
app.post("/login",(req,res)=>{
 
    registerModals.find({email:req.body.login.email}).then((userdata)=>{
        //console.log(userdata[0].password)
        if(userdata.length)
        {
             bcrypt.compare(req.body.login.password,userdata[0].password).then((val)=>{
               // console.log(process.env.key)
               if(val)
               {
                const authToken = jwt.sign(userdata[0].email,process.env.key);
                res.status(200).send({authToken});
               }
               else
               {
                res.status(400).send({message:"invalid password"})
               }
             })
        }else
        {
            res.status(401).send({message:"invalid username"})
        }
    })
})
app.get("/homie",(req,res)=>{
   // console.log(req.headers.authorization)
   //does jwt verify get username or email
   const email = jwt.verify(req.headers.authorization, process.env.key)
    registerModals.find({email:email}).then((userdata)=>{
    //console.log(userdata[0].password)
    //console.log(userdata)
    res.send({data :userdata})

   })
})
app.get("/get", async (req, res) => {
    let email = req.headers.email
    try {
        await orderSchema.find({ userId: email }).then((orderlist) => {
            res.status(200).send(orderlist)
        })
    } catch (err) {
        res.status(403).send("hello")
    }
})
app.put("/:id", async (req, res) => {
    await orderSchema.updateOne({ _id: req.params.id }, { status: "order cancelled" }).then((data) => {
        res.status(200).send("updated successfully")
    }).catch((err) => {
        res.status(400).send(err)
    })
})
app.post("/createOrder", (req, res) => {

     const now = new Date();
     const value = {
       day: "numeric",
       month: "long",
       year: "numeric",
     };
     const value1 = {
       hour: "numeric",
       minute: "numeric",
       hour12: false,
     };
     const day = now.toLocaleDateString("en-Us", value);
     const time = now.toLocaleTimeString("en-Us", value1);
     const date = day + " " + time;
     orderSchema
     .create({
       userId: req.body.userId,
       orderId: req.body.orderId,
       dateTime: date,
       storeInfo: req.body.storeInfo,
       status: req.body.status,
       items: req.body.items,
       price: req.body.price,
     })
     .then(() => {
       res.status(200).send("added successfully");
     })
     .catch((err) => {
       res.status(400).send(err);
     })
    })
