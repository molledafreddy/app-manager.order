import  turnService  from "../../services/turnService";
import  { redirectNoLogin }  from "../../helpers/redirect-no-login";
import { actionCreator } from "template-redux-helpers";
import  { LOADING_TURN, 
          GET_TURN, 
          ERROR_TURN, 
          CREATE_TURN, 
          UPDATE_TURN,
          DELETE_TURN,
          GET_ALL_TURN,
          UPDATE_CODE_ERROR_TURN,
          GET_TURN_FOR_USER   } from "../types/turn";

const TurnService = new turnService();

export const getTurn = (dispatch, extens, _id) => {
    return dispat => {
        dispatch(actionCreator(LOADING_TURN, "payload")(true))
        TurnService.getTurnId(extens, _id).then(data => {
            dispatch(actionCreator(GET_TURN, "payload")(data))
            dispatch(actionCreator(LOADING_TURN, "payload")(false))
        })
        .catch(error => {
            if (error?.response?.data[0] === 'SESSION_NO_VALIDA') {redirectNoLogin();}
            dispatch(actionCreator(ERROR_TURN, "payload")(error))
            dispatch(actionCreator(LOADING_TURN, "payload")(false))
        })
    }
}

export const getSearchTurns = (dispatch, extens, limit, page, type, paymentType, status, data) => {
    return dispat => {
        dispatch(actionCreator(LOADING_TURN, "payload")(true))
        TurnService.getTurn(extens, limit, page, type, paymentType, status, data.startDate || '', data.endDate || '').then(data => {
            // console.log('OperationBillService', data)
            dispatch(actionCreator(GET_ALL_TURN, "payload")(data))
            dispatch(actionCreator(LOADING_TURN, "payload")(false))
        })
        .catch(error => {
            if (error?.response?.data[0] === 'SESSION_NO_VALIDA') {redirectNoLogin();}
            dispatch(actionCreator(ERROR_TURN, "payload")(error))
            dispatch(actionCreator(LOADING_TURN, "payload")(false))
        })
    }
}

export const getTurnForUser = (dispatch, extens, limit, page, type, paymentType, status, data) => {
    return dispat => {
        dispatch(actionCreator(LOADING_TURN, "payload")(true))
        TurnService.getTurnForUser(extens, limit, page, type, paymentType, status, data.startDate || '', data.endDate || '').then(data => {
            dispatch(actionCreator(GET_TURN_FOR_USER, "payload")(data))
            dispatch(actionCreator(LOADING_TURN, "payload")(false))
        })
        .catch(error => {
            if (error?.response?.data[0] === 'SESSION_NO_VALIDA') {redirectNoLogin();}
            dispatch(actionCreator(ERROR_TURN, "payload")(error))
            dispatch(actionCreator(LOADING_TURN, "payload")(false))
        })
    }
}

export const getTurns = (dispatch, extens) => {
    return dispat => {
        dispatch(actionCreator(LOADING_TURN, "payload")(true))
        TurnService.getTurns(extens).then(data => {
            dispatch(actionCreator(GET_ALL_TURN, "payload")(data))
            dispatch(actionCreator(LOADING_TURN, "payload")(false))
        })
        .catch(error => {
            if (error?.response?.data[0] === 'SESSION_NO_VALIDA') {redirectNoLogin();}
            dispatch(actionCreator(ERROR_TURN, "payload")(error))
            dispatch(actionCreator(LOADING_TURN, "payload")(false))
        })
    }
}

export const createTurn = (dispatch, extens, payload) => {
    return dispat => {
        dispatch(actionCreator(LOADING_TURN, "payload")(true))
        TurnService.createTurn(extens, payload).then(data => {
            if (data?.status  === 200 && data?.data === 'TURN_ACTIVE') {
                // console.log('ingreso no tiene errorssss 200 TURN_ACTIVE', data)
                let dataR = {
                    code: data?.data,
                    codeHttp: '400',
                    message: 'Ya posee un turno Activo'
                }
                dispatch(actionCreator(ERROR_TURN, "payload")(dataR));
                
            } else if (data?.status  === 200) {
                // console.log('ingreso no tiene errorssss 200', data)
                dispatch(actionCreator(CREATE_TURN, "payload")(data));
                
            } else if (data?.status  === 400 && data?.statusText === "Bad Request") {
                console.log('ingreso tiene error 400', data)
                dispatch(actionCreator(ERROR_TURN, "payload")(data));
                redirectNoLogin();
            } else {
                console.log('ingreso al else tiene error', data)
                dispatch(actionCreator(ERROR_TURN, "payload")(data))
            }
            dispatch(actionCreator(LOADING_TURN, "payload")(false))
        })
        .catch(error => {
            if (error?.response?.data[0] === 'SESSION_NO_VALIDA') {redirectNoLogin();}
            dispatch(actionCreator(ERROR_TURN, "payload")(error))
            dispatch(actionCreator(LOADING_TURN, "payload")(false))
        })
    }
}

export const updateTurn = (dispatch, extens, payload, id) => {
    // console.log('llego la data', payload)
    return dispat => {
        dispatch(actionCreator(LOADING_TURN, "payload")(true))
        TurnService.updateTurn(extens, payload, id).then(data => {
            // dispatch(actionCreator(UPDATE_TURN, "payload")(data))
            // dispatch(actionCreator(LOADING_TURN, "payload")(false))
            if (data?.status  === 200) {
                // console.log('ingreso no tiene errorssss 200', data)
                dispatch(actionCreator(UPDATE_TURN, "payload")(data));
                
            } else if (data?.status  === 400 && data?.statusText === "Bad Request") {
                console.log('ingreso tiene error 400', data)
                dispatch(actionCreator(ERROR_TURN, "payload")(data));
                redirectNoLogin();
            } else {
                console.log('ingreso al else tiene error', data)
                dispatch(actionCreator(ERROR_TURN, "payload")(data))
            }
            dispatch(actionCreator(LOADING_TURN, "payload")(false))
        })
        .catch(error => {
            if (error?.response?.data[0] === 'SESSION_NO_VALIDA') {redirectNoLogin();}
            dispatch(actionCreator(ERROR_TURN, "payload")(error))
            dispatch(actionCreator(LOADING_TURN, "payload")(false))
        })
    }
}

export const updateCodeError = (dispatch) => {
    return dispat => {
        dispatch(actionCreator(UPDATE_CODE_ERROR_TURN, "payload")(''));
    }
}

export const deleteTurn = (dispatch, extens, id) => {
    return dispat => {
        dispatch(actionCreator(LOADING_TURN, "payload")(true))
        TurnService.deleteTurn(extens, id).then(data => {
            data._id = id;
            dispatch(actionCreator(DELETE_TURN, "payload")(data));
            dispatch(actionCreator(LOADING_TURN, "payload")(false))
        })
        .catch(error => {
            if (error?.response?.data[0] === 'SESSION_NO_VALIDA') {redirectNoLogin();}
            dispatch(actionCreator(ERROR_TURN, "payload")(error))
            dispatch(actionCreator(LOADING_TURN, "payload")(false))
        })
    }
}


