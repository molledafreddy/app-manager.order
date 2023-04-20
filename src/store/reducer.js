import * as actionTypes from './actions';
import config from './../config';
import { LOADING_PROVIDER, ERROR_PROVIDER, GET_SEARCH_PROVIDER } from "./types/provider";
import {  
    CREATE_ACCOUNT,
    GET_ACCOUNT,
    GET_ALL_ACCOUNT,
    UPDATE_ACCOUNT,
    DELETE_ACCOUNT,
    LOADING_ACCOUNT, 
    ERROR_ACCOUNT  } from "./types/account";

import {  
    CREATE_OPERATIONBILL,
    GET_OPERATIONBILL,
    GET_ALL_OPERATIONBILL,
    UPDATE_OPERATIONBILL,
    DELETE_OPERATIONBILL,
    LOADING_OPERATIONBILL, 
    ERROR_OPERATIONBILL,
    GET_SEARCH_OPERATIONBILL,
    UPDATE_CODE_ERROR_OPERATIONBILL  } from "./types/operationBill";

import {  
        CREATE_ORDER,
        GET_ORDER,
        GET_ALL_ORDER,
        UPDATE_ORDER,
        DELETE_ORDER,
        LOADING_ORDER, 
        ERROR_ORDER,
        GET_SEARCH_ORDER,
        GET_SEARCH_ORDER_PAITOUT,
        UPDATE_CODE_ERROR_ORDER  } from "./types/order";

import {  
    CREATE_REVENUE,
    GET_REVENUE,
    GET_ALL_REVENUE,
    UPDATE_REVENUE,
    DELETE_REVENUE,
    LOADING_REVENUE, 
    ERROR_REVENUE,
    GET_SEARCH_REVENUE,
    UPDATE_CODE_ERROR_REVENUES  } from "./types/revenue";

import { GET_ALL_BANK  } from "./types/bank";

import { GET_SEARCH_EGRESS, LOADING_EGRESS, ERROR_EGRESS  } from "./types/egress";

import { GET_ALL_PAYMENTTYPE, GET_SEARCH_PAYMENTTYPE, GET_PAYMENTHASEGRESS  } from "./types/paymentType";

import {  
    CREATE_TURN,
    GET_TURN,
    GET_ALL_TURN,
    UPDATE_TURN,
    DELETE_TURN,
    LOADING_TURN, 
    ERROR_TURN,
    GET_SEARCH_TURN,
    GET_TURN_FOR_USER,
    UPDATE_CODE_ERROR_TURN  } from "./types/turn";

    import { GET_AUTH, LOADING_AUTH, ERROR_AUTH  } from "./types/auth";

const initialState = {
    isOpen: [], //for active default menu
    users: [1,2], // manejo usuarios
    auth: [], // manejo sesion
    isLoadingAuth: false,
    provider: [],
    nextPageProvider:0,
    prevPageProvider: 0,
    errorProvider: '',
    statusCodeProvider: '',
    isLoadingProvider: false,

    accounts: [],
    errorAccount: '',
    statusCodeAccount: '',
    isLoadingAccount: false,
    
    banks: [],
    errorBank: '',
    statusCodeBank: '',
    isLoadingBank: false,

    operationBills: [],
    operationBill: [],
    errorOperationBill: '',
    statusCodeOperationBill: '',
    isLoadingOperationBill: false,
    paymentTypes: [],
    paymentHasEgress: [],

    orders: [],
    orderPaitOuts: [],
    order: [],
    errorOrder: [],
    statusCodeOrder: '',
    isLoadingOrder: false,

    revenues: [],
    errorRevenue: [],
    statusCodeRevenue: '',
    isLoadingRevenue: false,
    sumRevenue: null,

    turns: [],
    turn: [],
    errorTurn: [],
    statusCodeTurn: '',
    isLoadingTurn: false,

    egress: [],
    errorEgress: '',
    statusCodeEgress: '',
    isLoadingEgress: false,
    sumEgress: null,

    isTrigger: [], //for active default menu, set blank for horizontal
    ...config,
    isFullScreen: false, // static can't change
};

