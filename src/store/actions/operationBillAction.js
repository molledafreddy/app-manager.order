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
          UPDATE_CODE_ERROR_OPERATIONBILL } from "../types/operationBill";

const OperationBillService = new operationBillService();

export const getOperationBill = (dispatch, extens, _id) => {
    return dispat => {
        dispatch(actionCreator(LOADING_OPERATIONBILL, "payload")(true))
        OperationBillService.getOperationBillId(extens, _id).then(data => {
            dispatch(actionCreator(GET_OPERATIONBILL, "payload")(data))
            dispatch(actionCreator(LOADING_OPERATIONBILL, "payload")(false))
        })
        .catch(error => {
            if (error?.response?.data[0] === 'SESSION_NO_VALIDA') {redirectNoLogin();}
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
            if (error?.response?.data[0] === 'SESSION_NO_VALIDA') {redirectNoLogin();}
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
            if (error?.response?.data[0] === 'SESSION_NO_VALIDA') {redirectNoLogin();}
            dispatch(actionCreator(ERROR_OPERATIONBILL, "payload")(error))
            dispatch(actionCreator(LOADING_OPERATIONBILL, "payload")(false))
        })
    }
}

export const createOperationBills = (dispatch, extens, payload) => {
    return dispat => {
        dispatch(actionCreator(LOADING_OPERATIONBILL, "payload")(true))
        OperationBillService.createOperationBill(extens, payload).then(data => {
            if (data?.status  === 200) {
                console.log('ingreso no tiene error 200', data)
                dispatch(actionCreator(CREATE_OPERATIONBILL, "payload")(data));
                
            } if (data?.status  === 400 && data?.statusText === "Bad Request") {
                console.log('ingreso tiene error 400', data)
                dispatch(actionCreator(ERROR_OPERATIONBILL, "payload")(data));
                redirectNoLogin();
            } else {
                console.log('ingreso al else tiene error', data)
                dispatch(actionCreator(ERROR_OPERATIONBILL, "payload")(data))
            }
            dispatch(actionCreator(LOADING_OPERATIONBILL, "payload")(false))
        })
        .catch(error => {
            console.log('datos error', error)
            if (error?.response?.data[0] === 'SESSION_NO_VALIDA') {redirectNoLogin();}
            dispatch(actionCreator(ERROR_OPERATIONBILL, "payload")(error))
            dispatch(actionCreator(LOADING_OPERATIONBILL, "payload")(false))
        })
    }
}

export const updateOperationBills = (dispatch, extens, payload, id) => {
    // console.log('llego la data', payload)
    return dispat => {
        dispatch(actionCreator(LOADING_OPERATIONBILL, "payload")(true))
        OperationBillService.updateOperationBill(extens, payload, id).then(async data => {
            // dispatch(actionCreator(UPDATE_OPERATIONBILL, "payload")(data))
            // dispatch(actionCreator(LOADING_OPERATIONBILL, "payload")(true))
            
            let result = await data.json();
            // console.log('resultado valores', result)
            if (data?.status  === 200) {
                dispatch(actionCreator(UPDATE_OPERATIONBILL, "payload")(result));
                
            } if (data?.status  === 400 && data?.statusText === "SESSION_NO_VALIDA") {
                dispatch(actionCreator(ERROR_OPERATIONBILL, "payload")(result));
                redirectNoLogin();
            } if (data?.status  === 400 && data?.statusText === "Bad Request") {
                console.log('ingreso redirectNoLogin')
                // dispatch(actionCreator(ERROR_OPERATIONBILL, "payload")(result));
                redirectNoLogin();
            } if (data?.status  === 500) {
                dispatch(actionCreator(ERROR_OPERATIONBILL, "payload")(result))
            }
            dispatch(actionCreator(LOADING_OPERATIONBILL, "payload")(false))
        })
        .catch( async error => {
            // let dataError = await  error
            // error = error.trim(); // remove the unwanted whitespace
            // let theOutput = JSON.parse(error);
            console.log('llego por aca catch',  error)
            if (error?.response?.data[0] === 'SESSION_NO_VALIDA') {redirectNoLogin();}
            dispatch(actionCreator(ERROR_OPERATIONBILL, "payload")(error))
            dispatch(actionCreator(LOADING_OPERATIONBILL, "payload")(false))
        })
    }
}

export const updateCodeError = (dispatch) => {
    return dispat => {
        dispatch(actionCreator(UPDATE_CODE_ERROR_OPERATIONBILL, "payload")(''));
    }
}

export const deleteOperationBills = (dispatch, extens, id) => {
    // return dispat => {
    //     dispatch(actionCreator(LOADING_OPERATIONBILL, "payload")(true))
    //     OperationBillService.deleteOperationBill(extens, id).then(data => {
    //         data._id = id;
    //         dispatch(actionCreator(DELETE_OPERATIONBILL, "payload")(data));
    //         dispatch(actionCreator(LOADING_OPERATIONBILL, "payload")(false))
    //     })
    //     .catch(error => {
    //         if (error.response.data === 'SESSION_NO_VALIDA') {redirectNoLogin();}
    //         dispatch(actionCreator(ERROR_OPERATIONBILL, "payload")(error))
    //         dispatch(actionCreator(LOADING_OPERATIONBILL, "payload")(false))
    //     })
    // }
}


