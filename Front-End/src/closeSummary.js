import React from "react";
import "./closeSummary.css"
import axios from "axios";

const CloseModal = (props) => {

    if (!props.Show) return null
    function func(props) {
        let cl = props.onClose

        const confirmBox = window.confirm("Are you sure want to proceed ?")
        if (confirmBox === true) {
            window.location.reload()

            return (cl, handleOrderCancel(props))
        }
        return
    }
    const handleOrderCancel = (props) => {
       // console.log(props.onClose)
        axios({
            url: `http://localhost:3003/${props.data}`,
            method: "PUT",
            data: { data: props.data }
        }
        ).then((data) => {
            console.log(data)
        }).catch((err) => {
            console.log(err)
        })

    }
    return (
        <div className="modal-cl">
            <div className="modal-content-cl">
                <div className="modal-header-cl">
                    <div className="modal-title-cl">
                        <span>Summary - Cancelorder</span>
                        <button onClick={props.onClose}>X</button>
                    </div>
                    <div className="modal-nav-cl">
                        <p className="p1">
                            <b>Store Location:</b>
                            <b>Store Address:</b>
                            <b>Phone no.:</b>
                        </p>
                        <p className="p2">
                            <span>Jp Nagar</span>
                            <span>Near Phone booth, 10th road</span>
                            <span>9566559885</span>
                        </p>
                    </div>
                </div>
                <div className="modal-body-cl">
                    <span> {props.children}</span>
                </div>
                <div className="modal-footer-cl">
                    <button className="close-btn" onClick={() => { func(props) }}>Cancel Order</button>
                </div>
            </div>
        </div>
    )
}

export default CloseModal;