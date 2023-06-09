import  orderService  from "../../services/orderService";
import { actionCreator } from "template-redux-helpers";
import Swal from 'sweetalert2';
import  { redirectNoLogin }  from "../../helpers/redirect-no-login";
import  { LOADING_ORDER, 
          GET_ORDER, 
          ERROR_ORDER, 
          CREATE_ORDER, 
          UPDATE_ORDER,
          DELETE_ORDER,
          GET_ALL_ORDER,
          UPDATE_CODE_ERROR_ORDER,
          GET_SEARCH_ORDER_PAITOUT,
          UPDATE_ORDER_CLOSURE,
          GET_ORDER_PAITOUT } from "../types/order";

const OrderService = new orderService();

export const getOrder = (dispatch, extens, _id) => {
    return dispat => {
        dispatch(actionCreator(LOADING_ORDER, "payload")(true))
        OrderService.getOrderId(extens, _id).then(data => {
            dispatch(actionCreator(GET_ORDER, "payload")(data))
            dispatch(actionCreator(LOADING_ORDER, "payload")(false))
        })
        .catch(error => {
            if (error?.code === 'ERR_BAD_REQUEST' || error?.response?.data[0] === 'SESSION_NO_VALIDA') {redirectNoLogin();}
            dispatch(actionCreator(ERROR_ORDER, "payload")(error))
            dispatch(actionCreator(LOADING_ORDER, "payload")(false))
        })
    }
}

export const getOrderPaitOut = (dispatch, extens, _id) => {
    return dispat => {
        dispatch(actionCreator(LOADING_ORDER, "payload")(true))
        OrderService.getOrderId(extens, _id).then(data => {
            dispatch(actionCreator(GET_ORDER_PAITOUT, "payload")(data))
            dispatch(actionCreator(LOADING_ORDER, "payload")(false))
        })
        .catch(error => {
            if (error?.code === 'ERR_BAD_REQUEST' || error?.response?.data[0] === 'SESSION_NO_VALIDA') {redirectNoLogin();}
            dispatch(actionCreator(ERROR_ORDER, "payload")(error))
            dispatch(actionCreator(LOADING_ORDER, "payload")(false))
        })
    }
}

export const getSearchOrder = (dispatch, extens, data) => {
    return dispat => {
        dispatch(actionCreator(LOADING_ORDER, "payload")(true))
        OrderService.getSearchOrder(extens, data).then(data => {
            // console.log('OperationBillService', data)
            dispatch(actionCreator(GET_ALL_ORDER, "payload")(data))
            dispatch(actionCreator(LOADING_ORDER, "payload")(false))
        })
        .catch(error => {
            // console.log('getSearchOrder error', error)
            if (error?.code === 'ERR_BAD_REQUEST' || error?.response?.data[0] === 'SESSION_NO_VALIDA') {redirectNoLogin();}
            dispatch(actionCreator(ERROR_ORDER, "payload")(error))
            dispatch(actionCreator(LOADING_ORDER, "payload")(false))
        })
    }
}

export const getSearchOrderPaitOut = (dispatch, extend, limit, page, status, startDate = '', endDate = '') => {
    return dispat => {
        dispatch(actionCreator(LOADING_ORDER, "payload")(true))
        // console.log('startDate', startDate)
        // console.log('endDate', endDate)
        OrderService.getSearchOrderPaitOut(extend, limit, page, status, startDate, endDate).then(data => {
            // console.log('OperationBillService', data)
            dispatch(actionCreator(GET_SEARCH_ORDER_PAITOUT, "payload")(data))
            dispatch(actionCreator(LOADING_ORDER, "payload")(false))
        })
        .catch(error => {
            console.log('error.response.data', error)
            if (error?.code === 'ERR_BAD_REQUEST' || error?.response?.data[0] === 'SESSION_NO_VALIDA') {redirectNoLogin();}
            dispatch(actionCreator(ERROR_ORDER, "payload")(error))
            dispatch(actionCreator(LOADING_ORDER, "payload")(false))
        })
    }
}


export const getOrders = (dispatch, extens) => {
    return dispat => {
        dispatch(actionCreator(LOADING_ORDER, "payload")(true))
        OrderService.getOperationBills(extens).then(data => {
            dispatch(actionCreator(GET_ALL_ORDER, "payload")(data))
            dispatch(actionCreator(LOADING_ORDER, "payload")(false))
            Swal.fire({
                position: 'top',
                icon: 'success',
                text: 'Proceso realizado con exito',
                showConfirmButton: false,
                timer: 3500
            })
        })
        .catch(error => {
            if (error?.code === 'ERR_BAD_REQUEST' || error?.response?.data[0] === 'SESSION_NO_VALIDA') {redirectNoLogin();}
            dispatch(actionCreator(ERROR_ORDER, "payload")(error))
            dispatch(actionCreator(LOADING_ORDER, "payload")(false))
            Swal.fire({
                position: 'top',
                icon: 'error',
                text: 'Error al procesar la orden',
                showConfirmButton: false,
                timer: 3500
            })
        })
    }
}

