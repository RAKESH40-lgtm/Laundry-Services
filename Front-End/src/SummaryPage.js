import React, { useState } from "react";
import axios from "axios";
import styles from "./SummaryPage.module.css";
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
      <div id={styles.summaryBox}>
        <div id={styles.pop}>
          <div className={styles.sumHead}>
            <p className={styles.sumPara}>
              <b>Summary</b>
            </p>

            <button onClick={() => props.closeSumPg(false)} className={styles.closeX}>
              <b>X</b>
            </button>
          </div>
          <div className={styles.storeLoc}>
            <div className={styles.location}>
              <p>
                <b>Store Location</b>
              </p>
              <select name="address" onChange={onChange} id="address">
                <option
                  value="none"
                  selected
                  disabled
                  hidden
                  className={styles.disabled}
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
            <div className={styles.storeLoc}>
              <p className={styles.storeDetails}>
                <b>Store Address</b>
              </p>
              <p className={styles.storeDetails}>
                {orderFinalDetail.storeInfo !== ""
                  ? JSON.parse(orderFinalDetail.storeInfo).address
                  : "__"}
              </p>
            </div>
            <div className={styles.phone}>
              <p className={styles.storeDetails}>
                <b>PhoneNo.</b>
              </p>
              <p className={styles.storeDetails}>
                {orderFinalDetail.storeInfo !== ""
                  ? JSON.parse(orderFinalDetail.storeInfo).phone
                  : "__"}
              </p>
            </div>
          </div>
          <div className={styles.prodOrder}>
            <div className={styles.ordPara}>
              <p>
                <b>Order Detail</b>
              </p>
            </div>
            <div id={styles.prodOrderInfo}>
              {props.orderDetails.map((item) => (
                <Totalorder
                  info={item}
                  key={item.name}
                  orderDetails={props.orderDetails}
                />
              ))}
            </div>
            <div id={styles.prodPriceTot}>
              <div className={styles.total}>
                Sub total: <div className={styles.val}>{subTotal}</div>
              </div>
              <div className={styles.pickUp}>
                pickUp Charges: <div className={styles.pickUpVal}>{pickUpCharge}</div>
              </div>
              <div id={styles.allTotalAmt}>
                <div className={styles.allAmnt}>Total:</div>
                <div className={styles.allTotalVal}>{total}</div>
              </div>
            </div>
          </div>
          <div className={styles.userAddress}>
            <p id={styles.useAddress}>
              <b>Address</b>
            </p>
            <div className={styles.addresscontain}>
              <div className={styles.homeadd}>
                <p className={styles.ho}>
                  <b>Home</b>
                </p>
                  <img src="tick.jpg" alt=""></img>
              <p className={styles.addU}>
                #223, 10th road, Jp Nagar,<br></br>Bangalore
              </p>
                </div>
              <div className={styles.other}>
                <p className={styles.ot}>
                  <b>other</b>
                </p>
                <p className={styles.add}>
                #223, 10th road, Jp Nagar,<br></br>Bangalore
                </p>
              </div>
            </div>
          </div>
          <div className={styles.buttons}>
            <button className={styles.confirmButton} onClick={(e) => onConfirm(e)}>
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
      <div id={styles.prodCart}>
        <div className={styles.prodType}>{props.info.name}</div>
        <div className={styles.washType}>
          {props.orderDetails[0].washType.map((a, i) => {
            return <i key={i}>{a ? `${washType[i]}, ` : ""}</i>;
          })}
        </div>
        <div className={styles.prodPrice}>
          <div className={styles.prodPriceType}>
            {props.info.quantity +
              "X" +
              Number(props.info.price) / Number(props.info.quantity) +
              "="}
          </div>
          <div className={styles.prodTotalVal}>{props.info.price}</div>
        </div>
      </div>
    </>
  );
};
export default ProdSummary;