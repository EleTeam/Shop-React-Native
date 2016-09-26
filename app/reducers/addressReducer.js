/**
 * ShopReactNative
 *
 * @author Tony Wong
 * @date 2016-09-24
 * @email 908601756@qq.com
 * @copyright Copyright © 2016 EleTeam
 * @license The MIT License (MIT)
 */

import * as types from '../actions/actionTypes';

const initialState = {
    addresses: [],
    address: {},
    isLoading: true,
    isToasting: false,
};

let addressReducer = (state=initialState, action) => {
    switch (action.type) {
        case types.kAddressIsToasting:
            return {
                ...state,
                isToasting: action.isToasting,
            };
        case types.kAddressList:
            return {
                ...state,
                isLoading: true
            };
        case types.kAddressListReceived:
            return {
                ...state,
                ...action,
                isLoading: false
            };
        case types.kAddressCreate:
            return {
                ...state,
                isLoading: true
            };
        case types.kAddressCreateReceived:
            return {
                ...state,
                isLoading: true
            };
        case types.kAddressDelete:
            return {
                ...state,
                isLoading: true
            };
        case types.kAddressDeleteReceived:
            return {
                ...state,
                isLoading: true
            };
        default:
            return state;
    }
};

export default addressReducer;