import  categoryProductService  from "../../services/categoryProductService";
import { actionCreator } from "template-redux-helpers";
import  { redirectNoLogin }  from "../../helpers/redirect-no-login";
import  { LOADING_CATEGORY_PRODUCT, 
          ERROR_CATEGORY_PRODUCT, 
          CREATE_CATEGORY_PRODUCT, 
          UPDATE_CATEGORY_PRODUCT,
          DELETE_CATEGORY_PRODUCT,
          GET_ALL_CATEGORY_PRODUCT,
          GET_SEARCH_CATEGORY_PRODUCT, 
          GET_CATEGORY_PRODUCT } from "../types/categoryProduct";


const CategoryProductService = new categoryProductService();

export const getCategoryProduct = (dispatch, extens, _id) => {
    return dispat => {
        dispatch(actionCreator(LOADING_CATEGORY_PRODUCT, "payload")(true));
        console.log('extesns', extens)
        CategoryProductService.getCategoryProducts(extens, _id).then(data => {
            // console.log('data', data)
            dispatch(actionCreator(GET_ALL_CATEGORY_PRODUCT, "payload")(data))
            dispatch(actionCreator(LOADING_CATEGORY_PRODUCT, "payload")(false))
        })
        .catch(error => {
            if (error?.code === 'ERR_BAD_REQUEST' || error?.response?.data[0] === 'SESSION_NO_VALIDA') {redirectNoLogin();}
            dispatch(actionCreator(ERROR_CATEGORY_PRODUCT, "payload")(error))
            dispatch(actionCreator(LOADING_CATEGORY_PRODUCT, "payload")(false))
        })
    }
}

export const getSearchCategoryProducts = (dispatch, extens, limit, page, search) => {
    return dispat => {
        dispatch(actionCreator(LOADING_CATEGORY_PRODUCT, "payload")(true))
        CategoryProductService.getCategoryProduct(extens, limit, page, search).then(data => {
            dispatch(actionCreator(GET_SEARCH_CATEGORY_PRODUCT, "payload")(data))
            dispatch(actionCreator(LOADING_CATEGORY_PRODUCT, "payload")(false))
        })
        .catch(error => {
            if (error?.code === 'ERR_BAD_REQUEST' || error?.response?.data[0] === 'SESSION_NO_VALIDA') {redirectNoLogin();}
            dispatch(actionCreator(ERROR_CATEGORY_PRODUCT, "payload")(error))
            dispatch(actionCreator(LOADING_CATEGORY_PRODUCT, "payload")(false))
        })
    }
}



export const getCategoryProducts = (dispatch, extens) => {
    return dispat => {
        dispatch(actionCreator(LOADING_CATEGORY_PRODUCT, "payload")(true))
        CategoryProductService.getCategoryProducts(extens).then(data => {
            dispatch(actionCreator(GET_ALL_CATEGORY_PRODUCT, "payload")(data))
            dispatch(actionCreator(LOADING_CATEGORY_PRODUCT, "payload")(false))
        })
        .catch(error => {
            if (error?.code === 'ERR_BAD_REQUEST' || error?.response?.data[0] === 'SESSION_NO_VALIDA') {redirectNoLogin();}
            dispatch(actionCreator(ERROR_CATEGORY_PRODUCT, "payload")(error))
            dispatch(actionCreator(LOADING_CATEGORY_PRODUCT, "payload")(false))
        })
    }
}

export const createCategoryProducts = (dispatch, extens, payload) => {
    return dispat => {
        dispatch(actionCreator(LOADING_CATEGORY_PRODUCT, "payload")(true))
        CategoryProductService.createCategoryProduct(extens, payload).then(data => {
            dispatch(actionCreator(CREATE_CATEGORY_PRODUCT, "payload")(data))
            dispatch(actionCreator(LOADING_CATEGORY_PRODUCT, "payload")(false))
        })
        .catch(error => {
            if (error?.code === 'ERR_BAD_REQUEST' || error?.response?.data[0] === 'SESSION_NO_VALIDA') {redirectNoLogin();}
            dispatch(actionCreator(ERROR_CATEGORY_PRODUCT, "payload")(error))
            dispatch(actionCreator(LOADING_CATEGORY_PRODUCT, "payload")(false))
        })
    }
}

export const updateCategoryProducts = (dispatch, extens, payload, id) => {
    // console.log('llego la data', payload)
    return dispat => {
        dispatch(actionCreator(LOADING_CATEGORY_PRODUCT, "payload")(true))
        CategoryProductService.updateCategoryProduct(extens, payload, id).then(data => {
            dispatch(actionCreator(UPDATE_CATEGORY_PRODUCT, "payload")(data))
            dispatch(actionCreator(LOADING_CATEGORY_PRODUCT, "payload")(false))
        })
        .catch(error => {
            if (error?.code === 'ERR_BAD_REQUEST' || error?.response?.data[0] === 'SESSION_NO_VALIDA') {redirectNoLogin();}
            dispatch(actionCreator(ERROR_CATEGORY_PRODUCT, "payload")(error))
            dispatch(actionCreator(LOADING_CATEGORY_PRODUCT, "payload")(false))
        })
    }
}

export const deleteCategoryProducts = (dispatch, extens, id) => {
    return dispat => {
        dispatch(actionCreator(LOADING_CATEGORY_PRODUCT, "payload")(true))
        CategoryProductService.deleteCategoryProduct(extens, id).then(data => {
            data._id = id;
            dispatch(actionCreator(DELETE_CATEGORY_PRODUCT, "payload")(data));
            dispatch(actionCreator(LOADING_CATEGORY_PRODUCT, "payload")(false))
        })
        .catch(error => {
            if (error?.code === 'ERR_BAD_REQUEST' || error?.response?.data[0] === 'SESSION_NO_VALIDA') {redirectNoLogin();}
            dispatch(actionCreator(ERROR_CATEGORY_PRODUCT, "payload")(error))
            dispatch(actionCreator(LOADING_CATEGORY_PRODUCT, "payload")(false))
        })
    }
}


