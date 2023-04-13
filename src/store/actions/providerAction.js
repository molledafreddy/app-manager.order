import  providerService  from "../../services/providerService";
import { actionCreator } from "template-redux-helpers";
import  { redirectNoLogin }  from "../../helpers/redirect-no-login";
import  { LOADING_PROVIDER, 
          GET_PROVIDER, 
          ERROR_PROVIDER, 
          CREATE_PROVIDER, 
          UPDATE_PROVIDER,
          DELETE_PROVIDER,
          GET_ALL_PROVIDER,
          GET_SEARCH_PROVIDER } from "../types/provider";

const ProviderService = new providerService();

export const getProvider = (dispatch, extens, _id) => {
    return dispat => {
        dispatch(actionCreator(LOADING_PROVIDER, "payload")(true))
        ProviderService.getProviderId(extens, _id).then(data => {
            dispatch(actionCreator(GET_PROVIDER, "payload")(data))
            dispatch(actionCreator(LOADING_PROVIDER, "payload")(false))
        })
        .catch(error => {
            if (error.response.data === 'SESSION_NO_VALIDA') {redirectNoLogin();}
            dispatch(actionCreator(ERROR_PROVIDER, "payload")(error))
            dispatch(actionCreator(LOADING_PROVIDER, "payload")(false))
        })
    }
}

export const getSearchProviders = (dispatch, extens, limit, page, search) => {
    return dispat => {
        dispatch(actionCreator(LOADING_PROVIDER, "payload")(true))
        ProviderService.getProvider(extens, limit, page, search).then(data => {
            dispatch(actionCreator(GET_SEARCH_PROVIDER, "payload")(data))
            dispatch(actionCreator(LOADING_PROVIDER, "payload")(false))
        })
        .catch(error => {
            if (error.response.data === 'SESSION_NO_VALIDA') {redirectNoLogin();}
            dispatch(actionCreator(ERROR_PROVIDER, "payload")(error))
            dispatch(actionCreator(LOADING_PROVIDER, "payload")(false))
        })
    }
}



export const getProviders = (dispatch, extens) => {
    return dispat => {
        dispatch(actionCreator(LOADING_PROVIDER, "payload")(true))
        ProviderService.getProviders(extens).then(data => {
            dispatch(actionCreator(GET_ALL_PROVIDER, "payload")(data))
            dispatch(actionCreator(LOADING_PROVIDER, "payload")(false))
        })
        .catch(error => {
            if (error.response.data === 'SESSION_NO_VALIDA') {redirectNoLogin();}
            dispatch(actionCreator(ERROR_PROVIDER, "payload")(error))
            dispatch(actionCreator(LOADING_PROVIDER, "payload")(false))
        })
    }
}

export const createProviders = (dispatch, extens, payload) => {
    return dispat => {
        dispatch(actionCreator(LOADING_PROVIDER, "payload")(true))
        ProviderService.createProvider(extens, payload).then(data => {
            dispatch(actionCreator(CREATE_PROVIDER, "payload")(data))
            dispatch(actionCreator(LOADING_PROVIDER, "payload")(false))
        })
        .catch(error => {
            if (error.response.data === 'SESSION_NO_VALIDA') {redirectNoLogin();}
            dispatch(actionCreator(ERROR_PROVIDER, "payload")(error))
            dispatch(actionCreator(LOADING_PROVIDER, "payload")(false))
        })
    }
}

export const updateProviders = (dispatch, extens, payload, id) => {
    // console.log('llego la data', payload)
    return dispat => {
        dispatch(actionCreator(LOADING_PROVIDER, "payload")(true))
        ProviderService.updateProvider(extens, payload, id).then(data => {
            dispatch(actionCreator(UPDATE_PROVIDER, "payload")(data))
            dispatch(actionCreator(LOADING_PROVIDER, "payload")(false))
        })
        .catch(error => {
            if (error.response.data === 'SESSION_NO_VALIDA') {redirectNoLogin();}
            dispatch(actionCreator(ERROR_PROVIDER, "payload")(error))
            dispatch(actionCreator(LOADING_PROVIDER, "payload")(false))
        })
    }
}

export const deleteProviders = (dispatch, extens, id) => {
    return dispat => {
        dispatch(actionCreator(LOADING_PROVIDER, "payload")(true))
        ProviderService.deleteProvider(extens, id).then(data => {
            data._id = id;
            dispatch(actionCreator(DELETE_PROVIDER, "payload")(data));
            dispatch(actionCreator(LOADING_PROVIDER, "payload")(false))
        })
        .catch(error => {
            if (error.response.data === 'SESSION_NO_VALIDA') {redirectNoLogin();}
            dispatch(actionCreator(ERROR_PROVIDER, "payload")(error))
            dispatch(actionCreator(LOADING_PROVIDER, "payload")(false))
        })
    }
}


