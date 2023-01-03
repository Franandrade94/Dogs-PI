import React, { Component } from "react";
import { Link } from "react-router-dom";
import MultiSelect from "multiselect-react-dropdown";
import "./createdog.css";
import { connect } from "react-redux";
import * as actions from "../../Redux/actions/index"

//MultiSelect CSS Styles

const style = {
    multiselectContainer: {
        height: "0px",
        width: "71vw",
        position: "absolute",
        marginTop: "-28%"
    },
    searchBox: {
        border: "solid 1px black",
        overflow: "auto",
    },
    chips: {
        background: "rgb(255, 218, 124)",
        fontSize: "15px",
        color: 'black',
    },
    optionContainer: {
        border: "2px solid black",
        width: "100%",
        height: "10%"
    },
}

class CreateDog extends Component {


    constructor(props) {
        super(props)
        this.state = {
            input: {
                name: "",
                image: "",
                minheight: 0,
                maxheight: 0,
                minweight: 0,
                maxweight: 0,
                minlife_span: 0,
                maxlife_span: 0,
                temperaments: [""],
                newTemperament: ""
            },
        }

        this.enviarDatos = this.enviarDatos.bind(this)
        this.handleInputChange = this.handleInputChange.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.isFieldCompleted = this.isFieldCompleted.bind(this)

    }

    componentDidMount() {
        this.props.getAllTemperaments();

    }


    enviarDatos(e) {
        const { input } = this.state
        let data = {
            //   image: input.image,
            maxheight: input.maxheight,
            minheight: input.minheight,
            maxlife_span: input.maxlife_span,
            minlife_span: input.minlife_span,
            maxweight: input.maxweight,
            minweight: input.minweight,
            name: input.name,
            temperaments: input.temperaments.map((t) => { return { name: t } })
        }

        if (input.newTemperament != "")
            data.temperaments.push({ name: input.newTemperament })


        e.preventDefault();
        //  handleSubmit();
        console.log(data)
        this.props.createDog(data)
        alert("Dog Create Successfully")

    }
    handleInputChange(e) {
        const { input } = this.state
        let newInput = input
        const key = e.target.name
        const value = e.target.value

        newInput[key] = value
        this.setState({
            ...this.state,
            input: newInput

        })
    }
    handleChange(e) {
        console.log(e.target.files);

    }

    isFieldCompleted() {
        const { input } = this.state
        return (input.name === "" &&
            input.minheight === 0 &&
            input.maxheight === 0 &&
            input.minweight === 0 &&
            input.maxweight) ? true : false
    }


    render() {

        const { temperaments } = this.props
        return (
            <div className="CreateDog">
                <div className="BoneBack">
                    <Link className="CloseDetail" to={"./../home"}>X</Link>
                    <form className="FormCard" onSubmit={this.enviarDatos}>

                        <h4 className="h4Create">Create Your Dog</h4>

                        <div className="SelectTemp">
                            <h5>Temperaments (max 7):</h5>
                            <MultiSelect
                                className="MultiSelect"
                                isObject={false}
                                onRemove={(e) => {
                                    console.log(e)
                                }}
                                onSelect={(e) => {
                                    this.handleInputChange({ target: { name: 'temperaments', value: e } })
                                }}
                                options={(temperaments == undefined) ? [] : temperaments}
                                style={style}
                                name="temperaments"
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
                                        value={this.state.input.image}
                                        className="ImageInput"
                                        type="text"
                                        name="image"
                                        onChange={this.handleChange}
                                    />
                                </label>
                            </div>

                            <label className="NameLabel">
                                Name (4-16):   <p className="AsteriscoName">*</p><input
                                    className='name'
                                    type="text"
                                    name="name"
                                    onChange={this.handleInputChange}
                                    required={true}
                                    minLength="4"
                                    maxLength="16"
                                />
                            </label>

                            <label className="MinHeightLabel">
                                Min Height (1-50): <p className="AsteriscoMinHeight">*</p><input
                                    className="MinHeight"
                                    type="number"
                                    name="minheight"
                                    onChange={this.handleInputChange}
                                    required={true}
                                    min="1"
                                    max="50"
                                />
                            </label>

                            <label className="MaxHeightLabel">
                                Max Height (10-80): <p className="AsteriscoMaxHeight">*</p><input
                                    className="MaxHeight"
                                    type="number"
                                    name="maxheight"
                                    onChange={this.handleInputChange}
                                    required={true}
                                    min="10"
                                    max="80"
                                />
                            </label>

                            <label className="MinWeightLabel">
                                Min Weight (1-30): <p className="AsteriscoMinWeight">*</p><input
                                    className="MinWeight"
                                    type="number"
                                    name="minweight"
                                    onChange={this.handleInputChange}
                                    required={true}
                                    min="1"
                                    max="30"
                                />
                            </label>

                            <label className="MaxWeightLabel">
                                Max Weight (5-100): <p className="AsteriscoMaxWeight">*</p><input
                                    className="MaxWeight"
                                    type="number"
                                    name="maxweight"
                                    onChange={this.handleInputChange}
                                    required={true}
                                    min="5"
                                    max="100"
                                />
                            </label>

                            <label className="MinLifeSpanLabel">
                                Min Life Span (1-12): <input
                                    className="MinLifeSpan"
                                    type="number"
                                    name="minlife_span"
                                    onChange={this.handleInputChange}
                                    min="1"
                                    max="12"
                                />
                            </label>

                            <label className="MaxLifeSpanLabel">
                                Max Life Span (8-20): <input
                                    className="MaxLifeSpan"
                                    type="number"
                                    name="maxlife_span"
                                    onChange={this.handleInputChange}
                                    min="8"
                                    max="20"
                                />
                            </label>

                            <label className="CreateTemp">
                                Create Temperament: <input
                                    className="newTemperament"
                                    type="text"
                                    name="newTemperament"
                                    onChange={this.handleInputChange}
                                    minLength="3"
                                    maxLength="16"
                                />
                            </label>

                        </div>

                        <button disabled={this.isFieldCompleted()} className="button-create" type="submit">
                            Create Dog
                        </button>

                    </form>
                </div>
            </div>)
    }
}

export const mapStateToProps = (state) => {
    return {
        temperaments: state.temperaments
    }
};

export const mapDispatchToProps = (dispatch) => {
    return {
        getAllTemperaments: () => dispatch(actions.getAllTemperaments()),
        createDog: (dog) => dispatch(actions.createDog(dog))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateDog);