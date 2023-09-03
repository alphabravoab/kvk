import React from "react";
import logo from "../svg/logo.svg"
import "./header.css";

function Header() {
    return (
        <header>
            <div className="logo-container"><img src={logo} alt="logo" className="logo" /></div>
            <div className="title">Kompany</div>
        </header>
    )
}

export default Header;