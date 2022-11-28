import React from "react";
// import axios from "axios";
// import { useState, useEffect } from "react";
import './head.css'
import { useNavigate } from "react-router-dom";
const Head = () => {
    const username = localStorage.getItem("name")
    const navi = useNavigate();
    const logout = ()=>
    {
        localStorage.setItem("email","")
        localStorage.setItem("name","")
        navi("/")
    }
    // const [names, setName] = useState([])
    // useEffect(() => {
    //     axios.get("").then((userdata) => {
    //         setName(userdata.data)
    //     }).catch((err) => {
    //         console.log(err)
    //     })
    // }, [])
    // const Email = localStorage.getItem("authToken")
    // axios.post(Email)
    return (
        <header className="heading">

            <ul >
                <li id="laundry">LAUNDRY</li>
                
                <li ><a className="dropdown" id="username" onClick={logout}>{username}</a></li>
                
                <li ><a href="#home" id="home">Home</a></li>
                <li ><a href="#pricing" id="pricing">Pricing</a></li>
            </ul>
        </header>
    )
}
export default Head;