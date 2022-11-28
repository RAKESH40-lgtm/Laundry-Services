import axios from "axios"
import { useEffect } from "react";
import Head from "./head"
import Body from "./body"
import Footer from "./footer";
import {useNavigate} from "react-router-dom"

const Homie = ()=>
{
    const navi = useNavigate();
    const token = localStorage.getItem("authToken");
   
    useEffect(()=> {
        axios({
            method: "GET",
            url: "http://localhost:8000/homie",
            headers: {
                'Authorization': `${token}`
              }
        }).then((data)=> {
           localStorage.setItem("email",data.data.data[0].email)
           localStorage.setItem("name",data.data.data[0].username)
        }).catch((err)=> {
            console.log(err)
        })
    }, [])
         
    if(token)
    {
    return (
        <>
            <Head></Head>
            <Body></Body>
            <Footer></Footer>
        </>
    )
 } else {
     console.log("Authorization missing")
      navi("/login")
     }

   
}

export default Homie;




