import "./loading.css";
import React from "react";
import LoadingGif from "../../Videos/Loading.gif"

export default function Loading() {

    return(
        <div className="Load">
            <img src={LoadingGif} alt=""/>
        </div>
    )
}