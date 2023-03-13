import  bankService  from "../../services/bankService";
import { actionCreator } from "template-redux-helpers";
import  { LOADING_BANK,BANK_PROVIDER, 
          ERROR_BANK, 
          CREATE_BANK, 
          UPDATE_BANK,
          DELETE_BANK,
          GET_ALL_BANK,
          GET_SEARCH_BANK, 
          GET_BANK } from "../types/bank";

const BankService = new bankService();

export const getBank = (dispatch, extens, _id) => {
    return dispat => {
        dispatch(actionCreator(LOADING_BANK, "payload")(true))
        BankService.getBankId(extens, _id).then(data => {
            dispatch(actionCreator(GET_BANK, "payload")(data))
            dispatch(actionCreator(LOADING_BANK, "payload")(false))
        })
        .catch(error => {
            dispatch(actionCreator(ERROR_BANK, "payload")(error))
            dispatch(actionCreator(LOADING_BANK, "payload")(false))
        })
    }
}

export const getSearchBankrs = (dispatch, extens, limit, page, search) => {
    return dispat => {
        dispatch(actionCreator(LOADING_BANK, "payload")(true))
        BankService.getBank(extens, limit, page, search).then(data => {
            dispatch(actionCreator(GET_SEARCH_BANK, "payload")(data))
            dispatch(actionCreator(LOADING_BANK, "payload")(false))
        })
        .catch(error => {
            console.log('datos error',error )
            dispatch(actionCreator(ERROR_BANK, "payload")(error))
            dispatch(actionCreator(LOADING_BANK, "payload")(false))
        })
    }
}



export const getBanks = (dispatch, extens) => {
    return dispat => {
        dispatch(actionCreator(LOADING_BANK, "payload")(true))
        BankService.getBanks(extens).then(data => {
            dispatch(actionCreator(GET_ALL_BANK, "payload")(data))
            dispatch(actionCreator(LOADING_BANK, "payload")(false))
        })
        .catch(error => {
            dispatch(actionCreator(ERROR_BANK, "payload")(error))
            dispatch(actionCreator(LOADING_BANK, "payload")(false))
        })
    }
}

export const createBanks = (dispatch, extens, payload) => {
    return dispat => {
        dispatch(actionCreator(LOADING_BANK, "payload")(true))
        BankService.createBank(extens, payload).then(data => {
            dispatch(actionCreator(CREATE_BANK, "payload")(data))
            dispatch(actionCreator(LOADING_BANK, "payload")(false))
        })
        .catch(error => {
            dispatch(actionCreator(ERROR_BANK, "payload")(error))
            dispatch(actionCreator(LOADING_BANK, "payload")(false))
        })
    }
}

export const updateBanks = (dispatch, extens, payload, id) => {
    // console.log('llego la data', payload)
    return dispat => {
        dispatch(actionCreator(LOADING_BANK, "payload")(true))
        BankService.updateBank(extens, payload, id).then(data => {
            dispatch(actionCreator(UPDATE_BANK, "payload")(data))
            dispatch(actionCreator(LOADING_BANK, "payload")(false))
        })
        .catch(error => {
            dispatch(actionCreator(ERROR_BANK, "payload")(error))
            dispatch(actionCreator(LOADING_BANK, "payload")(false))
        })
    }
}

export const deleteBanks = (dispatch, extens, id) => {
    return dispat => {
        dispatch(actionCreator(LOADING_BANK, "payload")(true))
        BankService.deleteBank(extens, id).then(data => {
            data._id = id;
            dispatch(actionCreator(DELETE_BANK, "payload")(data));
            dispatch(actionCreator(LOADING_BANK, "payload")(false))
        })
        .catch(error => {
            dispatch(actionCreator(ERROR_BANK, "payload")(error))
            dispatch(actionCreator(LOADING_BANK, "payload")(false))
        })
    }
}


