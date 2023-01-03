import "./landingpage.css";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import bone from "../../Images/bonebutton2.png"


export default class LandingPage extends Component {
    
    render() {

        return(
            <div className="Landing">
                     
                <Link to="/home">
                    <img  alt="" className="bone" src={bone}/>
                </Link>
                
            </div>
        )
    }
}