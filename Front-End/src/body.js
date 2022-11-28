import React from "react";
import axios from "axios";
import Modal from "./summary";
import CloseModal from "./closeSummary";
import { useState, useEffect } from "react";
import "./body.css";
import {Link} from "react-router-dom"
const Body = () => {
    const [Orders, SetOrders] = useState([])
    useEffect(() => {
        axios({
            url: "http://localhost:8000/get",
            method: "GET",
            headers: {
                "email": localStorage.getItem("email")
            }
        }).then((orderData) => {
            console.log(orderData)
            SetOrders(orderData.data.reverse())
        }).catch((err) => {
            console.log(err)
        })
    }, [])
    const [show, setshow] = useState(false)
    const [cancelShow, setCancelshow] = useState(false)
    const [data, setData] = useState("")
    return (
        <body id="inner_body">
            <div className="column1">
                <ul className="navbar">
                    <li> <img src="home-run.svg" alt="" /></li>
                    <li> <img src="more.svg" alt="" /></li>
                    <li> <img id="list" src="list.svg" alt="" /></li>
                </ul>
            </div>
            {Orders.length === 0 ? <h4 className="emptyTable">Orders | 0  <Link className="emptyTableA" to="/createOrder">Create</Link></h4> : <div className="column2">
                <h4>Orders | 0  <Link to="/createOrder">Create</Link></h4>
                <table >
                    <thead>
                        <tr>
                            <th>Order Id</th>
                            <th>Date:Time</th>
                            <th>Store Loc.</th>
                            <th>City Name</th>
                            <th>Store Phone</th>
                            <th>Total items</th>
                            <th>Price</th>
                            <th>Status</th>
                            <th>Cancel</th>
                            <th>View</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Orders.map((order, i) => {
                            let totalQuantity = 0;
                            for (i = 0; i < order.items.length; i++) {
                                totalQuantity += Number(order.items[i].quantity)
                            }
                            let pickupCharges = 90;
                            return (
                                <tr key={i}>
                                    <td>{order.orderId} </td>
                                    <td>{order.dateTime}</td>
                                    <td>{order.storeInfo.name}</td>
                                    <td>Bangalore</td>
                                    <td>{order.storeInfo.phone}</td>
                                    <td>{totalQuantity}</td>
                                    <td>{order.price}</td>
                                    <td>{order.status}</td>
                                    <td>{(order.status === "Ready to pickup") ? <button type="button" onClick={() => { setCancelshow(true); setData(order._id) }}>X</button> : "-"}</td>
                                    <td><button type="button" onClick={() => setshow(true)}>View</button></td>
                                    <Modal show={show} onClose={() => { setshow(false) }}>
                                        <div className="div-img">
                                            <img src="proBar.png" alt="" />
                                        </div>
                                        <div className="div-contentBody">
                                            <h3>Order Details</h3>
                                            {order.items.map((item, i) => {
                                                let arr = ["washing", "Ironing", "Drywash", "Bleach"];

                                                var val = []
                                                for (i = 0; i < item.washType.length; i++) {
                                                    val.push(item.washType[i])
                                                }
                                                return (
                                                    <>
                                                        <p className="wholeProduct"><span className="productType">{item.name}</span><span className="productProcesses">{val.map((valIndex, i) => {
                                                            if (valIndex === true) {
                                                                return (
                                                                    <span>{arr[i]},</span>
                                                                )
                                                            }
                                                            return ""
                                                        })}
                                                        </span><span className="productPriceDetails">{item.quantity} X {item.price / item.quantity} =</span><span className="productTotalPrice">{item.price}</span></p>

                                                    </>
                                                )
                                            })}
                                            <p className="subTotalp"><span className="subTotal">Sub Total:</span><span className="subtotalPrice">{order.price - 90}</span></p>
                                            <p className="pickupCharges">pickup Charges: {pickupCharges}</p>
                                            <p className="totalprice"><span>Total Rs: {order.price}</span></p>
                                        </div>
                                        <div className=".div-address">
                                            <h4>Address</h4>
                                            <span className="div-span">#223, 10th road, Jp Nagar, Bangalore</span>
                                        </div>
                                    </Modal>
                                    <CloseModal Show={cancelShow} data={data} onClose={() => { setCancelshow(false) }}>
                                        <div className="div-img">
                                            <img src="proBarClose.png" alt="" />
                                        </div>
                                        <div className="div-contentBody">
                                            <h3>Order Details</h3>
                                            {order.items.map((item, i) => {
                                                let arr = ["washing", "Ironing", "Drywash", "Bleach"];

                                                var val = []
                                                for (i = 0; i < item.washType.length; i++) {
                                                    val.push(item.washType[i])
                                                }
                                                return (
                                                    <>
                                                        <p className="wholeProduct"><span className="productType">{item.name}</span><span className="productProcesses">{val.map((valIndex, i) => {
                                                            if (valIndex === true) {
                                                                return (
                                                                    <span>{arr[i]},</span>
                                                                )
                                                            }
                                                            return ""
                                                        })}
                                                        </span><span className="productPriceDetails">{item.quantity} X {item.price / item.quantity} =</span><span className="productTotalPrice">{item.price}</span></p>

                                                    </>
                                                )
                                            })}
                                            <p className="subTotalp"><span className="subTotal">Sub Total:</span><span className="subtotalPrice">{order.price - 90}</span></p>
                                            <p className="pickupCharges">pickup Charges: {pickupCharges}</p>
                                            <p className="totalprice"><span>Total Rs: {order.price}</span></p>
                                        </div>
                                        <div className=".div-address">
                                            <h4>Address</h4>
                                            <span className="div-span">#223, 10th road, Jp Nagar, Bangalore</span>
                                        </div>
                                    </CloseModal>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>}
        </body>
    )
};

export default Body;

// {
//     userId: null,
//     orderId: 'CD1505',
//     storeInfo: {
//                  name: 'Jp Nagar',
//                  address: 'Phone booth,10th Road',
//                   phone: '+91 9753855624'
//     },
//     status: 'Ready to pickup',
//         items: [
//             { name: 'Shirt', price: 20, quantity: '2', washType: [Array] },
//             { name: 'T-Shirts', price: 40, quantity: '2', washType: [Array] },
//             { name: 'Trousers', price: 40, quantity: '2', washType: [Array] }
//         ],
//             price: 190
// }