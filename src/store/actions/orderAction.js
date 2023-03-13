import  orderService  from "../../services/orderService";
import { actionCreator } from "template-redux-helpers";
import  { LOADING_ORDER, 
          GET_ORDER, 
          ERROR_ORDER, 
          CREATE_ORDER, 
          UPDATE_ORDER,
          DELETE_ORDER,
          GET_ALL_ORDER,
          GET_SEARCH_ORDER,
          GET_SEARCH_ORDER_PAITOUT } from "../types/order";

const OrderService = new orderService();

export const getOrder = (dispatch, extens, _id) => {
    return dispat => {
        dispatch(actionCreator(LOADING_ORDER, "payload")(true))
        OrderService.getOrderId(extens, _id).then(data => {
            dispatch(actionCreator(GET_ORDER, "payload")(data))
            dispatch(actionCreator(LOADING_ORDER, "payload")(false))
        })
        .catch(error => {
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
        })
        .catch(error => {
            dispatch(actionCreator(ERROR_ORDER, "payload")(error))
            dispatch(actionCreator(LOADING_ORDER, "payload")(false))
        })
    }
}

export const createOrder= (dispatch, extens, payload) => {
    return dispat => {
        dispatch(actionCreator(LOADING_ORDER, "payload")(true))
        OrderService.createOrder(extens, payload).then(data => {
            dispatch(actionCreator(CREATE_ORDER, "payload")(data))
            dispatch(actionCreator(LOADING_ORDER, "payload")(false))
        })
        .catch(error => {
            dispatch(actionCreator(ERROR_ORDER, "payload")(error))
            dispatch(actionCreator(LOADING_ORDER, "payload")(false))
        })
    }
}

export const updateOrder = (dispatch, extens, payload, id) => {
    return dispat => {
        dispatch(actionCreator(LOADING_ORDER, "payload")(true))
        OrderService.updateOrder(extens, payload, id).then(data => {
            dispatch(actionCreator(UPDATE_ORDER, "payload")(data))
            dispatch(actionCreator(LOADING_ORDER, "payload")(false))
        })
        .catch(error => {
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
            dispatch(actionCreator(ERROR_ORDER, "payload")(error))
            dispatch(actionCreator(LOADING_ORDER, "payload")(false))
        })
    }
}


