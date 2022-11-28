import React, { useState } from "react";
import axios from "axios";
import "./SummaryPage.css";
import ConfirmOrder from "./Confirm";
const ProdSummary = (props) => {
  const [storedetails, setstoredetails] = useState(false);
  
  const orderId = "CD"+Math.floor(1000 + Math.random() * 1000);

  const [trigger, setTrigger] = useState(false);
  const [orderFinalDetail, setOrderFinaldetail] = useState({
    dateTime: "",
    storeInfo: "",
    userAddress: "",
    status: "",
    items: "",
  });
  if (trigger) {
    return <ConfirmOrder orderDone={setTrigger} />;
  }

  let subTotal = 0,
    pickUpCharge = 90,
    total = 0;
  props.orderDetails.forEach((item) => {
    subTotal += Number(item.price);
  });
  total = subTotal + pickUpCharge;
  const store = [
    {
      name: "Jp Nagar",
      address: "Phone booth,10th Road",
      phone: "+91 9753855624",
    },
    { 
      name: "GandhiBazar",
      address: "Near Khadi",
      phone: "+91 8967456321",
    },
    {
      name: "Jay Nagar",
      address: "Near Metro Station",
      phone: "+91 9534237103",
    },
  ];
  const onChange = (e) => {
    setstoredetails(true);
    setOrderFinaldetail((prevDetail) => ({
      ...prevDetail,
      storeInfo: e.target.value,
    }));
  };

  const onConfirm = (e) => {
    // console.log(orderFinalDetail)

    e.preventDefault();
    //closeSumPg(false)

    // console.log(trigger);
    if(storedetails){
      axios({method:'POST',
      url:"http://localhost:8000/createOrder",
          data:{
              userId: localStorage.getItem("email"),
              orderId: orderId,
              storeInfo:JSON.parse(orderFinalDetail.storeInfo),
              status: "Ready to pickup",
              items: props.orderDetails,
              price: total
          },
      }).then((res) => {
         setTrigger("true");
         console.log(res)
     
        }).catch((err) => {
         console.log(err)
        })
  }
else{
alert("Please select store Location")
}
 
}
  return (
    <>
      <div id="summaryBox">
        <div id="pop">
          <div className="sumHead">
            <p className="sumPara">
              <b>Summary</b>
            </p>

            <button onClick={() => props.closeSumPg(false)} className="closeX">
              <b>X</b>
            </button>
          </div>
          <div className="storeLoc">
            <div className="location">
              <p>
                <b>Store Location</b>
              </p>
              <select name="address" onChange={onChange} id="address">
                <option
                  value="none"
                  selected
                  disabled
                  hidden
                  className="disabled"
                >
                  Store Location
                </option>
                {store.map((store) => (
                  <option value={JSON.stringify(store)} key={store.name}>
                    {store.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="storeLoc">
              <p className="storeDetails">
                <b>Store Address</b>
              </p>
              <p className="storeDetails">
                {orderFinalDetail.storeInfo !== ""
                  ? JSON.parse(orderFinalDetail.storeInfo).address
                  : "__"}
              </p>
            </div>
            <div className="phone">
              <p className="storeDetails">
                <b>PhoneNo.</b>
              </p>
              <p className="storeDetails">
                {orderFinalDetail.storeInfo !== ""
                  ? JSON.parse(orderFinalDetail.storeInfo).phone
                  : "__"}
              </p>
            </div>
          </div>
          <div className="prodOrder">
            <div className="ordPara">
              <p>
                <b>Order Detail</b>
              </p>
            </div>
            <div id="prodOrderInfo">
              {props.orderDetails.map((item) => (
                <Totalorder
                  info={item}
                  key={item.name}
                  orderDetails={props.orderDetails}
                />
              ))}
            </div>
            <div id="prodPriceTot">
              <div className="total">
                Sub total: <div className="val">{subTotal}</div>
              </div>
              <div className="pickUp">
                pickUp Charges: <div className="pickUpVal">{pickUpCharge}</div>
              </div>
              <div id="allTotalAmt">
                <div className="allAmnt">Total:</div>
                <div className="allTotalVal">{total}</div>
              </div>
            </div>
          </div>
          <div className="userAddress">
            <p id="useAddress">
              <b>Address</b>
            </p>
            <div className="addresscontain">
              <div className="homeadd">
                <p className="ho">
                  <b>Home</b>
                </p>
                  <img src="tick.jpg" alt=""></img>
              <p className="addU">
                #223, 10th road, Jp Nagar,<br></br>Bangalore
              </p>
                
              </div>
              <div className="other">
                <p className="ot">
                  <b>other</b>
                </p>
                <p className="add">
                #223, 10th road, Jp Nagar,<br></br>Bangalore
                </p>
              </div>







            </div>
          </div>
          <div className="buttons">
            <button className="confirmButton" onClick={(e) => onConfirm(e)}>
              {" "}
              Confirm{" "}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
const Totalorder = (props) => {
  const washType = ["washing", "ironing", "dry-wash", "bleach"];

  return (
    <>
      <div id="prodCart">
        <div className="prodType">{props.info.name}</div>
        <div className="washType">
          {props.orderDetails[0].washType.map((a, i) => {
            return <i key={i}>{a ? `${washType[i]}, ` : ""}</i>;
          })}
        </div>
        <div className="prodPrice">
          <div className="prodPriceType">
            {props.info.quantity +
              "X" +
              Number(props.info.price) / Number(props.info.quantity) +
              "="}
          </div>
          <div className="prodTotalVal">{props.info.price}</div>
        </div>
      </div>
    </>
  );
};

export default ProdSummary;
