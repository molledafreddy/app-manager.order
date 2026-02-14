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

const handleSessionError = (dispatch, error) => {
    if (error?.response?.status === 401 || error?.response?.data?.error === 'SESSION_NO_VALIDA') {
        dispatch(actionCreator(UPDATE_CODE_ERROR_OPERATIONBILL, "payload")('401'));
        dispatch(actionCreator(LOADING_OPERATIONBILL, "payload")(false));
        
        setTimeout(() => {
            redirectNoLogin();
        }, 500);
        
        return true;
    }
    return false;
};

export const getOperationBill = (dispatch, extens, _id) => {
    return (dispatch) => {
        dispatch(actionCreator(LOADING_OPERATIONBILL, "payload")(true))
        OperationBillService.getOperationBillId(extens, _id).then(data => {
            dispatch(actionCreator(GET_OPERATIONBILL, "payload")(data))
            dispatch(actionCreator(LOADING_OPERATIONBILL, "payload")(false))
        })
        .catch(error => {
             if (handleSessionError(dispatch, error)) return;
                dispatch(actionCreator(ERROR_OPERATIONBILL, "payload")(error))
        })
        .finally(() => {
            dispatch(actionCreator(LOADING_OPERATIONBILL, "payload")(false))
        })
    }
}

export const getSearchOperationBills = (dispatch, extens, limit, page, search, data) => {
    return (dispatch) => {
        dispatch(actionCreator(LOADING_OPERATIONBILL, "payload")(true))
        OperationBillService.getOperationBill(extens, limit, page, search, data.startDate || '', data.endDate || '').then(data => {
            dispatch(actionCreator(GET_OPERATIONBILL, "payload")(data))
        })
        .catch(error => {
            if (handleSessionError(dispatch, error)) return;
                dispatch(actionCreator(ERROR_OPERATIONBILL, "payload")(error))
        })
        .finally(() => {
            dispatch(actionCreator(LOADING_OPERATIONBILL, "payload")(false))
        })
    }
}



export const getOperationBills = (dispatch, extens) => {
    return (dispatch) => {
        dispatch(actionCreator(LOADING_OPERATIONBILL, "payload")(true))
        OperationBillService.getOperationBills(extens).then(data => {
            dispatch(actionCreator(GET_ALL_OPERATIONBILL, "payload")(data))
        })
        .catch(error => {
            if (handleSessionError(dispatch, error)) return;
                dispatch(actionCreator(ERROR_OPERATIONBILL, "payload")(error))
        })
        .finally(() => {
            dispatch(actionCreator(LOADING_OPERATIONBILL, "payload")(false))
        })
    }
}

export const createOperationBills = (dispatch, extens, payload) => {
    return (dispatch) => {
        dispatch(actionCreator(LOADING_OPERATIONBILL, "payload")(true))
        OperationBillService.createOperationBill(extens, payload).then(data => {
            
            if (data?.status === 200) {
                console.log('📦 [createOperationBills] Response data:', data);
                console.log('📦 [createOperationBills] Response payload:', payload);
                dispatch(actionCreator(CREATE_OPERATIONBILL, "payload")(payload));
                // dispatch(actionCreator(UPDATE_CODE_ERROR_OPERATIONBILL, "payload")('200'));
                
            } else if (data?.status === 400) {
                console.log('⚠️ [createOperationBills] Error 400 - Bad Request');
                dispatch(actionCreator(ERROR_OPERATIONBILL, "payload")({
                    response: { status: 400, data: data }
                }));
                
            } else if (data?.status === 401) {
                console.log('⚠️ [createOperationBills] Error 401 - No autenticado');
                dispatch(actionCreator(ERROR_OPERATIONBILL, "payload")({
                    response: { status: 401, data: data }
                }));
                setTimeout(() => {
                    redirectNoLogin();
                }, 500);
                
            } else if (data?.status === 500) {
                console.log('❌ [createOperationBills] Error 500 - Server error');
                dispatch(actionCreator(ERROR_OPERATIONBILL, "payload")({
                    response: { status: 500, data: data }
                }));
                dispatch(actionCreator(UPDATE_CODE_ERROR_OPERATIONBILL, "payload")('500'));
                
            } else {
                console.log('❌ [createOperationBills] Error desconocido:', data?.status);
                dispatch(actionCreator(ERROR_OPERATIONBILL, "payload")({
                    response: { status: data?.status || 500, data: data }
                }));
            }
        })
        .catch(error => {
            if (handleSessionError(dispatch, error)) return;
                
                // ✅ Otros errores
                dispatch(actionCreator(ERROR_OPERATIONBILL, "payload")(error));
                dispatch(actionCreator(UPDATE_CODE_ERROR_OPERATIONBILL, "payload")('500'));
        })
        .finally(() => {
            dispatch(actionCreator(LOADING_OPERATIONBILL, "payload")(false))
        })
    }
}

export const updateOperationBills = (dispatch, extens, payload, paymentContainer, id) => {
    return  (dispatch) => {
        dispatch(actionCreator(LOADING_OPERATIONBILL, "payload")(true))
        OperationBillService.updateOperationBill(extens, payload, paymentContainer, id).then(async data => {
            
            let result = payload;
            if (data?.status  === 200) {
                if (result[0] === "NOT_FOUND_DATA_PAYMENT_HAS_EGRESS") {
                    dispatch(actionCreator(ERROR_OPERATIONBILL, "payload")(result));
                } else {
                    dispatch(actionCreator(UPDATE_OPERATIONBILL, "payload")(result));
                }
                
            } else if (data?.status  === 400) {
                dispatch(actionCreator(ERROR_OPERATIONBILL, "payload")({
                    response: { status: 400, data: result }
                }));
            } else if (data?.status  === 401) {
                
                dispatch(actionCreator(ERROR_OPERATIONBILL, "payload")({
                    response: { status: 401, data: result }
                }));
                redirectNoLogin();
                
            } else if (data?.status  === 500) {
                dispatch(actionCreator(ERROR_OPERATIONBILL, "payload")({
                    response: { status: 500, data: result }
                }));
            } else {
                dispatch(actionCreator(ERROR_OPERATIONBILL, "payload")({
                    response: { 
                        status: data?.status || 500, 
                        data: result 
                    }
                }));
            }
            dispatch(actionCreator(LOADING_OPERATIONBILL, "payload")(true))
        })
        .catch( async error => {
            if (handleSessionError(dispatch, error)) return;
                dispatch(actionCreator(ERROR_OPERATIONBILL, "payload")(error));
                dispatch(actionCreator(UPDATE_CODE_ERROR_OPERATIONBILL, "payload")('500'));
        })
        .finally(() => {
            dispatch(actionCreator(LOADING_OPERATIONBILL, "payload")(false))
        })
    }
}

export const updateCodeError = (dispatch) => {
    return (dispatch) => {
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


