import React from 'react'
import "./Confirm.css"
import {Link} from "react-router-dom"

const ConfirmOrder=({orderDone})=>{
   return(
    <>
    <div id='doneBack'>
    <div id='card'>
      <div className='innerContainer'>
      <img src='tick.jpg' className='tickImg'></img>
        <p className='cardPara' ><b>Your Order Placed <br/> Sucessfully</b></p>
        <p className='cardPara' id="para2">You can track the delivery in the "Order" Section</p>
        <Link to="/homie"><button id="goToOrderButton" onClick={()=> orderDone(false)}>Go to orders</button></Link>
      </div>  
    </div>
    </div>
    </>
   )
}
export default ConfirmOrder