import  operationBillService  from "../../services/operationBillService";
import { actionCreator } from "template-redux-helpers";
import  { redirectNoLogin }  from "../../helpers/redirect-no-login";
import  { LOADING_OPERATIONBILL, 
          GET_OPERATIONBILL, 
          ERROR_OPERATIONBILL, 
          CREATE_OPERATIONBILL, 
          UPDATE_OPERATIONBILL,
          DELETE_OPERATIONBILL,
          GET_ALL_OPERATIONBILL,
          GET_SEARCH_OPERATIONBILL } from "../types/operationBill";

const OperationBillService = new operationBillService();

export const getOperationBill = (dispatch, extens, _id) => {
    return dispat => {
        dispatch(actionCreator(LOADING_OPERATIONBILL, "payload")(true))
        OperationBillService.getOperationBillId(extens, _id).then(data => {
            dispatch(actionCreator(GET_OPERATIONBILL, "payload")(data))
            dispatch(actionCreator(LOADING_OPERATIONBILL, "payload")(false))
        })
        .catch(error => {
            if (error.response.data === 'SESSION_NO_VALIDA') {redirectNoLogin();}
            dispatch(actionCreator(ERROR_OPERATIONBILL, "payload")(error))
            dispatch(actionCreator(LOADING_OPERATIONBILL, "payload")(false))
        })
    }
}

export const getSearchOperationBills = (dispatch, extens, limit, page, search, data) => {
    return dispat => {
        dispatch(actionCreator(LOADING_OPERATIONBILL, "payload")(true))
        OperationBillService.getOperationBill(extens, limit, page, search, data.startDate || '', data.endDate || '').then(data => {
            // console.log('OperationBillService', data)
            dispatch(actionCreator(GET_ALL_OPERATIONBILL, "payload")(data))
            dispatch(actionCreator(LOADING_OPERATIONBILL, "payload")(false))
        })
        .catch(error => {
            if (error.response.data === 'SESSION_NO_VALIDA') {redirectNoLogin();}
            dispatch(actionCreator(ERROR_OPERATIONBILL, "payload")(error))
            dispatch(actionCreator(LOADING_OPERATIONBILL, "payload")(false))
        })
    }
}



export const getOperationBills = (dispatch, extens) => {
    return dispat => {
        dispatch(actionCreator(LOADING_OPERATIONBILL, "payload")(true))
        OperationBillService.getOperationBills(extens).then(data => {
            dispatch(actionCreator(GET_ALL_OPERATIONBILL, "payload")(data))
            dispatch(actionCreator(LOADING_OPERATIONBILL, "payload")(false))
        })
        .catch(error => {
            if (error.response.data === 'SESSION_NO_VALIDA') {redirectNoLogin();}
            dispatch(actionCreator(ERROR_OPERATIONBILL, "payload")(error))
            dispatch(actionCreator(LOADING_OPERATIONBILL, "payload")(false))
        })
    }
}

export const createOperationBills = (dispatch, extens, payload) => {
    return dispat => {
        dispatch(actionCreator(LOADING_OPERATIONBILL, "payload")(true))
        OperationBillService.createOperationBill(extens, payload).then(data => {
            dispatch(actionCreator(CREATE_OPERATIONBILL, "payload")(data))
            dispatch(actionCreator(LOADING_OPERATIONBILL, "payload")(false))
        })
        .catch(error => {
            if (error.response.data === 'SESSION_NO_VALIDA') {redirectNoLogin();}
            dispatch(actionCreator(ERROR_OPERATIONBILL, "payload")(error))
            dispatch(actionCreator(LOADING_OPERATIONBILL, "payload")(false))
        })
    }
}

export const updateOperationBills = (dispatch, extens, payload, id) => {
    // console.log('llego la data', payload)
    return dispat => {
        dispatch(actionCreator(LOADING_OPERATIONBILL, "payload")(true))
        OperationBillService.updateOperationBill(extens, payload, id).then(data => {
            dispatch(actionCreator(UPDATE_OPERATIONBILL, "payload")(data))
            dispatch(actionCreator(LOADING_OPERATIONBILL, "payload")(false))
        })
        .catch(error => {
            if (error.response.data === 'SESSION_NO_VALIDA') {redirectNoLogin();}
            dispatch(actionCreator(ERROR_OPERATIONBILL, "payload")(error))
            dispatch(actionCreator(LOADING_OPERATIONBILL, "payload")(false))
        })
    }
}

export const deleteOperationBills = (dispatch, extens, id) => {
    return dispat => {
        dispatch(actionCreator(LOADING_OPERATIONBILL, "payload")(true))
        OperationBillService.deleteOperationBill(extens, id).then(data => {
            data._id = id;
            dispatch(actionCreator(DELETE_OPERATIONBILL, "payload")(data));
            dispatch(actionCreator(LOADING_OPERATIONBILL, "payload")(false))
        })
        .catch(error => {
            if (error.response.data === 'SESSION_NO_VALIDA') {redirectNoLogin();}
            dispatch(actionCreator(ERROR_OPERATIONBILL, "payload")(error))
            dispatch(actionCreator(LOADING_OPERATIONBILL, "payload")(false))
        })
    }
}


