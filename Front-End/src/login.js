import "./login.css"
import axios from "axios";
import { useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {useForm} from "react-hook-form"
import {  useNavigate } from "react-router-dom";
const schema = yup.object().shape(
    {
        email:yup.string().email().required(),
        password:yup.string().min(4).max(17).required()
    }
)
const Login = ()=>{
  const navi = useNavigate();
    const [error,setErrorValue] = useState()
    const [loginerr,setLoginError] = useState()
    const {register,handleSubmit,formState:{errors}} = useForm({
        resolver : yupResolver(schema)
    })
   const sendServer = (data)=>
   {
     axios({
        url:"http://localhost:8000/login",
        method:"POST",
        data:{login:data}
     }).then((res)=>{
          //auth token store it in a local storage and naviagte to home page 
          //console.log(res.data.authToken)
          localStorage.setItem("authToken",res.data.authToken)
          window.location = "homie"
     }).catch((err)=>{
      //  console.log(err.response.status)
         if(err.response.status === 400)
         {
            //console.log(err.response.data.message)
           // console.log("hi")
           setErrorValue(err.response.data.message)
         }
         else if(err.response.status === 401)
         {
           setLoginError(err.response.data.message)
         }
     })
   }
   const navigate = ()=>{
         navi("/register")
   }
 return(<>
       
       <div id="header">
        <text id="Laundry">Laundry</text>
        <text id="home">Home</text>
        <text id="pricing">Pricing</text>
        <text id="career">Careers</text>
        <text id="signin">SignIn</text>
       </div>
        <div id="lef">
        <text id="account">Don't Have An Account?</text>
       </div>
       <div id="btn">
       <button id="but" onClick={navigate}>Register</button>
       </div>
       <div id="divide">
       <div id="laun">
        <text id="left">Laundry Sevices</text>
       </div>
       <div id="text">
        <text id="door">Doorstep Wash & DryClean Service</text>
        </div>
       <text id="login">SIGN IN</text>
       <div id="form">
       <form onSubmit={handleSubmit(sendServer)} >
      <input type="email" placeholder="abc@gmail.com" {...register('email')} id="email"></input>
       <p>{errors.email?.message}</p>
       <p>{loginerr}</p>
       <br></br>
       <input type="password" name="password" {...register("password")} placeholder="passcode" id="password"></input>
       <img src="lockie.jpg" width="10px" height="15px" id="lock" alt="lock"></img>
       <p>{errors.password?.message}</p>
       <p>{error}</p>
       <br></br>
       <input type="submit"></input>
       </form>
       </div>
       </div>
       <hr></hr>
       <text id="refer">Now Refer & Earn ₹500 for every referral*</text>
       <div>
       <text id="terms">* Terms and conditions will be applied</text>
       </div>
   
 </>)   
} 
export default Login;
/*
register
 <div id="footer">
        <text id="about">About us</text>
        <text id="hom">Home</text>
        <text id="prices">Pricing</text>
        <text id="careers">Careers</text>
        <text id="contact">Contact</text>
        <text id="social">Social Media</text>
       </div>
       <div id="foot">
        
       </div>
    
    */   