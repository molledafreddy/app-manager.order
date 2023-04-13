import  providerService  from "../../services/accountService";
import { actionCreator } from "template-redux-helpers";
import  { redirectNoLogin }  from "../../helpers/redirect-no-login";
import  { LOADING_ACCOUNT, 
          GET_ACCOUNT, 
          ERROR_ACCOUNT, 
          CREATE_ACCOUNT, 
          UPDATE_ACCOUNT,
          DELETE_ACCOUNT,
          GET_ALL_ACCOUNT } from "../types/account";

const ProviderService = new providerService();

export const getAccount = (dispatch, extens, _id) => {
    return dispat => {
        dispatch(actionCreator(LOADING_ACCOUNT, "payload")(true))
        ProviderService.getAccountId(extens, _id).then(data => {
            dispatch(actionCreator(GET_ACCOUNT, "payload")(data))
            dispatch(actionCreator(LOADING_ACCOUNT, "payload")(false))
        })
        .catch(error => {
            if (error.response.data === 'SESSION_NO_VALIDA') {redirectNoLogin();}
            dispatch(actionCreator(ERROR_ACCOUNT, "payload")(error))
            dispatch(actionCreator(LOADING_ACCOUNT, "payload")(false))
        })
    }
}

export const getAccounts = (dispatch, extens, limit, page, search) => {
    return dispat => {
        dispatch(actionCreator(LOADING_ACCOUNT, "payload")(true))
        ProviderService.getAccount(extens, limit, page, search).then(data => {
            dispatch(actionCreator(GET_ALL_ACCOUNT, "payload")(data))
            dispatch(actionCreator(LOADING_ACCOUNT, "payload")(false))
        })
        .catch(error => {
            if (error.response.data === 'SESSION_NO_VALIDA') {redirectNoLogin();}
            dispatch(actionCreator(ERROR_ACCOUNT, "payload")(error))
            dispatch(actionCreator(LOADING_ACCOUNT, "payload")(false))
        })
    }
}

export const createAccounts = (dispatch, extens, payload) => {
    return dispat => {
        dispatch(actionCreator(LOADING_ACCOUNT, "payload")(true))
        ProviderService.createAccount(extens, payload).then(data => {
            dispatch(actionCreator(CREATE_ACCOUNT, "payload")(data))
            dispatch(actionCreator(LOADING_ACCOUNT, "payload")(false))
        })
        .catch(error => {
            if (error.response.data === 'SESSION_NO_VALIDA') {redirectNoLogin();}
            dispatch(actionCreator(ERROR_ACCOUNT, "payload")(error))
            dispatch(actionCreator(LOADING_ACCOUNT, "payload")(false))
        })
    }
}

export const updateAccounts = (dispatch, extens, payload, id) => {
    // console.log('llego la data', payload)
    return dispat => {
        dispatch(actionCreator(LOADING_ACCOUNT, "payload")(true))
        ProviderService.updateAccount(extens, payload, id).then(data => {
            dispatch(actionCreator(UPDATE_ACCOUNT, "payload")(data))
            dispatch(actionCreator(LOADING_ACCOUNT, "payload")(false))
        })
        .catch(error => {
            if (error.response.data === 'SESSION_NO_VALIDA') {redirectNoLogin();}
            dispatch(actionCreator(ERROR_ACCOUNT, "payload")(error))
            dispatch(actionCreator(LOADING_ACCOUNT, "payload")(false))
        })
    }
}

export const deleteAccounts = (dispatch, extens, id) => {
    return dispat => {
        dispatch(actionCreator(LOADING_ACCOUNT, "payload")(true))
        ProviderService.deleteAccount(extens, id).then(data => {
            data._id = id;
            dispatch(actionCreator(DELETE_ACCOUNT, "payload")(data));
            dispatch(actionCreator(LOADING_ACCOUNT, "payload")(false))
        })
        .catch(error => {
            if (error.response.data === 'SESSION_NO_VALIDA') {redirectNoLogin();}
            dispatch(actionCreator(ERROR_ACCOUNT, "payload")(error))
            dispatch(actionCreator(LOADING_ACCOUNT, "payload")(false))
        })
    }
}


