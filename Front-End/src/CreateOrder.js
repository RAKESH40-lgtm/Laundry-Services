import React, { useState } from "react";
import styles from "./createOrder.module.css";
import Head from "./head";
import Footer from "./footer";
import ProductItem from "./ProductTable";
import ProdSummary from "./SummaryPage";
const ProductOrder = () => {
  const [summaryPop, setsummaryPop] = useState(false);

  const productList = [
    {
      name: "Shirt",
      image: "shirts.jpg",
    },
    {
      name: "T-Shirts",
      image: "tshirts.jpg",
    },
    {
      name: "Trousers",
      image: "trousers.jpg",
    },
    {
      name: "Jeans",
      image: "jeans.jpg",
    },
    {
      name: "Boxers",
      image: "boxers.jpg",
    },
    {
      name: "Joggers",
      image: "joggers.jpg",
    },
    {
      name: "Others",
      image: "others.jpg",
    },
  ];
  const initialVal = {};
  for (let i = 0; i < productList.length; i++) {
    let name = productList[i].name;
    initialVal[name] = {
      quantity: "",
      washType: [false, false, false, false],
      price: 0,
    };
  }
  const [orderDetails, setOrderDetails] = React.useState(initialVal);
  const [modifyOrderDetail, setModifyOrderDetail] = React.useState([]);
  const onProceed = () => {
    if (modifyOrderDetail.length !== 0) {
      setsummaryPop((prevState) => ({ ...prevState, summaryPop: true }));
    } else {
      alert("Please Select some items");
    }
  };
  React.useEffect(() => {
    //console.log(orderDetails)
    //console.log(modifyOrderDetail);
    setModifyOrderDetail([]);
    Object.keys(orderDetails).forEach((key) => {
      // console.log(modifyOrderDetail);
      let obj = {};
      if (orderDetails[key].price !== 0) {
        obj.name = key;
        obj.price = orderDetails[key].price;
        obj.quantity = orderDetails[key].quantity;
        obj.washType = orderDetails[key].washType;
        setModifyOrderDetail((prevDetail) => [...prevDetail, obj]);
        //console.log(modifyOrderDetail);
      }
    });
  }, [orderDetails]);

  return (
    <>
      <Head />
      <body id="inner_body">
        <div className="column1">
          <ul className="navbar">
            <li> <img src="home-run.svg" alt="" /></li>
            <li> <img src="more.svg" alt="" /></li>
            <li> <img id="list" src="list.svg" alt="" /></li>
          </ul>
        </div>
        <h3>Create Order:</h3>
        <div id={styles.prodHead}>
          <div id={styles.headItem}>
            <div id={styles.item1}>Product Type</div>
            <div id={styles.item2}>Quantity</div>
            <div id={styles.item3}>Wash Type</div>
            <div id={styles.item4}>Price</div>
          </div>
          {productList.map((item) => (
            <ProductItem
              info={item}
              key={item.name}
              setOrderDetails={setOrderDetails}
              orderDetails={orderDetails}
              setModifyOrderDetail={setModifyOrderDetail}
              modifyOrderDetail={modifyOrderDetail}
            />
          ))}

          <div className={styles.buttons}>
            <button className={styles.funcbutton}>Cancel</button>
            <button className={styles.funcbutton} onClick={() => onProceed()}>
              Proceed
            </button>
          </div>
        </div>
          <Footer />
      </body>

      {summaryPop && (
        <ProdSummary
          closeSumPg={setsummaryPop}
          orderDetails={modifyOrderDetail}
        />
      )}

    </>
  );
};

export default ProductOrder;