import * as actions from "../actions/index";

const initialState = {
    dogs: [],
    dogDetail: {},
    dogFilter: [],
    metadata: {},
}

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case actions.GET_ALL_DOGS:

            return {
                ...state,
                dogs: action.payload.dogs,
                metadata: action.payload.metadata,
                dogDetail: {},
            }

        case actions.SEARCH_ALL_DOGS:
            return {
                ...state,
                dogs: action.payload.dogs,
                metadata: action.payload.metadata,
                dogDetail: {},
            }

        case actions.GET_DOG_DETAIL: return {
            ...state,
            dogs: [],
            dogDetail: action.payload,
        }
        case actions.CREATE_DOG: return {
            dogs: [...state.dogs, action.payload],
            dogDetail: {},
        }
        case actions.DELETE_DOG: return {
            dogs: state.dogs.filter((item) => item.id !== action.payload),
            dogDetail: {},
        }
        case actions.GET_ALL_TEMPERAMENTS: return {
            temperaments: action.payload.temperaments,
        }
        default: return state;
    }
};

export default rootReducer;