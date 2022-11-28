import React from "react";
import "./summary.css"

const Modal = (props) => {
    if (!props.show) return null
    return (
        <div className="modal">
            <div className="modal-content">
                <div className="modal-header">
                    <div className="modal-title">
                        <span>Summary</span>
                        <button onClick={props.onClose}>X</button>
                    </div>
                    <div className="modal-nav">
                        <p className="p1">
                            <b>Store Location:</b>
                            <b>Store Address:</b>
                            <b>Phone no.</b>
                        </p>
                        <p className="p2">
                            <span>Jp Nagar</span>
                            <span>Near Phone booth, 10th road</span>
                            <span>9566559885</span>
                        </p>
                    </div>
                </div>
                <div className="modal-body">
                    {props.children}
                </div>
                <div className="modal-footer">
                    <span>Thank you for your patience!!!</span>
                </div>
            </div>
        </div>
    )
}

export default Modal;