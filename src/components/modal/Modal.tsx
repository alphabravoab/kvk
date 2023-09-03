import React, { useRef} from "react";
import "./modal.css";
type RenderProps = {
    children: React.ReactElement;
    open: boolean;
    requestClose: () => void;
    errorModal?: boolean;
}
function Modal({children, open, requestClose, errorModal}: RenderProps) {
    return (
        <div className={open ? "backdrop" : "hide"} onClick={requestClose}>
        <dialog open={open} className={errorModal ? "error": ""}>
            {children}
            <button className="close-button" onClick={requestClose}>x</button>
        </dialog>
        </div>
    )
}

export default Modal;