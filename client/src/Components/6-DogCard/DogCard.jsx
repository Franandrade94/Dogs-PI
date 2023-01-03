import "./dogcard.css";
import React from "react";
import { Link } from "react-router-dom";
import buttonHuella from "../../Images/DetailsButtonHuella.png";

const DogCard = (props) => {

    return (
        <div className="card middle">

            <div className="front">
                
                    <img className="imgDog" src={props.image} alt={props.name} />
                    <div className="namemargin">
                        <h4 className="namecard">{props.name}</h4>
                    </div>
            </div>

            <div className="back">
                <div className="back-content">

                    <p className="temperament-Font">Temperament: <p className="temperament"> {props.temperament}</p></p> 

                    <p className="weightBack">Weight: <p className="weightP">{props.weight}</p></p>
                    <Link className="buttonPosition" to={`/dogs/${props.id}`}>
                        <button className="buttondetails">
                            <img className="ButtonImgMore" src={buttonHuella} alt=""/>
                            <p className="More">+</p>
                        </button>
                    </Link>
                </div>
            </div>
        </div>        
    )
}

export default DogCard;