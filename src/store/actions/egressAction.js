import  egressService  from "../../services/egressService";
import { actionCreator } from "template-redux-helpers";
import  { redirectNoLogin }  from "../../helpers/redirect-no-login";
import  { LOADING_EGRESS, 
          GET_SEARCH_EGRESS, 
          ERROR_EGRESS,
           } from "../types/egress";

const EgressService = new egressService();

// export const getOrder = (dispatch, extens, _id) => {
//     return dispat => {
//         dispatch(actionCreator(LOADING_ORDER, "payload")(true))
//         OrderService.getOrderId(extens, _id).then(data => {
//             dispatch(actionCreator(GET_ORDER, "payload")(data))
//             dispatch(actionCreator(LOADING_ORDER, "payload")(false))
//         })
//         .catch(error => {
//             dispatch(actionCreator(ERROR_ORDER, "payload")(error))
//             dispatch(actionCreator(LOADING_ORDER, "payload")(false))
//         })
//     }
// }

export const getSearchEgress = (dispatch, extens, data) => {
    return dispat => {
        dispatch(actionCreator(LOADING_EGRESS, "payload")(true))
        EgressService.getSearchEgress(extens, data).then(data => {
            dispatch(actionCreator(GET_SEARCH_EGRESS, "payload")(data))
            dispatch(actionCreator(LOADING_EGRESS, "payload")(false))
        })
        .catch(error => {
            if (error?.response?.data[0] === 'SESSION_NO_VALIDA') {redirectNoLogin();}
            dispatch(actionCreator(ERROR_EGRESS, "payload")(error))
            dispatch(actionCreator(LOADING_EGRESS, "payload")(false))
        })
    }
}

// export const getSearchOrderPaitOut = (dispatch, extend, limit, page, status, startDate = '', endDate = '') => {
//     return dispat => {
//         dispatch(actionCreator(LOADING_ORDER, "payload")(true))
//         // console.log('startDate', startDate)
//         // console.log('endDate', endDate)
//         OrderService.getSearchOrderPaitOut(extend, limit, page, status, startDate, endDate).then(data => {
//             // console.log('OperationBillService', data)
//             dispatch(actionCreator(GET_SEARCH_ORDER_PAITOUT, "payload")(data))
//             dispatch(actionCreator(LOADING_ORDER, "payload")(false))
//         })
//         .catch(error => {
//             dispatch(actionCreator(ERROR_ORDER, "payload")(error))
//             dispatch(actionCreator(LOADING_ORDER, "payload")(false))
//         })
//     }
// }


// export const getOrders = (dispatch, extens) => {
//     return dispat => {
//         dispatch(actionCreator(LOADING_ORDER, "payload")(true))
//         OrderService.getOperationBills(extens).then(data => {
//             dispatch(actionCreator(GET_ALL_ORDER, "payload")(data))
//             dispatch(actionCreator(LOADING_ORDER, "payload")(false))
//         })
//         .catch(error => {
//             dispatch(actionCreator(ERROR_ORDER, "payload")(error))
//             dispatch(actionCreator(LOADING_ORDER, "payload")(false))
//         })
//     }
// }



