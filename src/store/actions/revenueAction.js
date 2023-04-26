import  revenueService  from "../../services/revenueService";
import { actionCreator } from "template-redux-helpers";
import  { redirectNoLogin }  from "../../helpers/redirect-no-login";
import  { LOADING_REVENUE, 
          GET_REVENUE, 
          ERROR_REVENUE, 
          CREATE_REVENUE,
          CREATE_REVENUE_CLOSURE, 
          CREATE_REVENUE_OTHER,
          UPDATE_REVENUE,
          UPDATE_REVENUE_CLOSURE,
          UPDATE_REVENUE_OTHER,
          DELETE_REVENUE,
          GET_ALL_REVENUE,
          GET_SEARCH_REVENUE,
          UPDATE_CODE_ERROR_REVENUES,
          GET_SEARCH_REVENUE_STADISTIC,
          GET_SEARCH_REVENUE_OTHER,
          GET_SEARCH_REVENUE_CLOSURE } from "../types/revenue";

const RevenueService = new revenueService();

export const getRevenue = (dispatch, extens, _id) => {
    return dispat => {
        dispatch(actionCreator(LOADING_REVENUE, "payload")(true))
        RevenueService.getRevenueId(extens, _id).then(data => {
            dispatch(actionCreator(GET_REVENUE, "payload")(data))
            dispatch(actionCreator(LOADING_REVENUE, "payload")(false))
        })
        .catch(error => {
            if (error.response.data[0] === 'SESSION_NO_VALIDA') {redirectNoLogin();}
            dispatch(actionCreator(ERROR_REVENUE, "payload")(error))
            dispatch(actionCreator(LOADING_REVENUE, "payload")(false))
        })
    }
}

export const getSearchRevenues = (dispatch, extens, limit, page, startDate = '', endDate = '', type = '') => {
    return dispat => {
        
        dispatch(actionCreator(LOADING_REVENUE, "payload")(true))
        
        RevenueService.getRevenue(extens, limit, page, startDate, endDate, type).then(data => {
            console.log('getSearchRevenues data',data)
            dispatch(actionCreator(GET_SEARCH_REVENUE, "payload")(data))
            dispatch(actionCreator(LOADING_REVENUE, "payload")(false))
        })
        .catch(error => {
            console.log('llego por aca getSearchRevenues', error.response)
            if (error?.response?.data[0] === 'SESSION_NO_VALIDA') {redirectNoLogin();}
            dispatch(actionCreator(ERROR_REVENUE, "payload")(error))
            dispatch(actionCreator(LOADING_REVENUE, "payload")(false))
        })
    }
}

export const getSearchRevenuesOther = (dispatch, extens, limit, page, startDate = '', endDate = '', type = '') => {
    return dispat => {
        
        dispatch(actionCreator(LOADING_REVENUE, "payload")(true))
        
        RevenueService.getRevenue(extens, limit, page, startDate, endDate, type).then(data => {
            console.log('getSearchRevenues data',data)
            dispatch(actionCreator(GET_SEARCH_REVENUE_OTHER, "payload")(data))
            dispatch(actionCreator(LOADING_REVENUE, "payload")(false))
        })
        .catch(error => {
            console.log('llego por aca getSearchRevenues', error.response)
            if (error?.response?.data[0] === 'SESSION_NO_VALIDA') {redirectNoLogin();}
            dispatch(actionCreator(ERROR_REVENUE, "payload")(error))
            dispatch(actionCreator(LOADING_REVENUE, "payload")(false))
        })
    }
}

export const getSearchRevenuesStadistics = (dispatch, extens, limit, page, startDate = '', endDate = '', type = '') => {
    return dispat => {
        
        dispatch(actionCreator(LOADING_REVENUE, "payload")(true))
        
        RevenueService.getRevenue(extens, limit, page, startDate, endDate, type).then(data => {
            console.log('getSearchRevenues data',data)
            dispatch(actionCreator(GET_SEARCH_REVENUE_STADISTIC, "payload")(data))
            dispatch(actionCreator(LOADING_REVENUE, "payload")(false))
        })
        .catch(error => {
            console.log('llego por aca getSearchRevenues', error.response)
            if (error?.response?.data[0] === 'SESSION_NO_VALIDA') {redirectNoLogin();}
            dispatch(actionCreator(ERROR_REVENUE, "payload")(error))
            dispatch(actionCreator(LOADING_REVENUE, "payload")(false))
        })
    }
}

