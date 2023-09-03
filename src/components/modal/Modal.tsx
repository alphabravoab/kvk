import React from "react";
import "./modal.css";
type RenderProps = {
    children: React.ReactElement;
    open: boolean;
    requestClose: () => void;
}
function Modal({children, open, requestClose}: RenderProps) {
    return (
        <div className={open ? "backdrop" : "hide"}>
        <dialog open={open}>
            {children}
            <button className="close-button" onClick={requestClose}>x</button>
        </dialog>
        </div>
    )
}

export default Modal;