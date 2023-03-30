import * as actionTypes from './actions';
import config from './../config';
import { LOADING_PROVIDER, ERROR_PROVIDER, GET_SEARCH_PROVIDER } from "./types/provider";
import storage from "redux-persist/lib/storage";
import { combinereducers } from "@reduxjs/toolkit";
import { persistreducer } from "redux-persist";
import { thunk } from "redux-thunk";
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
    GET_SEARCH_OPERATIONBILL  } from "./types/operationBill";

import {  
        CREATE_ORDER,
        GET_ORDER,
        GET_ALL_ORDER,
        UPDATE_ORDER,
        DELETE_ORDER,
        LOADING_ORDER, 
        ERROR_ORDER,
        GET_SEARCH_ORDER,
        GET_SEARCH_ORDER_PAITOUT  } from "./types/order";

import {  
    CREATE_REVENUE,
    GET_REVENUE,
    GET_ALL_REVENUE,
    UPDATE_REVENUE,
    DELETE_REVENUE,
    LOADING_REVENUE, 
    ERROR_REVENUE,
    GET_SEARCH_REVENUE  } from "./types/revenue";

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
    GET_TURN_FOR_USER  } from "./types/turn";

    import { GET_AUTH, LOADING_AUTH, ERROR_AUTH  } from "./types/auth";



// const persistConfig = {
//     key: 'root',
//     storage,
//     whitelist: ['auth']
// }

// const rootreducer = combinereducers({

// })

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
    errorOrder: '',
    statusCodeOorder: '',
    isLoadingOrder: false,

    revenues: [],
    errorRevenue: [],
    statusCodeRevenue: '',
    isLoadingRevenue: false,
    sumRevenue: null,

    turns: [],
    turn: [],
    errorTurn: '',
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
            // return {
            //     ...state,
            //     operationBills: action.payload.data,
            // }
            return {
                ...state,
                provider: action.payload.data,
                nextPageProvider:action.payload.data.nextPage,
                prevPageProvider:action.payload.data.prevPage
            }
        case actionTypes.CREATE_PROVIDER:
            
            state.provider.push(payload);
        // break;
        case actionTypes.UPDATE_PROVIDER:
            
            const {_id} = action.payload;
            
            const provider = state.provider.find((provider) => provider._id == _id);
            if (provider) {
                provider.address = action.payload.address
                provider.rut = action.payload.rut
                provider.businessName = action.payload.businessName
                provider.web = action.payload.web
                provider.type = action.payload.type
                provider.contactName = action.payload.contactName
                provider.phone = action.payload.phone
                provider.instagran = action.payload.instagran
                provider.description = action.payload.description
                provider.email = action.payload.email
                provider.merchandiseType = action.payload.merchandiseType
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
            
            state.operationBills.push(payload);
        // break;
        case UPDATE_OPERATIONBILL:
            
            const {_idOperation} = action.payload;
            
            const operationBill = state.operationBills.find((operationBill) => operationBill._id == _idOperation);
            if (operationBill) {
                operationBill.address = action.payload.address
                operationBill.rut = action.payload.rut
                operationBill.businessName = action.payload.businessName
                operationBill.web = action.payload.web
                operationBill.type = action.payload.type
                operationBill.contactName = action.payload.contactName
                operationBill.phone = action.payload.phone
                operationBill.instagran = action.payload.instagran
                operationBill.description = action.payload.description
                provider.email = action.payload.email
                provider.merchandiseType = action.payload.merchandiseType
            }
        // eslint-disable-next-line no-fallthrough
        case DELETE_OPERATIONBILL:
            const operationFound = state.operationBills.find(operationBill => operationBill._id === action.payload._id);
            if (operationFound) {
                state.operationBills.splice(state.operationBills.indexOf(operationFound), 1)
            }
            return {
                ...state,
                operationBills: state.operationBills
            }
        case LOADING_OPERATIONBILL:
            return {
                ...state,
                isLoadingProvider: action.payload
            }

        case ERROR_OPERATIONBILL:
            return {
                ...state,
                statusCode: action.payload.status,
                errorProvider: action.payload.message
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
            
            state.orders.push(payload);
        // break;
        case UPDATE_ORDER:
            
            const {_idOrder} = action.payload;
            
            const order = state.orders.find((order) => order._id == _idOrder);
            if (order) {
                // order.address = action.payload.address
                // order.rut = action.payload.rut
                // order.businessName = action.payload.businessName
                // order.web = action.payload.web
                // order.type = action.payload.type
                // order.contactName = action.payload.contactName
                // order.phone = action.payload.phone
                // order.instagran = action.payload.instagran
                // order.description = action.payload.description
                // provider.email = action.payload.email
                // provider.merchandiseType = action.payload.merchandiseType
            }
        // eslint-disable-next-line no-fallthrough
        case DELETE_ORDER:
            const orderFound = state.orders.find(order => order._id === action.payload._id);
            if (orderFound) {
                state.orders.splice(state.orders.indexOf(orderFound), 1)
            }
            return {
                ...state,
                orders: state.orders
            }
        case LOADING_ORDER:
            return {
                ...state,
                isLoadingOrder: action.payload
            }

        case ERROR_ORDER:
            return {
                ...state,
                statusCode: action.payload.status,
                errorOrder: action.payload.message
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
            
            state.turns.push(payload);
        // break;
        case UPDATE_TURN:
            
            const {_idTurn} = action.payload;
            
            const turn = state.turns.find((turn) => turn._id === _idOperation);
            if (turn) {
                turn.initDate = action.payload.initDate
                turn.end = action.payload.endDate
                turn.description = action.payload.description
                turn.status = action.payload.status
                turn.statusPayment = action.payload.statusPayment
                turn.type = action.payload.type
                turn.users = action.payload.users
                turn.paymentDate = action.payload.paymentDate
                provider.workingDay = action.payload.workingDay
            }
        // eslint-disable-next-line no-fallthrough
        case DELETE_TURN:
            const turnFound = state.turns.find(turn => turn._id === action.payload._id);
            if (operationFound) {
                state.turns.splice(state.turns.indexOf(operationFound), 1)
            }
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
                statusCode: action.payload.status,
                errorTurn: action.payload.message
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
            console.log('action.payload.data CREATE_REVENUE', action.payload)
            state.revenues.push(payload);
            return {
                ...state,
                statusCodeRevenue: '200',
            }
        case UPDATE_REVENUE:
            
            const {_idRevenue} = action.payload;
            
            const revenue = state.revenues.find((revenue) => revenue._id == _idRevenue);
            if (revenue) {
                revenue.address = action.payload.address
                revenue.rut = action.payload.rut
                revenue.businessName = action.payload.businessName
                revenue.web = action.payload.web
                revenue.type = action.payload.type
                revenue.contactName = action.payload.contactName
                revenue.phone = action.payload.phone
                revenue.instagran = action.payload.instagran
                revenue.description = action.payload.description
                revenue.email = action.payload.email
                revenue.merchandiseType = action.payload.merchandiseType
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
            return {
                ...state,
                isLoadingRevenue: action.payload
            }
        case ERROR_REVENUE:
            console.log('datos ERROR_REVENUE', action.payload)
            return {
                ...state,
                statusCode: action.payload.status,
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