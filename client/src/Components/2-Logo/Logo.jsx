import "./logo.css";
import logo from "../../Images/Logo.png"
import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class Logo extends Component {

    OnClick = () => {
        window.location.reload();
       }

    render() {
        return(
            <div className="Logo-div">
                <div className="linklogo">
                    <Link to={`/home`} onClick={this.OnClick}><img className="Logo" src={logo} alt="countries-logo" /></Link>
                </div>
            </div>
        )
    }
};