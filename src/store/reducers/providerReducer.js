import { reducerCreator } from "template-redux-helpers";
import {LOADING_PROVIDER, GET_PROVIDER, ERROR_PROVIDER} from "../types/provider";

const initialState = {
    isLoading: false,
    providers: [],
    status_code: null,
    error: null
}

const providerReducer = {
    [LOADING_PROVIDER]: (state, action)  => {
        return {
            ...state,
            isLoading: action.payload
        }
    },
    [GET_PROVIDER]: (state, action)  => {
        return {
            ...state,
            status_code: action.payload.status,
            provider: action.payload.data
        }
    },
    [ERROR_PROVIDER]: (state, action)  => {
        return {
            ...state,
            status_code: action.payload.status,
            error: action.payload.message
        }
    }, 
}

export default reducerCreator(initialState, providerReducer)