export const getSearchRevenuesClosure = (dispatch, extens, limit, page, startDate = '', endDate = '', type = '') => {
    return dispat => {
        
        dispatch(actionCreator(LOADING_REVENUE, "payload")(true))
        
        RevenueService.getRevenue(extens, limit, page, startDate, endDate, type).then(data => {
            console.log('getSearchRevenues data',data)
            dispatch(actionCreator(GET_SEARCH_REVENUE_CLOSURE, "payload")(data))
            dispatch(actionCreator(LOADING_REVENUE, "payload")(false))
        })
        .catch(error => {
            console.log('llego por aca getSearchRevenues', error.response)
            if (error?.response?.data[0] === 'SESSION_NO_VALIDA') {redirectNoLogin();}
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
            if (error?.response?.data[0]=== 'SESSION_NO_VALIDA') {redirectNoLogin();}
            dispatch(actionCreator(ERROR_REVENUE, "payload")(error))
            dispatch(actionCreator(LOADING_REVENUE, "payload")(false))
        })
    }
}

export const createRevenues = (dispatch, extens, payload) => {
    return dispat => {
        dispatch(actionCreator(LOADING_REVENUE, "payload")(true))
        RevenueService.createRevenue(extens, payload).then(data => {
            // console.log('datos acccion', data.error)
            if (data.error === "ERROR_POST_POSTREVENUEWORKINGDAY") {
                dispatch(actionCreator(ERROR_REVENUE, "payload")(data));
            } else if (data?.codeHttp === '400') {
                dispatch(actionCreator(ERROR_REVENUE, "payload")(data));
            } else if (data?.status === '400') {
                dispatch(actionCreator(ERROR_REVENUE, "payload")(data));
            }  else {
                dispatch(actionCreator(CREATE_REVENUE, "payload")(data));
            }
            dispatch(actionCreator(LOADING_REVENUE, "payload")(false));
        })
        .catch(error => {
            console.log('datos revenue catch', error)
            // Swal.fire({
            //     position: 'top',
            //     icon: icon,
            //     title: title,
            //     text: text,
            //     showConfirmButton: false,
            //     timer: timer
            // })
            if (error?.response?.data[0] === 'SESSION_NO_VALIDA') {redirectNoLogin();}
            dispatch(actionCreator(ERROR_REVENUE, "payload")(error));
            dispatch(actionCreator(LOADING_REVENUE, "payload")(false));
        })
    }
}

export const createRevenueClosure = (dispatch, extens, payload) => {
    return dispat => {
        dispatch(actionCreator(LOADING_REVENUE, "payload")(true))
        RevenueService.createRevenue(extens, payload).then(data => {
            // console.log('datos acccion', data.error)
            if (data.error === "ERROR_POST_POSTREVENUEWORKINGDAY") {
                dispatch(actionCreator(ERROR_REVENUE, "payload")(data));
            } else if (data?.codeHttp === '400') {
                dispatch(actionCreator(ERROR_REVENUE, "payload")(data));
            } else if (data?.status === '400') {
                dispatch(actionCreator(ERROR_REVENUE, "payload")(data));
            }  else {
                dispatch(actionCreator(CREATE_REVENUE_CLOSURE, "payload")(data));
            }
            dispatch(actionCreator(LOADING_REVENUE, "payload")(false));
        })
        .catch(error => {
            console.log('datos revenue catch', error)
            // Swal.fire({
            //     position: 'top',
            //     icon: icon,
            //     title: title,
            //     text: text,
            //     showConfirmButton: false,
            //     timer: timer
            // })
            if (error?.response?.data[0] === 'SESSION_NO_VALIDA') {redirectNoLogin();}
            dispatch(actionCreator(ERROR_REVENUE, "payload")(error));
            dispatch(actionCreator(LOADING_REVENUE, "payload")(false));
        })
    }
}

export const createRevenueOther = (dispatch, extens, payload) => {
    return dispat => {
        dispatch(actionCreator(LOADING_REVENUE, "payload")(true))
        RevenueService.createRevenue(extens, payload).then(data => {
            // console.log('datos acccion', data.error)
            if (data.error === "ERROR_POST_POSTREVENUEWORKINGDAY") {
                dispatch(actionCreator(ERROR_REVENUE, "payload")(data));
            } else if (data?.codeHttp === '400') {
                dispatch(actionCreator(ERROR_REVENUE, "payload")(data));
            } else if (data?.status === '400') {
                dispatch(actionCreator(ERROR_REVENUE, "payload")(data));
            }  else {
                dispatch(actionCreator(CREATE_REVENUE_OTHER, "payload")(data));
            }
            dispatch(actionCreator(LOADING_REVENUE, "payload")(false));
        })
        .catch(error => {
            console.log('datos revenue catch', error)
            // Swal.fire({
            //     position: 'top',
            //     icon: icon,
            //     title: title,
            //     text: text,
            //     showConfirmButton: false,
            //     timer: timer
            // })
            if (error?.response?.data[0] === 'SESSION_NO_VALIDA') {redirectNoLogin();}
            dispatch(actionCreator(ERROR_REVENUE, "payload")(error));
            dispatch(actionCreator(LOADING_REVENUE, "payload")(false));
        })
    }
}

