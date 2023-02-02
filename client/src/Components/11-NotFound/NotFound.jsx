import "./notfound.css";
import React from "react";
import NotFoundImg from "../../Videos/Notfound2.gif"

export default function NotFound() {

    return(
        <div className="Not-Found">
            <h1>Oooops! Dog Not Found</h1>
            <img src={NotFoundImg} alt=""/>
        </div>
    )
}