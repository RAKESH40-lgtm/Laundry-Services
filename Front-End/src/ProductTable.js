import React from "react";
import "./createOrder.css";
const ProductItem = (props) => {

  //by setting pricedetails with the help of usestate we are changing

  const [itemPriceDetail, setItemPriceDetail] = React.useState({
    itemPrice: 0,
    PerItemPrice: 0,
  });

  
  const onQuantityChange = (e) => {
    const { value } = e.target;
    props.setOrderDetails((prevDetail) => {
      return {
        ...prevDetail,
        [props.info.name]: { ...prevDetail[props.info.name], quantity: value },
      };
    });
  };

  const onImageClick = (e) => {
    let index = Number(e.target.attributes.index.value);
    props.setOrderDetails((prevDetail) => {
      let newWashType = [...prevDetail[props.info.name].washType];
      newWashType[index] = !newWashType[index];
      return {
        ...prevDetail,
        [props.info.name]: {
          ...prevDetail[props.info.name],
          washType: newWashType,
        },
      };
    });
  
  };

  const washPrice = {
    Shirt: [10, 10, 10, 10],
    "T-Shirts": [10, 10, 10, 10],
    Trousers: [10, 10, 10, 10],
    Jeans: [10, 10, 10, 10],
    Boxers: [10, 10, 10, 10],
    Joggers: [10, 10, 10, 10],
    Others: [10, 10, 10, 10],
  };

  const CalculatorPrice = () => {
    let pricePerItem = 0,
      itemPriceTotal = 0;
    props.orderDetails[props.info.name].washType.map((val, i) => {
      pricePerItem += Number(val) * washPrice[props.info.name][i];
    });
    itemPriceTotal =
      pricePerItem * Number(props.orderDetails[props.info.name].quantity);
  

    return [pricePerItem, itemPriceTotal];
  };
  React.useEffect(() => {
  
    let [PerItemPrice, itemPrice] = CalculatorPrice();
    setItemPriceDetail({
      itemPrice: itemPrice,
      PerItemPrice: PerItemPrice,
    });
    props.setOrderDetails((prevDetail) => ({
      ...prevDetail,
      [props.info.name]: { ...prevDetail[props.info.name], price: itemPrice },
    }));
  }, [
    ...props.orderDetails[props.info.name].washType,
    props.orderDetails[props.info.name].quantity,
  ]);

  function onClickReset() {
    setItemPriceDetail({
      itemPrice: 0,
      PerItemPrice: 0,
    });
    props.setOrderDetails((prevDetail) => ({
      ...prevDetail,
      [props.info.name]: {
        quantity: "",
        washType: [0, 0, 0, 0],
        price: 0,
      },
    }));
  }
  return (
    <>
      {/* details about producttype */}

      <div id="productRow">
        <div className="productType">
          <img className="prodImg" src={`${props.info.image}`} alt="" />
          <div className="para">
            <p>
              <b>{props.info.name}</b>
            </p>
            <p
              style={{
                fontSize: "11px",
                color: "#76788B",
                "margin-top": "-5px",
              }}
            >
              Lorem Ispum is simple
            </p>
          </div>
        </div>

        {/* //to take input of quantity */}
        <div className="prodQuant">
          <div className="quantnum">
            <input
              className="quantVal"
              type="text"
              name="quantity"
              value={props.orderDetails[props.info.name].quantity}
              style={{ border: "none" }}
              onChange={onQuantityChange}
            ></input>
          </div>
        </div>
        {/* //this prop gives us images of washtype */}
        <div className="washTypes">
          <img
            alt=""
            className="washImg"
            index="0"
            src={`${
              props.orderDetails[props.info.name].washType[0]
                ? "blue-washing.svg"
                : "washing-machine.png"
            }`}
            onClick={onImageClick}
          />
          <img
            alt=""
            className="washImg"
            index="1"
            src={`${
              props.orderDetails[props.info.name].washType[1]
                ? "blue-ironing.svg"
                : "iron.png"
            }`}
            onClick={onImageClick}
          />
          <img
            alt=""
            className="washImg"
            index="2"
            src={`${
              props.orderDetails[props.info.name].washType[2]
                ? "towel-blue.png"
                : "dry-wash.png"
            }`}
            onClick={onImageClick}
          />
          <img
            alt=""
            className="washImg"
            index="3"
            src={`${
              props.orderDetails[props.info.name].washType[3]
                ? "blue-bleach.svg"
                : "bleach.png"
            }`}
            onClick={onImageClick}
          />
        </div>
        {/* //to calculate prize */}
        
          <div id="price">
            {itemPriceDetail.itemPrice ? (
              <div id="prodPrice">
                <div className="itemForEach">
                  {props.orderDetails[props.info.name].quantity +
                    "X" +
                    itemPriceDetail.PerItemPrice}{" "}
                  =
                </div>
                <div className="priceVal">{itemPriceDetail.itemPrice}</div>
              </div>
            ) : (
              "__"
            )}
          </div>
        

        {/* //reset button */}
        {itemPriceDetail.itemPrice ? (
          <button
            className="resetVal"
            onClick={() => {
              onClickReset();
            }}
          >
            Reset
          </button>
        ) : (
          ""
        )}
      </div>
    </>
  );
};
export default ProductItem;