export const updateRevenues = (dispatch, extens, payload, id) => {
    // console.log('llego la data', payload)
    return dispat => {
        // console.log('lelgo por aca updateRevenues antes de la peticios')
        dispatch(actionCreator(LOADING_REVENUE, "payload")(true))
        RevenueService.updateRevenue(extens, payload, id).then(data => {
            // dispatch(actionCreator(UPDATE_REVENUE, "payload")(data))
            // dispatch(actionCreator(LOADING_REVENUE, "payload")(false))
            // console.log('lelgo por aca updateRevenues', data)
            if (data?.codeHttp === '400') {
                dispatch(actionCreator(ERROR_REVENUE, "payload")(data));
            } else if (data?.status === '400') {
                dispatch(actionCreator(ERROR_REVENUE, "payload")(data));
            }  else {
                dispatch(actionCreator(UPDATE_REVENUE, "payload")(data));
            }
            dispatch(actionCreator(LOADING_REVENUE, "payload")(false));
        })
        .catch(error => {
            console.log('error', error)
            if (error?.response?.data[0] === 'SESSION_NO_VALIDA') {redirectNoLogin();}
            dispatch(actionCreator(ERROR_REVENUE, "payload")(error))
            dispatch(actionCreator(LOADING_REVENUE, "payload")(false))
        })
    }
}

export const updateRevenueOther = (dispatch, extens, payload, id) => {
    // console.log('llego la data', payload)
    return dispat => {
        // console.log('lelgo por aca updateRevenues antes de la peticios')
        dispatch(actionCreator(LOADING_REVENUE, "payload")(true))
        RevenueService.updateRevenue(extens, payload, id).then(data => {
            // dispatch(actionCreator(UPDATE_REVENUE, "payload")(data))
            // dispatch(actionCreator(LOADING_REVENUE, "payload")(false))
            // console.log('lelgo por aca updateRevenues', data)
            if (data?.codeHttp === '400') {
                dispatch(actionCreator(ERROR_REVENUE, "payload")(data));
            } else if (data?.status === '400') {
                dispatch(actionCreator(ERROR_REVENUE, "payload")(data));
            }  else {
                dispatch(actionCreator(UPDATE_REVENUE_OTHER, "payload")(data));
            }
            dispatch(actionCreator(LOADING_REVENUE, "payload")(false));
        })
        .catch(error => {
            console.log('error', error)
            if (error?.response?.data[0] === 'SESSION_NO_VALIDA') {redirectNoLogin();}
            dispatch(actionCreator(ERROR_REVENUE, "payload")(error))
            dispatch(actionCreator(LOADING_REVENUE, "payload")(false))
        })
    }
}

export const updateRevenueClosure = (dispatch, extens, payload, id) => {
    // console.log('llego la data', payload)
    return dispat => {
        // console.log('lelgo por aca updateRevenues antes de la peticios')
        dispatch(actionCreator(LOADING_REVENUE, "payload")(true))
        RevenueService.updateRevenue(extens, payload, id).then(data => {
            // dispatch(actionCreator(UPDATE_REVENUE, "payload")(data))
            // dispatch(actionCreator(LOADING_REVENUE, "payload")(false))
            // console.log('lelgo por aca updateRevenues', data)
            if (data?.codeHttp === '400') {
                dispatch(actionCreator(ERROR_REVENUE, "payload")(data));
            } else if (data?.status === '400') {
                dispatch(actionCreator(ERROR_REVENUE, "payload")(data));
            }  else {
                dispatch(actionCreator(UPDATE_REVENUE_CLOSURE, "payload")(data));
            }
            dispatch(actionCreator(LOADING_REVENUE, "payload")(false));
        })
        .catch(error => {
            console.log('error', error)
            if (error?.response?.data[0] === 'SESSION_NO_VALIDA') {redirectNoLogin();}
            dispatch(actionCreator(ERROR_REVENUE, "payload")(error))
            dispatch(actionCreator(LOADING_REVENUE, "payload")(false))
        })
    }
}

export const updateCodeError = (dispatch) => {
    return dispat => {
        // console.log('updateCodeError UPDATE_CODE_ERROR_REVENUE')
        dispatch(actionCreator(UPDATE_CODE_ERROR_REVENUES, "payload")(''));
    }
}

export const updateCodeErrorRevenue = (dispatch) => {
    console.log('updateCodeError UPDATE_CODE_ERROR_REVENUE')
    dispatch(actionCreator(UPDATE_CODE_ERROR_REVENUES, "payload")(''));
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
            if (error?.response?.data[0] === 'SESSION_NO_VALIDA') {redirectNoLogin();}
            dispatch(actionCreator(ERROR_REVENUE, "payload")(error))
            dispatch(actionCreator(LOADING_REVENUE, "payload")(false))
        })
    }
}


