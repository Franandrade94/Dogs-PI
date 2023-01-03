import "./dogdetails.css";
import React, { Component } from "react";
import * as actions from "../../Redux/actions/index";
import { connect } from 'react-redux';
import { Link } from "react-router-dom";
import ReactCardFlip from "react-card-flip";
import frontarrow from "../../Images/arrow1.png";
import backarrow from "../../Images/arrow3.png";
import bonefront from "../../Images/BackBone6.png";
import boneback from "../../Images/BackBone6.png";


class DogDetails extends Component {



    componentDidMount() {
        const id = this.props.match.params.id
        this.props.getDogDetail(id)
    }

    constructor() {
        super();
        this.state = {
            isFlipped: false
        };
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(e) {
        e.preventDefault();
        this.setState(prevState => ({ isFlipped: !prevState.isFlipped }));
    }

    render() {
        console.debug(this.props.dogDetail)

        let dog = this.props.dogDetail;

        return (
            <div className="DogDetail">
                <div className="cardDetail">
                    <ReactCardFlip isFlipped={this.state.isFlipped} flipDirection="horizontal">

                        <div className="frontDetail">

                            <img className="frontbackgroundImg" src={bonefront} />

                            <div className="">
                                <img className="detailImg" src={(dog.reference_image_id == undefined) ? dog.image?.url : `https://cdn2.thedogapi.com/images/${dog.reference_image_id}.jpg`} alt="" />
                                <br />
                                <div className="DetailContent">
                                    <h2 className="DetailName"> {dog.name}</h2>
                                    <p className="FrontWeightDetails">Weight: {dog.weight?.metric}</p>
                                    <p className="FrontHeightDetails">Height: {dog.height?.metric}</p>
                                </div>

                                <button className="frontbutton" onClick={this.handleClick}><img className="frontarrow" src={frontarrow} alt="" /></button>
                            </div>
                        </div>

                        <div className="backDetail">

                            <img className="frontbackgroundImg" src={boneback} />

                            <div>
                                <div className="Buttonclose">
                                    <Link to={`/home`}><button className="close">X</button></Link>
                                </div>

                                <div className="infobackdetail">
                                    <p className="temperamentDetails">Temperament: {dog.temperament}</p>

                                    <p className="LifeDetails">Life Span: {dog.life_span}</p>
                                </div>

                                <button className="backbutton" onClick={this.handleClick}><img className="backarrow" src={backarrow} alt="" /></button>
                            </div>
                        </div>
                    </ReactCardFlip>
                </div>
            </div>
        )
    }
}

export const mapStateToProps = (state) => {
    return {
        dogDetail: state.dogDetail
    }
}

export const mapDispatchToProps = (dispatch) => {
    return {
        getDogDetail: (id) => dispatch(actions.getDogDetail(id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DogDetails);