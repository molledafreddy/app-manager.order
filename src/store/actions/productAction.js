import  productService  from "../../services/productService";
import { actionCreator } from "template-redux-helpers";
import  { redirectNoLogin }  from "../../helpers/redirect-no-login";
import  { LOADING_PRODUCT, 
          GET_PRODUCT, 
          ERROR_PRODUCT, 
          CREATE_PRODUCT, 
          UPDATE_PRODUCT,
          DELETE_PRODUCT,
          GET_ALL_PRODUCT,
          GET_SEARCH_PRODUCT,
          UPDATE_CODE_ERROR_PRODUCT } from "../types/product";

const ProductService = new productService();

export const getProduct = (dispatch, extens, _id) => {
    return dispat => {
        dispatch(actionCreator(LOADING_PRODUCT, "payload")(true))
        ProductService.getProductId(extens, _id).then(data => {
            console.log('getProductId', data)
            dispatch(actionCreator(GET_PRODUCT, "payload")(data))
            dispatch(actionCreator(LOADING_PRODUCT, "payload")(false))
        })
        .catch(error => {
            if (error?.code === 'ERR_BAD_REQUEST' || error?.response?.data[0] === 'SESSION_NO_VALIDA') {redirectNoLogin();}
            dispatch(actionCreator(ERROR_PRODUCT, "payload")(error))
            dispatch(actionCreator(LOADING_PRODUCT, "payload")(false))
        })
    }
}

export const updateCodeErrorProduct = (dispatch) => {
    return dispat => {
        dispatch(actionCreator(UPDATE_CODE_ERROR_PRODUCT, "payload")(''));
    }
}

export const getSearchProducts = (dispatch, extens, limit, page, search) => {
    return dispat => {
        console.log('getSearchProducts')
        dispatch(actionCreator(LOADING_PRODUCT, "payload")(true))
        ProductService.getProduct(extens, limit, page, search).then(data => {
            dispatch(actionCreator(GET_SEARCH_PRODUCT, "payload")(data))
            dispatch(actionCreator(LOADING_PRODUCT, "payload")(false))
        })
        .catch(error => {
            if (error?.code === 'ERR_BAD_REQUEST' || error?.response?.data[0] === 'SESSION_NO_VALIDA') {redirectNoLogin();}
            dispatch(actionCreator(ERROR_PRODUCT, "payload")(error))
            dispatch(actionCreator(LOADING_PRODUCT, "payload")(false))
        })
    }
}



export const getProducts = (dispatch, extens) => {
    return dispat => {
        dispatch(actionCreator(LOADING_PRODUCT, "payload")(true))
        console.log('llego por aca getProducts')
        ProductService.getProducts(extens).then(data => {
            dispatch(actionCreator(GET_ALL_PRODUCT, "payload")(data))
            dispatch(actionCreator(LOADING_PRODUCT, "payload")(false))
        })
        .catch(error => {
            if (error?.code === 'ERR_BAD_REQUEST' || error?.response?.data[0] === 'SESSION_NO_VALIDA') {redirectNoLogin();}
            dispatch(actionCreator(ERROR_PRODUCT, "payload")(error))
            dispatch(actionCreator(LOADING_PRODUCT, "payload")(false))
        })
    }
}

export const createProducts = (dispatch, extens, payload) => {
    return dispat => {
        dispatch(actionCreator(LOADING_PRODUCT, "payload")(true))
        ProductService.createProduct(extens, payload).then(data => {
            console.log('datos accion', data)
            dispatch(actionCreator(CREATE_PRODUCT, "payload")(data.data))
            dispatch(actionCreator(LOADING_PRODUCT, "payload")(false))
        })
        .catch(error => {
            if (error?.code === 'ERR_BAD_REQUEST' || error?.response?.data[0] === 'SESSION_NO_VALIDA') {redirectNoLogin();}
            dispatch(actionCreator(ERROR_PRODUCT, "payload")(error))
            dispatch(actionCreator(LOADING_PRODUCT, "payload")(false))
        })
    }
}

export const updateProducts = (dispatch, extens, payload, id) => {
    return dispat => {
        dispatch(actionCreator(LOADING_PRODUCT, "payload")(true));
        ProductService.updateProduct(extens, payload, id).then(data => {
            console.log('llego a la actualizacion de productos')
            dispatch(actionCreator(UPDATE_PRODUCT, "payload")(data.data));
            dispatch(actionCreator(LOADING_PRODUCT, "payload")(false));
        })
        .catch(error => {
            if (error?.code === 'ERR_BAD_REQUEST' || error?.response?.data[0] === 'SESSION_NO_VALIDA') {redirectNoLogin();}
            dispatch(actionCreator(ERROR_PRODUCT, "payload")(error))
            dispatch(actionCreator(LOADING_PRODUCT, "payload")(false))
        })
    }
}

export const deleteProducts = (dispatch, extens, id) => {
    return dispat => {
        dispatch(actionCreator(LOADING_PRODUCT, "payload")(true))
        ProductService.deleteProduct(extens, id).then(data => {
            data._id = id;
            dispatch(actionCreator(DELETE_PRODUCT, "payload")(data));
            dispatch(actionCreator(LOADING_PRODUCT, "payload")(false))
        })
        .catch(error => {
            if (error?.code === 'ERR_BAD_REQUEST' || error?.response?.data[0] === 'SESSION_NO_VALIDA') {redirectNoLogin();}
            dispatch(actionCreator(ERROR_PRODUCT, "payload")(error))
            dispatch(actionCreator(LOADING_PRODUCT, "payload")(false))
        })
    }
}


