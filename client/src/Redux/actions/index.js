import axios from "axios";

export const GET_ALL_DOGS = "GET_ALL_DOGS";
export const SEARCH_ALL_DOGS = "SEARCH_ALL_DOGS";
export const GET_DOG_DETAIL = "GET_DOG_DETAIL";
export const CREATE_DOG = "CREATE_DOG";
export const DELETE_DOG = "DELETE_DOG";
export const GET_ALL_TEMPERAMENTS = "GET_ALL_TEMPERAMENTS";

const MY_API_KEY = "live_wving1yDkC3YlOzVElwQcw56xtc1kWkEqfAS3bs70xKsjTkzWuO7cznfzqIYQ8M1";
const MY_API = "http://localhost:3001"

export const getAllDogs = (offset, filter) => {
    return (dispatch) => {
        return axios.get(`${MY_API}/dogs?offset=${offset}&filter=${filter}`)
            .then(res => dispatch({
                type: GET_ALL_DOGS,
                payload: { dogs: res.data.dogs, metadata: res.data.metadata }
            }))
    }
};

export const searchAllDogs = (v) => {
    console.debug(v)
    return (dispatch) => {
        return axios.get(`${MY_API}/dogs?name=${v}`)
            .then(res => dispatch({
                type: SEARCH_ALL_DOGS,
                payload: { dogs: res.data }
            }))
    }
};

export const getDogDetail = (id) => {
    return (dispatch) => {
        return axios.get(`${MY_API}/dogs/${id}`)
            .then(res => dispatch({
                type: GET_DOG_DETAIL,
                payload: res.data
            }))
    }
};


export const createDog = (dog) => {
    console.log(JSON.stringify(dog))
    return (dispatch) => {
        return axios.post(`${MY_API}/dogs`, dog)

            .then(res => dispatch({ type: CREATE_DOG, payload: res.data }))
    }
}

export const deleteDog = (payload) => {
    return {
        type: DELETE_DOG,
        payload,
    }
};

export const getAllTemperaments = () => {
    return (dispatch) => {
        return axios.get(`${MY_API}/temperaments`)
            .then(res => dispatch({
                type: GET_ALL_TEMPERAMENTS,
                payload: res.data
            }))
    }
};

export const getAllTemperamentsUnsafe = () => {
    return axios.get(`${MY_API}/temperaments`)
        .then(res => res.data)

};
