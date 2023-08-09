import  productDeliveryService  from "../../services/productDeliveryService";
import { actionCreator } from "template-redux-helpers";
import  { redirectNoLogin }  from "../../helpers/redirect-no-login";
import  { LOADING_PRODUCT_DELIVERY, 
          GET_PRODUCT_DELIVERY, 
          ERROR_PRODUCT_DELIVERY, 
          CREATE_PRODUCT_DELIVERY, 
          UPDATE_PRODUCT_DELIVERY,
          DELETE_PRODUCT_DELIVERY,
          GET_ALL_PRODUCT_DELIVERY,
          GET_SEARCH_PRODUCT_DELIVERY,
          GET_PRODUCT_HAS_DELIVERY,
          UPDATE_CODE_ERROR_PRODUCT_DELIVERY } from "../types/productDelivery";

const ProductDeliveryService = new productDeliveryService();

export const getProductDelivery = (dispatch, extens, _id) => {
    return dispat => {
        // console.log('getProductDeliveryId extens', extens)
        dispatch(actionCreator(LOADING_PRODUCT_DELIVERY, "payload")(true))
        ProductDeliveryService.getProductDeliveryId(extens, _id).then(data => {
            // console.log('getProductDeliveryId', data)
            dispatch(actionCreator(GET_PRODUCT_DELIVERY, "payload")(data))
            dispatch(actionCreator(LOADING_PRODUCT_DELIVERY, "payload")(false))
        })
        .catch(error => {
            if (error?.code === 'ERR_BAD_REQUEST' || error?.response?.data[0] === 'SESSION_NO_VALIDA') {redirectNoLogin();}
            dispatch(actionCreator(ERROR_PRODUCT_DELIVERY, "payload")(error))
            dispatch(actionCreator(LOADING_PRODUCT_DELIVERY, "payload")(false))
        })
    }
}

export const getProductHasDelivery = (dispatch, extens, _id) => {
    return dispat => {
        dispatch(actionCreator(LOADING_PRODUCT_DELIVERY, "payload")(true))
        ProductDeliveryService.getProductHasDelivery(extens, _id).then(data => {
            dispatch(actionCreator(GET_PRODUCT_HAS_DELIVERY, "payload")(data))
            dispatch(actionCreator(LOADING_PRODUCT_DELIVERY, "payload")(false))
        })
        .catch(error => {
            if (error?.code === 'ERR_BAD_REQUEST' || error?.response?.data[0] === 'SESSION_NO_VALIDA') {redirectNoLogin();}
            dispatch(actionCreator(ERROR_PRODUCT_DELIVERY, "payload")(error))
            dispatch(actionCreator(LOADING_PRODUCT_DELIVERY, "payload")(false))
        })
    }
}

export const updateCodeErrorProductDelivery = (dispatch) => {
    return dispat => {
        dispatch(actionCreator(UPDATE_CODE_ERROR_PRODUCT_DELIVERY, "payload")(''));
    }
}

export const getSearchProductDeliveries = (dispatch, extens, limit, page, search) => {
    return dispat => {
        console.log('getSearchProducts getSearchProductDeliveries', )
        dispatch(actionCreator(LOADING_PRODUCT_DELIVERY, "payload")(true))
        ProductDeliveryService.getProductDelivery(extens, limit, page, search).then(data => {
            dispatch(actionCreator(GET_SEARCH_PRODUCT_DELIVERY, "payload")(data))
            dispatch(actionCreator(LOADING_PRODUCT_DELIVERY, "payload")(false))
        })
        .catch(error => {
            console.log('llego por aca', error)
            if (error?.code === 'ERR_BAD_REQUEST' || error?.response?.data[0] === 'SESSION_NO_VALIDA') {redirectNoLogin();}
            dispatch(actionCreator(ERROR_PRODUCT_DELIVERY, "payload")(error))
            dispatch(actionCreator(LOADING_PRODUCT_DELIVERY, "payload")(false))
        })
    }
}



export const getProductDeliveries = (dispatch, extens) => {
    return dispat => {
        dispatch(actionCreator(LOADING_PRODUCT_DELIVERY, "payload")(true))
        console.log('llego por aca getProducts')
        ProductDeliveryService.getProductDeliveries(extens).then(data => {
            dispatch(actionCreator(GET_ALL_PRODUCT_DELIVERY, "payload")(data))
            dispatch(actionCreator(LOADING_PRODUCT_DELIVERY, "payload")(false))
        })
        .catch(error => {
            if (error?.code === 'ERR_BAD_REQUEST' || error?.response?.data[0] === 'SESSION_NO_VALIDA') {redirectNoLogin();}
            dispatch(actionCreator(ERROR_PRODUCT_DELIVERY, "payload")(error))
            dispatch(actionCreator(LOADING_PRODUCT_DELIVERY, "payload")(false))
        })
    }
}

export const createProductDelivery = (dispatch, extens, payload) => {
    return dispat => {
        dispatch(actionCreator(LOADING_PRODUCT_DELIVERY, "payload")(true))
        ProductDeliveryService.createProductDelivery(extens, payload).then(data => {
            console.log('datos accion', data)
            dispatch(actionCreator(CREATE_PRODUCT_DELIVERY, "payload")(data.data))
            dispatch(actionCreator(LOADING_PRODUCT_DELIVERY, "payload")(false))
        })
        .catch(error => {
            if (error?.code === 'ERR_BAD_REQUEST' || error?.response?.data[0] === 'SESSION_NO_VALIDA') {redirectNoLogin();}
            dispatch(actionCreator(ERROR_PRODUCT_DELIVERY, "payload")(error))
            dispatch(actionCreator(LOADING_PRODUCT_DELIVERY, "payload")(false))
        })
    }
}

export const updateProductDelivery = (dispatch, extens, payload, id) => {
    return dispat => {
        dispatch(actionCreator(LOADING_PRODUCT_DELIVERY, "payload")(true));
        ProductDeliveryService.updateProductDelivery(extens, payload, id).then(data => {
            console.log('llego a la actualizacion de productos')
            dispatch(actionCreator(UPDATE_PRODUCT_DELIVERY, "payload")(data.data));
            dispatch(actionCreator(LOADING_PRODUCT_DELIVERY, "payload")(false));
        })
        .catch(error => {
            if (error?.code === 'ERR_BAD_REQUEST' || error?.response?.data[0] === 'SESSION_NO_VALIDA') {redirectNoLogin();}
            dispatch(actionCreator(ERROR_PRODUCT_DELIVERY, "payload")(error))
            dispatch(actionCreator(LOADING_PRODUCT_DELIVERY, "payload")(false))
        })
    }
}

export const deleteProductDelivery = (dispatch, extens, id) => {
    return dispat => {
        dispatch(actionCreator(LOADING_PRODUCT_DELIVERY, "payload")(true))
        ProductDeliveryService.deleteProduct(extens, id).then(data => {
            data._id = id;
            dispatch(actionCreator(DELETE_PRODUCT_DELIVERY, "payload")(data));
            dispatch(actionCreator(LOADING_PRODUCT_DELIVERY, "payload")(false))
        })
        .catch(error => {
            if (error?.code === 'ERR_BAD_REQUEST' || error?.response?.data[0] === 'SESSION_NO_VALIDA') {redirectNoLogin();}
            dispatch(actionCreator(ERROR_PRODUCT_DELIVERY, "payload")(error))
            dispatch(actionCreator(LOADING_PRODUCT_DELIVERY, "payload")(false))
        })
    }
}


