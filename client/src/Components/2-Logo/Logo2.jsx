import "./logo2.css";
import logo from "../../Images/Logo.png"
import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class Logo2 extends Component {
    render() {
        return(
            <div className="Logo-div">
                <Link to={`/home`}><img className="Logo" src={logo} alt="countries-logo" /></Link>
            </div>
        )
    }
};