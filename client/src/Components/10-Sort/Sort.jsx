import "./sort.css";
import "./multiselect.css"
import React, { Component } from "react";
import MultiSelect from "multiselect-react-dropdown";
import { connect } from "react-redux";
import { getAllTemperamentsUnsafe } from "../../Redux/actions/index"

const style = {
    multiselectContainer: {
        height: "30px",
        width: "40vw",
        marginTop: "0%",
    },
    searchBox: {
        border: "solid 1px black",
    },
    chips: {
        background: "rgb(255, 218, 124)",
        fontSize: "15px",
        color: 'black'
    },
    optionContainer: {
        border: "none",
        boxShadow: "5px 5px 5px black",
        width: "100%",
        height: "10%",
        background: "white"
    },
}

export default class Nav extends Component {

    constructor(props) {
        super(props)
        this.state = { temperaments: [], tempsSelected: [] }
        this.filterAction = this.filterAction.bind(this)
        this.filterActionTemperaments = this.filterActionTemperaments.bind(this)
        this.searchByTemperaments = this.searchByTemperaments.bind(this)
        this.resetFilters = this.resetFilters.bind(this)
    }

    componentDidMount() {
        getAllTemperamentsUnsafe().then(r => {
            this.setState({ ...this.state, temperaments: r.temperaments })
        })
    }

    filterAction(f) {
        window.location.replace(window.location.href.split('?')[0] + `?filter=${f}`)
    }
    filterActionTemperaments(e) {
        this.setState({
            ...this.state, tempsSelected: e
        })
        console.log("ss")
        console.log(this.state)

    }

    searchByTemperaments() {
        let v = `temps=
        ${this.state.tempsSelected.join(',').replace(" ", "")}`
        window.location.replace(window.location.href.split('?')[0] + `?filter=${v}`)
    }

    resetFilters() {
        let url = new URL(window.location.href.split('?')[0]);

        // set search property to blank
        url.search = '';

        var new_url = url.toString();
        window.location.replace(new_url)



    }


    render() {

        const { temperaments } = this.state

        return (

            <div className="nav">

                <MultiSelect
                    className="MultiSelect"
                    isObject={false}
                    onRemove={(e) => {
                        console.log(e)
                    }}
                    onSelect={(e) => {
                        this.filterActionTemperaments(e)
                    }}
                    options={temperaments}
                    style={style}
                    id="css_custom"
                    placeholder="Filter by Temperament"
                    closeIcon="cancel"
                    selectionLimit={7}
                />
                <button onClick={() => this.searchByTemperaments()}>Search by temperaments</button>

                <button onClick={() => this.filterAction('az')}>A-Z</button>

                <button onClick={() => this.filterAction('za')}>Z-A</button>

                <button onClick={() => this.filterAction('uw')}>Mayor Peso</button>

                <button onClick={() => this.filterAction('dw')}>Menor Peso</button>

                <button onClick={() => this.filterAction('ed')}>Existing Dog</button>

                <button onClick={() => this.filterAction('md')}>My Dogs</button>

                <button onClick={() => this.resetFilters()}>Reset All Filters</button>


            </div>
        )

    }
}
