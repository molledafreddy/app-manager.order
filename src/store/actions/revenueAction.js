import  revenueService  from "../../services/revenueService";
import { actionCreator } from "template-redux-helpers";
import  { redirectNoLogin }  from "../../helpers/redirect-no-login";
import Swal from 'sweetalert2';
import  { LOADING_REVENUE, 
          GET_REVENUE, 
          ERROR_REVENUE, 
          CREATE_REVENUE, 
          UPDATE_REVENUE,
          DELETE_REVENUE,
          GET_ALL_REVENUE,
          GET_SEARCH_REVENUE } from "../types/revenue";

const RevenueService = new revenueService();

export const getRevenue = (dispatch, extens, _id) => {
    return dispat => {
        dispatch(actionCreator(LOADING_REVENUE, "payload")(true))
        RevenueService.getRevenueId(extens, _id).then(data => {
            dispatch(actionCreator(GET_REVENUE, "payload")(data))
            dispatch(actionCreator(LOADING_REVENUE, "payload")(false))
        })
        .catch(error => {
            if (error.response.data === 'SESSION_NO_VALIDA') {redirectNoLogin();}
            dispatch(actionCreator(ERROR_REVENUE, "payload")(error))
            dispatch(actionCreator(LOADING_REVENUE, "payload")(false))
        })
    }
}

export const getSearchRevenues = (dispatch, extens, limit, page, startDate = '', endDate = '', type = '') => {
    return dispat => {
        
        dispatch(actionCreator(LOADING_REVENUE, "payload")(true))
        RevenueService.getRevenue(extens, limit, page, startDate, endDate, type).then(data => {
            dispatch(actionCreator(GET_SEARCH_REVENUE, "payload")(data))
            dispatch(actionCreator(LOADING_REVENUE, "payload")(false))
        })
        .catch(error => {
            if (error.response.data === 'SESSION_NO_VALIDA') {redirectNoLogin();}
            dispatch(actionCreator(ERROR_REVENUE, "payload")(error))
            dispatch(actionCreator(LOADING_REVENUE, "payload")(false))
        })
    }
}



export const getRevenues = (dispatch, extens) => {
    return dispat => {
        dispatch(actionCreator(LOADING_REVENUE, "payload")(true))
        RevenueService.getRevenues(extens).then(data => {
            dispatch(actionCreator(GET_ALL_REVENUE, "payload")(data))
            dispatch(actionCreator(LOADING_REVENUE, "payload")(false))
        })
        .catch(error => {
            if (error.response.data === 'SESSION_NO_VALIDA') {redirectNoLogin();}
            dispatch(actionCreator(ERROR_REVENUE, "payload")(error))
            dispatch(actionCreator(LOADING_REVENUE, "payload")(false))
        })
    }
}

export const createRevenues = (dispatch, extens, payload) => {
    return dispat => {
        dispatch(actionCreator(LOADING_REVENUE, "payload")(true))
        RevenueService.createRevenue(extens, payload).then(data => {
            if (data?.codeHttp === '400') {
                dispatch(actionCreator(ERROR_REVENUE, "payload")(data));
            } else {
                dispatch(actionCreator(CREATE_REVENUE, "payload")(data));
            }
            dispatch(actionCreator(LOADING_REVENUE, "payload")(false));
        })
        .catch(error => {
            // console.log('datos revenue', error)
            // Swal.fire({
            //     position: 'top',
            //     icon: icon,
            //     title: title,
            //     text: text,
            //     showConfirmButton: false,
            //     timer: timer
            // })
            if (error.response.data === 'SESSION_NO_VALIDA') {redirectNoLogin();}
            dispatch(actionCreator(ERROR_REVENUE, "payload")(error));
            dispatch(actionCreator(LOADING_REVENUE, "payload")(false));
        })
    }
}

export const updateRevenues = (dispatch, extens, payload, id) => {
    // console.log('llego la data', payload)
    return dispat => {
        dispatch(actionCreator(LOADING_REVENUE, "payload")(true))
        RevenueService.updateRevenue(extens, payload, id).then(data => {
            dispatch(actionCreator(UPDATE_REVENUE, "payload")(data))
            dispatch(actionCreator(LOADING_REVENUE, "payload")(false))
        })
        .catch(error => {
            if (error.response.data === 'SESSION_NO_VALIDA') {redirectNoLogin();}
            dispatch(actionCreator(ERROR_REVENUE, "payload")(error))
            dispatch(actionCreator(LOADING_REVENUE, "payload")(false))
        })
    }
}

export const deleteRevenues = (dispatch, extens, id) => {
    return dispat => {
        dispatch(actionCreator(LOADING_REVENUE, "payload")(true))
        RevenueService.deleteRevenue(extens, id).then(data => {
            data._id = id;
            dispatch(actionCreator(DELETE_REVENUE, "payload")(data));
            dispatch(actionCreator(LOADING_REVENUE, "payload")(false))
        })
        .catch(error => {
            if (error.response.data === 'SESSION_NO_VALIDA') {redirectNoLogin();}
            dispatch(actionCreator(ERROR_REVENUE, "payload")(error))
            dispatch(actionCreator(LOADING_REVENUE, "payload")(false))
        })
    }
}


