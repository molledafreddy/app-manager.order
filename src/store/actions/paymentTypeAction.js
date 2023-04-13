import  paymentTypeService  from "../../services/paymentTypeService";
import { actionCreator } from "template-redux-helpers";
import  { redirectNoLogin }  from "../../helpers/redirect-no-login";
import  { LOADING_PAYMENTTYPE, 
          GET_PAYMENTTYPE, 
          ERROR_PAYMENTTYPE, 
          CREATE_PAYMENTTYPE, 
          UPDATE_PAYMENTTYPE,
          DELETE_PAYMENTTYPE,
          GET_ALL_PAYMENTTYPE,
          GET_SEARCH_PAYMENTTYPE,
          GET_PAYMENTHASEGRESS } from "../types/paymentType";

const PaymentTypeService = new paymentTypeService();

export const getPaymentType = (dispatch, extens, _id) => {
    return dispat => {
        dispatch(actionCreator(LOADING_PAYMENTTYPE, "payload")(true))
        PaymentTypeService.getPaymentTypeId(extens, _id).then(data => {
            dispatch(actionCreator(GET_PAYMENTTYPE, "payload")(data))
            dispatch(actionCreator(LOADING_PAYMENTTYPE, "payload")(false))
        })
        .catch(error => {
            if (error.response.data === 'SESSION_NO_VALIDA') {redirectNoLogin();}
            dispatch(actionCreator(ERROR_PAYMENTTYPE, "payload")(error))
            dispatch(actionCreator(LOADING_PAYMENTTYPE, "payload")(false))
        })
    }
}

export const getPaymentHasEgress = (dispatch, extens, _id) => {
    return dispat => {
        dispatch(actionCreator(LOADING_PAYMENTTYPE, "payload")(true))
        PaymentTypeService.getPaymentHasEgress(extens, _id).then(data => {
            dispatch(actionCreator(GET_PAYMENTHASEGRESS, "payload")(data))
            dispatch(actionCreator(LOADING_PAYMENTTYPE, "payload")(false))
        })
        .catch(error => {
            if (error.response.data === 'SESSION_NO_VALIDA') {redirectNoLogin();}
            dispatch(actionCreator(ERROR_PAYMENTTYPE, "payload")(error))
            dispatch(actionCreator(LOADING_PAYMENTTYPE, "payload")(false))
        })
    }
}

export const getSearchPaymentTypes = (dispatch, extens, limit, page, search) => {
    return dispat => {
        dispatch(actionCreator(LOADING_PAYMENTTYPE, "payload")(true))
        PaymentTypeService.getPaymentType(extens, limit, page, search).then(data => {
            dispatch(actionCreator(GET_SEARCH_PAYMENTTYPE, "payload")(data))
            dispatch(actionCreator(LOADING_PAYMENTTYPE, "payload")(false))
        })
        .catch(error => {
            if (error.response.data === 'SESSION_NO_VALIDA') {redirectNoLogin();}
            dispatch(actionCreator(ERROR_PAYMENTTYPE, "payload")(error))
            dispatch(actionCreator(LOADING_PAYMENTTYPE, "payload")(false))
        })
    }
}



export const getPaymentTypes = (dispatch, extens) => {
    return dispat => {
        dispatch(actionCreator(LOADING_PAYMENTTYPE, "payload")(true))
        PaymentTypeService.getPaymentTypes(extens).then(data => {
            dispatch(actionCreator(GET_ALL_PAYMENTTYPE, "payload")(data))
            dispatch(actionCreator(LOADING_PAYMENTTYPE, "payload")(false))
        })
        .catch(error => {
            if (error.response.data === 'SESSION_NO_VALIDA') {redirectNoLogin();}
            dispatch(actionCreator(ERROR_PAYMENTTYPE, "payload")(error))
            dispatch(actionCreator(LOADING_PAYMENTTYPE, "payload")(false))
        })
    }
}

export const createPaymentTypes = (dispatch, extens, payload) => {
    return dispat => {
        dispatch(actionCreator(LOADING_PAYMENTTYPE, "payload")(true))
        PaymentTypeService.createPaymentType(extens, payload).then(data => {
            dispatch(actionCreator(CREATE_PAYMENTTYPE, "payload")(data))
            dispatch(actionCreator(LOADING_PAYMENTTYPE, "payload")(false))
        })
        .catch(error => {
            if (error.response.data === 'SESSION_NO_VALIDA') {redirectNoLogin();}
            dispatch(actionCreator(ERROR_PAYMENTTYPE, "payload")(error))
            dispatch(actionCreator(LOADING_PAYMENTTYPE, "payload")(false))
        })
    }
}

export const updatePaymentTypes = (dispatch, extens, payload, id) => {
    // console.log('llego la data', payload)
    return dispat => {
        dispatch(actionCreator(LOADING_PAYMENTTYPE, "payload")(true))
        PaymentTypeService.updatePaymentType(extens, payload, id).then(data => {
            dispatch(actionCreator(UPDATE_PAYMENTTYPE, "payload")(data))
            dispatch(actionCreator(LOADING_PAYMENTTYPE, "payload")(false))
        })
        .catch(error => {
            if (error.response.data === 'SESSION_NO_VALIDA') {redirectNoLogin();}
            dispatch(actionCreator(ERROR_PAYMENTTYPE, "payload")(error))
            dispatch(actionCreator(LOADING_PAYMENTTYPE, "payload")(false))
        })
    }
}

export const deletePaymentTypes = (dispatch, extens, id) => {
    return dispat => {
        dispatch(actionCreator(LOADING_PAYMENTTYPE, "payload")(true))
        PaymentTypeService.deletePaymentType(extens, id).then(data => {
            data._id = id;
            dispatch(actionCreator(DELETE_PAYMENTTYPE, "payload")(data));
            dispatch(actionCreator(LOADING_PAYMENTTYPE, "payload")(false))
        })
        .catch(error => {
            if (error.response.data === 'SESSION_NO_VALIDA') {redirectNoLogin();}
            dispatch(actionCreator(ERROR_PAYMENTTYPE, "payload")(error))
            dispatch(actionCreator(LOADING_PAYMENTTYPE, "payload")(false))
        })
    }
}


