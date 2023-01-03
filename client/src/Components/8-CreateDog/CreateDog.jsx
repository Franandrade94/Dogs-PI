import "./createdog.css";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import * as actions from "../../Redux/actions/index";
import { Link } from "react-router-dom";
import bonecard from "../../Images/BackBone6.png";
import MultiSelect from "multiselect-react-dropdown";

const CreateDog = () => {

    

    const [input, setInput] = useState({
        name:"",
        image:"",
        minheight: 0,
        maxheight: 0,
        minweight: 0,
        maxweight: 0,
        minlife_span: 0,
        maxlife_span: 0,
        temperament:[""]
    })

    const [ error, setError ] = useState({
        name: "",
        minheight: "",
        maxheight:"",
        minweight:"",
        maxweight:"",
    })


    const [ temperamentArray, setTemperamentArray ] = useState([])

    const handleInputChange = (e) => {
        setInput({
            ...input,
            [e.target.name] : e.target.value,
            
        })
    }

    const dispatch = useDispatch();

    const handleSubmit = () => {
        setInput({
            ...input,
            ["temperament"] : temperamentArray,
        })
        let req =input
        req.temperament = temperamentArray
        dispatch(actions.createDog(req))

        console.log(req)
    }

    const enviarDatos = (e) => {
        e.preventDefault();
        handleSubmit();
        alert("Dog Create Successfully")
    }

    const [file, setFile] = useState([]);

    const handleChange = (e) => {
        console.log(e.target.files);
        setFile(URL.createObjectURL(e.target.files[0]));

        setInput({
            ...input,
            [e.target.name] : e.target.value,
        })
    }

    const handleCheckChange = (e) => {
        const value = e.target.value;
        const checked = e.target.checked;
        console.log(value, checked);
        if(checked)
        {
            setTemperamentArray([
                ...temperamentArray, value
            ])
        } else
        {
            setTemperamentArray(temperamentArray.filter( (e) => (e!== value) ))
        }   
    }
    //MultiSelect CSS Styles
    
    const style = {
        multiselectContainer: {
            height: "0px",
            width: "71vw",
            position: "absolute",
            "margin-top": "-28%",
        },
        searchBox:{
            border: "solid 1px black",
            overflow: "auto",
        },
        chips: {
            background: "rgb(255, 218, 124)",
            "font-size": "15px",
            color:'black',
        },
        optionContainer: {
            border: "2px solid black",
            width: "100%",
            height: "10%"
        },
    }

    const [temps, setTemps] = useState(["Stubborn"," Curious"," Playful"," Adventurous"," Active"," Fun-loving","Aloof"," Clownish"," Dignified"," Independent"," Happy","Wild"," Hardworking"," Dutiful","Outgoing"," Friendly"," Alert"," Confident"," Intelligent"," Courageous","Loyal"," Brave","Docile"," Responsive"," Composed"," Receptive"," Faithful","Loving"," Protective"," Trainable"," Responsible","Friendly"," Energetic"," Loyal"," Gentle"," Affectionate"," Devoted"," Assertive"," Dominant","Strong Willed"," Stubborn"," Obedient"," Reserved","Kind"," Sweet-Tempered"," Loving","Tenacious"," Attentive","Steady"," Bold"," Proud","Reliable"," Fearless"," Lively"," Self-assured","Cautious"," Eager","Good-natured","Spirited"," Companionable"," Even Tempered"," Rugged"," Fierce"," Refined","Obedient"," Joyful","Affectionate"," Agile","Amiable"," Excitable"," Determined","Self-confidence"," Hardy","Fearless"," Calm"," Spirited"," Good-tempered","Watchful"," Hard-working","Energetic","Feisty"," Cheerful"," Sensitive","Easygoing"," Adaptable"," Trusting"," Lovable"," Territorial"," Keen","Protective"," Familial"," Rational","Devoted"," Bright","Agile"," Quick","Trainable"," Reliable"," Powerful","Hardy"," Gay"," Stable"," Quiet"," Inquisitive","Alert"," Strong"," Sociable"," Patient","Suspicious"," Great-hearted"," Merry"," Vocal"," Tolerant"," Mischievous"," People-Oriented"," Bossy"," Cunning"," Watchful"," Cautious","Playful"," Easygoing"," Athletic","Boisterous"," Cooperative"," Kind","Intelligent"," Trustworthy","Self-important","Respectful","Sweet-Tempered"," Thoughtful"," Generous","Mischievous"," Cat-like"," Sturdy","Benevolent","Clownish"," Outgoing","Keen","Clever"," Docile","Sociable"," Bubbly","Opinionated"," Good-natured"," Aggressive"," Suspicious","Bold","Extroverted"," Clever"," Charming","Lively"," Unflappable","Charming"," Spunky"," Diligent"," Tenacious"," Aloof","Willful"," Amiable"," Fast"," Vigilant","Cheerful"]);





    return(
        <div className="CreateDog">
            <div className="BoneBack">
            <Link className="CloseDetail" to={"./../home"}>X</Link>
            <form className="FormCard" onSubmit={enviarDatos}>

            <h4 className="h4Create">Create Your Dog</h4>

                <div className="SelectTemp">
                    <h5>Temperaments (max 7):</h5>
                    <MultiSelect
                        className="MultiSelect"
                        isObject= {false}
                        onRemove={(e) => {
                            console.log(e)
                        }}
                        onSelect={(e) =>{
                            console.log(e)
                        }}
                        options={temps}
                        style = {style}
                        name="temperament"
                        onChange={handleInputChange}
                        placeholder="Select Temperament"
                        closeIcon="cancel"
                        selectionLimit={7}
                    />
                        
                </div>

                <div className="CreateContainer">
                    <div className="file-select">
                        <label id="src-file">
                            Image:  <input
                                placeholder="Paste URL Image"
                                value={input.image}
                                className="ImageInput" 
                                type="text" 
                                name="image" 
                                onChange={handleChange}
                            />
                        </label>
                    </div>

                    <label className="NameLabel">
                        Name (4-16):   <p className="AsteriscoName">*</p><input 
                            className='name'
                            value={input.name}
                            type="text"
                            name="name" 
                            onChange={handleInputChange}
                            required= {true}
                            minLength="4"
                            maxLength="16"
                        />
                    </label> 

                    <label className="MinHeightLabel">
                        Min Height (1-50): <p className="AsteriscoMinHeight">*</p><input 
                            className="MinHeight" 
                            type="number"
                            name="minheight" 
                            onChange={handleInputChange}
                            required= {true}
                            min="1"
                            max="50"
                        />
                    </label>

                    <label className="MaxHeightLabel">
                        Max Height (10-80): <p className="AsteriscoMaxHeight">*</p><input 
                            className="MaxHeight" 
                            type="number"
                            name="maxheight" 
                            onChange={handleInputChange}
                            required= {true}
                            min="10"
                            max="80"
                        />
                    </label>

                    <label className="MinWeightLabel">
                        Min Weight (1-30): <p className="AsteriscoMinWeight">*</p><input 
                            className="MinWeight" 
                            type="number"
                            name="minweight" 
                            onChange={handleInputChange}
                            required= {true}
                            min="1"
                            max="30"
                        />
                    </label>

                    <label className="MaxWeightLabel">
                        Max Weight (5-100): <p className="AsteriscoMaxWeight">*</p><input 
                            className="MaxWeight" 
                            type="number"
                            name="maxweight" 
                            onChange={handleInputChange}
                            required= {true} 
                            min="5"
                            max="100"
                        />
                    </label>

                    <label className="MinLifeSpanLabel">
                        Min Life Span (1-12): <input 
                            className="MinLifeSpan" 
                            type="number"
                            name="minlife_span" 
                            onChange={handleInputChange}
                            min="1"
                            max="12"
                        />
                    </label>

                    <label className="MaxLifeSpanLabel">
                        Max Life Span (8-20): <input 
                            className="MaxLifeSpan" 
                            type="number"
                            name="maxlife_span" 
                            onChange={handleInputChange}
                            min="8"
                            max="20"
                        />
                    </label>

                    <label className="CreateTemp">
                        Create Temperament: <input 
                            className="newTemperament" 
                            type="text"
                            name="temperament" 
                            onChange={handleInputChange}
                            minLength="3"
                            maxLength="16"
                        />
                    </label>
                    
                </div>
                
                <button disabled={(input.name === "" && input.minheight === 0 && input.maxheight === 0 && input.minweight === 0 && input.maxweight) ? true : false } className="button-create"  type="submit">
                    Create Dog
                </button>    

            </form>
            </div>
        </div>
    )
}

export default CreateDog;