const reducer = (state = initialState, action) => {
    let trigger = [];
    let open = [];
    const { payload } = action;

    switch (action.type) {
        case actionTypes.COLLAPSE_MENU:
            return {
                ...state,
                collapseMenu: !state.collapseMenu
            };
        case actionTypes.COLLAPSE_TOGGLE:
            if (action.menu.type === 'sub') {
                open = state.isOpen;
                trigger = state.isTrigger;

                const triggerIndex = trigger.indexOf(action.menu.id);
                if (triggerIndex > -1) {
                    open = open.filter(item => item !== action.menu.id);
                    trigger = trigger.filter(item => item !== action.menu.id);
                }

                if (triggerIndex === -1) {
                    open = [...open, action.menu.id];
                    trigger = [...trigger, action.menu.id];
                }
            } else {
                open = state.isOpen;
                const triggerIndex = (state.isTrigger).indexOf(action.menu.id);
                trigger = (triggerIndex === -1) ? [action.menu.id] : [];
                open = (triggerIndex === -1) ? [action.menu.id] : [];
            }

            return {
                ...state,
                isOpen: open,
                isTrigger: trigger
            };
        case actionTypes.NAV_CONTENT_LEAVE:
            return {
                ...state,
                isOpen: open,
                isTrigger: trigger,
            };
        case actionTypes.NAV_COLLAPSE_LEAVE:
            if (action.menu.type === 'sub') {
                open = state.isOpen;
                trigger = state.isTrigger;

                const triggerIndex = trigger.indexOf(action.menu.id);
                if (triggerIndex > -1) {
                    open = open.filter(item => item !== action.menu.id);
                    trigger = trigger.filter(item => item !== action.menu.id);
                }
                return {
                    ...state,
                    isOpen: open,
                    isTrigger: trigger,
                };
            }
            return {...state};
        case actionTypes.FULL_SCREEN :
            return {
                ...state,
                isFullScreen: !state.isFullScreen
            };
        case actionTypes.FULL_SCREEN_EXIT:
            return {
                ...state,
                isFullScreen: false
            };
        case actionTypes.CHANGE_LAYOUT:
            return {
                ...state,
                layout: action.layout
            };

        case GET_AUTH:
            return {
                ...state,
                authToken: action.payload.data
            }
        case LOADING_AUTH:
            return {
                ...state,
                isLoadingAuth: action.payload
            }

        case ERROR_AUTH:
            // console.log('ERROR_AUTH', action.payload.status)
            return {
                ...state,
                statusCodeAuth: action.payload.status,
                errorAuth: action.payload.message
            }
        //reducers para usuaris
        case actionTypes.REGISTER_USER:
            return [...state, payload];
        case actionTypes.GET_PROVIDER:
            return {
                ...state,
                provider: action.payload.data,
            }
        case actionTypes.GET_ALL_PROVIDER:
            // console.log('llego por aca GET_SEARCH_PROVIDER', action.payload.data)
            // return {
            //     ...state,
            //     operationBills: action.payload.data,
            // }
            return {
                ...state,
                provider: action.payload.data,
            }
        case GET_SEARCH_PROVIDER:
            console.log('llego por aca GET_SEARCH_PROVIDER')
            return {
                ...state,
                provider: action.payload.data,
                nextPageProvider:action.payload.data.nextPage,
                prevPageProvider:action.payload.data.prevPage
            }
        case actionTypes.CREATE_PROVIDER:
            
            state.provider.push(payload);
        // break;
        // eslint-disable-next-line no-fallthrough
        case actionTypes.UPDATE_PROVIDER:
            
            // const {_id} = action.payload;
            
            // const provider = state.provider.find((provider) => provider._id === _id);
            // if (provider) {
            //     provider.address = action.payload.address
            //     provider.rut = action.payload.rut
            //     provider.businessName = action.payload.businessName
            //     provider.web = action.payload.web
            //     provider.type = action.payload.type
            //     provider.contactName = action.payload.contactName
            //     provider.phone = action.payload.phone
            //     provider.instagran = action.payload.instagran
            //     provider.description = action.payload.description
            //     provider.email = action.payload.email
            //     provider.merchandiseType = action.payload.merchandiseType
            // }
            // console.log('state.provider', state.provider)
            state.provider.docs.map(function(prov){
                if(prov._id === action.payload._id){
                    // console.log('action.payload', action.payload._id)
                    // console.log('provider', prov._id)
                    // console.log('contactName', action.payload.contactName)
                    prov.address = action.payload.address
                    prov.rut = action.payload.rut
                    prov.businessName = action.payload.businessName
                    prov.web = action.payload.web
                    prov.type = action.payload.type
                    prov.contactName = action.payload.contactName
                    prov.phone = action.payload.phone
                    prov.instagran = action.payload.instagran
                    prov.description = action.payload.description
                    prov.email = action.payload.email
                    prov.merchandiseType = action.payload.merchandiseType
                }
                // console.log('prov', prov)
                return prov;
            });
            return {
                ...state,
                statusCodeProvider: '200'
            }
        case actionTypes.DELETE_PROVIDER:
            const providerFound = state.provider.find(provider => provider._id === action.payload._id);
            if (providerFound) {
                state.provider.splice(state.provider.indexOf(providerFound), 1)
            }
            return {
                ...state,
                provider: state.provider
            }
        case LOADING_PROVIDER:
            return {
                ...state,
                isLoadingProvider: action.payload
            }

        case ERROR_PROVIDER:
            return {
                ...state,
                statusCode: action.payload.status,
                errorProvider: action.payload.message
            }

        case GET_ACCOUNT:
            return {
                ...state,
                accounts: action.payload.data,
            }
        case GET_ALL_ACCOUNT:
            // console.log('data GET_ALL_ACCOUNT', action.payload.data)
            return {
                ...state,
                accounts: action.payload.data,
            }
        case CREATE_ACCOUNT:
            
            state.accounts.push(payload);
        // break;
        // eslint-disable-next-line no-fallthrough
        case UPDATE_ACCOUNT:
            
            const {idAccount} = action.payload;
            
            const account = state.accounts.find((account) => account._id == idAccount);
            if (account) {
                account.number = action.payload.number
                account.type = action.payload.type
                account.email = action.payload.email
                account.banks = action.payload.banks
                account.provider = action.payload.provider
            }
        case DELETE_ACCOUNT:
            const accountFound = state.accounts.find(account => account._id === action.payload._id);
            if (accountFound) {
                state.accounts.splice(state.accounts.indexOf(accountFound), 1)
            }
            return {
                ...state,
                accounts: state.accounts
            }
        case LOADING_ACCOUNT:
            return {
                ...state,
                isLoadingProvider: action.payload
            }

        case ERROR_ACCOUNT:
            return {
                ...state,
                statusCode: action.payload.status,
                erroAccount: action.payload.message
            }
        case GET_ALL_BANK:
            return {
                ...state,
                banks: action.payload.data,
            }
        case GET_OPERATIONBILL:
            return {
                ...state,
                operationBills: action.payload.data,
            }
        case GET_ALL_OPERATIONBILL:
            return {
                ...state,
                operationBills: action.payload.data,
            }
        case GET_SEARCH_OPERATIONBILL:
            return {
                ...state,
                operationBills: action.payload.data,
            }
        case CREATE_OPERATIONBILL:
            // state.operationBills.push(payload);
            // state.statusCodeOperationBill = '200';
            return {
                ...state,
                operationBills: payload,
                statusCodeOperationBill: '200',
            }
        // break;
        // eslint-disable-next-line no-fallthrough
        case UPDATE_OPERATIONBILL:
            
            state.operationBills.docs.map(function(operationBill){
                if(operationBill._id === action.payload._id){
                    operationBill.address = action.payload.address
                    operationBill.rut = action.payload.rut
                    operationBill.businessName = action.payload.businessName
                    operationBill.web = action.payload.web
                    operationBill.type = action.payload.type
                    operationBill.contactName = action.payload.contactName
                    operationBill.phone = action.payload.phone
                    operationBill.instagran = action.payload.instagran
                    operationBill.description = action.payload.description
                }
                return operationBill;
              });
            return {
                ...state,
                statusCodeOperationBill: '200'
            }
        case DELETE_OPERATIONBILL:
            const operationFound = state.operationBills.docs.find(operationBill => operationBill._id === action.payload._id);
            if (operationFound) {
                state.operationBills.docs.splice(state.operationBills.docs.indexOf(operationFound), 1)
            }
            return {
                ...state,
                operationBills: state.operationBills
            }
        case LOADING_OPERATIONBILL:
            return {
                ...state,
                isLoadingOperationBill: action.payload
            }
        case UPDATE_CODE_ERROR_OPERATIONBILL:
            return {
                ...state,
                statusCodeOperationBill: '',
            }
        case ERROR_OPERATIONBILL:
            return {
                ...state,
                statusCode: action.payload.status,
                errorOperationBill: action.payload,
                statusCodeOperationBill: '500',
            }
        case GET_PAYMENTHASEGRESS:
            return {
                ...state,
                paymentHasEgress: action.payload.data,
            }    

        case GET_SEARCH_PAYMENTTYPE:
            return {
                ...state,
                paymentTypes: action.payload.data,
            }
        case GET_ALL_PAYMENTTYPE:
            return {
                ...state,
                paymentTypes: action.payload.data,
            }
        
        case GET_ORDER:
            return {
                ...state,
                orders: action.payload.data,
            }
        case GET_ALL_ORDER:
            return {
                ...state,
                orders: action.payload.data,
            }
        case GET_SEARCH_ORDER:
            return {
                ...state,
                orders: action.payload.data,
            }
        case GET_SEARCH_ORDER_PAITOUT:
            return {
                ...state,
                orderPaitOuts: action.payload.data,
            }
        case CREATE_ORDER:
            return {
                ...state,
                orders: payload,
                statusCodeOrder: '200'
            }
        case UPDATE_ORDER:
            
            state.orders.docs.map(function(order){
                if(order._id === action.payload._id){
                    order.descriptionOrder = action.payload.descriptionOrder
                    order.estimatedAmount = action.payload.estimatedAmount
                    order.address = action.payload.address
                    order.description = action.payload.description
                    order.egress= action.payload.egress
                    order.orderDate = action.payload.orderDate
                    order.paymentMethod = action.payload.paymentMethod
                    order.providers = action.payload.providers
                    order.status = action.payload.status
                    order._id = action.payload._id
                }
                return order;
            });
            return {
                ...state,
                statusCodeOrder: '200',
        }
        case DELETE_ORDER:
            // const orderFound = state.orders.docs.find(order => order._id === action.payload._id);
            // if (orderFound) {
            //     state.orders.splice(state.orders.indexOf(orderFound), 1)
            // }
            // return {
            //     ...state,
            //     orders: state.orders
            // }
        // eslint-disable-next-line no-fallthrough
        case LOADING_ORDER:
            console.log('LOADING_ORDER', action.payload)
            return {
                ...state,
                isLoadingOrder: action.payload
            }
        // eslint-disable-next-line no-duplicate-case
        case UPDATE_CODE_ERROR_ORDER:
            return {
                ...state,
                statusCodeOrder: '',
            }
        case ERROR_ORDER:
            return {
                ...state,
                statusCode: action.payload.status,
                errorOrder: action.payload.message,
                statusCodeOrder: '500',
            } 
            
        
        case GET_TURN:
            return {
                ...state,
                turns: action.payload.data,
            }
        case GET_ALL_TURN:
            return {
                ...state,
                turns: action.payload.data,
            }
        case GET_SEARCH_TURN:
            return {
                ...state,
                turns: action.payload.data,
            }
        case GET_TURN_FOR_USER:
            return {
                ...state,
                turns: action.payload.data,
            }
        case CREATE_TURN:
            
            // state.turns.push(payload);
            return {
                ...state,
                turns: payload,
                statusCodeTurn: '200'
            }
        // break;
        // eslint-disable-next-line no-fallthrough
        case UPDATE_TURN:
            
            state.turns.docs.map(function(turn){
                if(turn._id === action.payload._id){
                    turn.initDate = action?.payload?.initDate
                    turn.end = action?.payload?.endDate
                    turn.description = action?.payload?.description
                    turn.status = action?.payload?.status
                    turn.statusPayment = action?.payload?.statusPayment
                    turn.type = action?.payload?.type
                    turn.users = action?.payload?.users
                    turn.paymentDate = action?.payload?.paymentDate
                    turn.workingDay = action?.payload?.workingDay
                }
                return turn;
            });
            return {
                ...state,
                statusCodeTurn: '200',
            }
        // eslint-disable-next-line no-fallthrough
        case DELETE_TURN:
            // const turnFound = state.turns.find(turn => turn._id === action.payload._id);
            // if (operationFound) {
            //     state.turns.splice(state.turns.indexOf(operationFound), 1)
            // }
            return {
                ...state,
                turns: state.turns
            }
        case LOADING_TURN:
            return {
                ...state,
                isLoadingTurn: action.payload
            }

        case ERROR_TURN:
            return {
                ...state,
                statusCode: action.payload?.codeHttp,
                errorTurn: action.payload,
                statusCodeTurn: action.payload?.codeHttp
            }
        case UPDATE_CODE_ERROR_TURN:
            return {
                ...state,
                statusCodeTurn: '',
            }
        case GET_REVENUE:
            return {
                ...state,
                revenues: action.payload.data,
            }
        case GET_ALL_REVENUE:
            return {
                ...state,
                revenues: action.payload.data,
            }
        case GET_SEARCH_REVENUE:
            return {
                ...state,
                revenues: action.payload.data,
            }
        case CREATE_REVENUE:
            // console.log('action.payload.data CREATE_REVENUE', action.payload)
            // state.revenues.push(payload);
            return {
                ...state,
                revenues: payload,
                statusCodeRevenue: '200'
            }
        case UPDATE_REVENUE:
            console.log('datos', action.payload.users)
            state.revenues.docs.map(function(revenue){
                if(revenue._id === action.payload._id){
                    revenue.amountCash = action.payload.amountCash
                    revenue.amountOther = action.payload.amountOther
                    revenue.amountPos = action.payload.amountPos
                    revenue.amountSistem = action.payload.amountSistem
                    revenue.amountTransfer = action.payload.amountTransfer
                    revenue.cashFund = action.payload.cashFund
                    revenue.createdAt = action.payload.createdAt
                    revenue.description = action.payload.description
                    revenue.files = action.payload.files
                    revenue.totalAmount = action.payload.totalAmount
                    revenue.turn = action.payload.turn
                    revenue.type = action.payload.type
                    revenue.updatedAt = action.payload.updatedAt
                    // revenue.users = action.payload.users
                    revenue.workingDay = action.payload.workingDay
                    revenue._id = action.payload._id
                }
                return revenue;
              });
            return {
                ...state,
                statusCodeRevenue: '200',
            }
        case DELETE_REVENUE:
            const revenueFound = state.revenues.find(revenue => revenue._id === action.payload._id);
            if (revenueFound) {
                state.revenues.splice(state.revenues.indexOf(revenueFound), 1)
            }
            return {
                ...state,
                revenues: state.revenues
            }
        case LOADING_REVENUE:
            // console.log('LOADING_REVENUE', action.payload)
            return {
                ...state,
                isLoadingRevenue: action.payload
            }
        case UPDATE_CODE_ERROR_REVENUES:
            console.log('llego por aca UPDATE_CODE_ERROR_REVENUE')
            return {
                ...state,
                statusCodeRevenue: '',
            }
        case ERROR_REVENUE:
            // console.log('datos ERROR_REVENUE', action.payload)
            return {
                ...state,
                statusCode: action.payload.codeHttp,
                errorRevenue: action.payload,
                statusCodeRevenue: '400',
            }
        case GET_SEARCH_EGRESS:
            return {
                ...state,
                egress: action.payload.data,
            }
        case LOADING_EGRESS:
            return {
                ...state,
                isLoadingEgress: action.payload
            }
        case ERROR_EGRESS:
            return {
                ...state,
                statusCode: action.payload.status,
                errorEgress: action.payload.message
            }
        
        default:
            return state;
    }
};

export default reducer;