export const createOrder= (dispatch, extens, payload) => {
    return dispat => {
        dispatch(actionCreator(LOADING_ORDER, "payload")(true))
        OrderService.createOrder(extens, payload).then(data => {
            if (data?.status  === 200) {
                console.log('ingreso no tiene errorssss 200', data)
                dispatch(actionCreator(CREATE_ORDER, "payload")(data));
                
            } if (data?.status  === 400 && data?.statusText === "Bad Request") {
                console.log('ingreso tiene error 400', data)
                dispatch(actionCreator(ERROR_ORDER, "payload")(data));
                redirectNoLogin();
            } else {
                console.log('ingreso al else tiene error', data)
                dispatch(actionCreator(ERROR_ORDER, "payload")(data))
            }
            dispatch(actionCreator(LOADING_ORDER, "payload")(false))
            
        })
        .catch(error => {
            console.log('datos errorssssssss', error)
            if (error?.code === 'ERR_BAD_REQUEST' || error?.response?.data[0] === 'SESSION_NO_VALIDA') {redirectNoLogin();}
            dispatch(actionCreator(ERROR_ORDER, "payload")(error))
            dispatch(actionCreator(LOADING_ORDER, "payload")(false))
        })
    }
}

export const updateCodeError = (dispatch) => {
    return dispat => {
        dispatch(actionCreator(UPDATE_CODE_ERROR_ORDER, "payload")(''));
    }
}

export const updateOrder = (dispatch, extens, payload, id) => {
    return dispat => {
        dispatch(actionCreator(LOADING_ORDER, "payload")(true))
        OrderService.updateOrder(extens, payload, id).then(async data => {
            let result = await data.json();
            if (data?.status  === 200) {
                dispatch(actionCreator(UPDATE_ORDER, "payload")(result));
                
            } if (data?.status  === 400 && data?.statusText === "Bad Request") {
                dispatch(actionCreator(ERROR_ORDER, "payload")(result));
                redirectNoLogin();
            } if (data?.status  === 500) {
                dispatch(actionCreator(ERROR_ORDER, "payload")(result))
            }
            dispatch(actionCreator(LOADING_ORDER, "payload")(false))
        })
        .catch(error => {
            console.log('datos', error )
            if (error?.code === 'ERR_BAD_REQUEST' || error?.response?.data[0] === 'SESSION_NO_VALIDA') {redirectNoLogin();}
            dispatch(actionCreator(ERROR_ORDER, "payload")(error))
            dispatch(actionCreator(LOADING_ORDER, "payload")(false))
        })
    }
}

export const updateOrderClosure = (dispatch, extens, payload, id) => {
    return dispat => {
        dispatch(actionCreator(LOADING_ORDER, "payload")(true))
        OrderService.updateOrder(extens, payload, id).then(async data => {
            let result = await data.json();
            if (data?.status  === 200) {
                dispatch(actionCreator(UPDATE_ORDER_CLOSURE, "payload")(result));
                
            } if (data?.status  === 400 && data?.statusText === "Bad Request") {
                dispatch(actionCreator(ERROR_ORDER, "payload")(result));
                redirectNoLogin();
            } if (data?.status  === 500) {
                dispatch(actionCreator(ERROR_ORDER, "payload")(result))
            }
            dispatch(actionCreator(LOADING_ORDER, "payload")(false))
        })
        .catch(error => {
            console.log('datos', error )
            if (error?.code === 'ERR_BAD_REQUEST' || error?.response?.data[0] === 'SESSION_NO_VALIDA') {redirectNoLogin();}
            dispatch(actionCreator(ERROR_ORDER, "payload")(error))
            dispatch(actionCreator(LOADING_ORDER, "payload")(false))
        })
    }
}

export const deleteOrder = (dispatch, extens, id) => {
    return dispat => {
        dispatch(actionCreator(LOADING_ORDER, "payload")(true))
        OrderService.deleteOrder(extens, id).then(data => {
            data._id = id;
            dispatch(actionCreator(DELETE_ORDER, "payload")(data));
            dispatch(actionCreator(LOADING_ORDER, "payload")(false))
        })
        .catch(error => {
            if (error?.code === 'ERR_BAD_REQUEST' || error?.response?.data[0] === 'SESSION_NO_VALIDA') {redirectNoLogin();}
            dispatch(actionCreator(ERROR_ORDER, "payload")(error))
            dispatch(actionCreator(LOADING_ORDER, "payload")(false))
        })
    }
}


