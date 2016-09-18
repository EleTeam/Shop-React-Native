/**
 * ShopReactNative
 *
 * @author Tony Wong
 * @date 2016-08-13
 * @email 908601756@qq.com
 * @copyright Copyright © 2016 EleTeam
 * @license The MIT License (MIT)
 */

import * as types from '../actions/actionTypes';

const initialState = {
    status: false,
    code: 0,
    message: '',
    user: {},
    share: {},
    isLoading: false,
    isLoggedIn: false,
};

let userReducer = (state=initialState, action) => {
    switch (action.type) {
        case types.kUserFromSync:
            return {
                ...state,
                ...action,
            };
        case types.kUserRegister:
            return {
                ...state,
                isLoading: true,
            };
        case types.kUserRegisterReceived:
            var isLoggedIn = state.isLoggedIn;
            if (action.status) {
                isLoggedIn = true;
            }
            return {
                ...state,
                ...action,
                isLoading: false,
                isLoggedIn: isLoggedIn,
            };
        case types.kUserLogin:
            return {
                ...state,
                isLoading: true,
            };
        case types.kUserLoginReceived:
            var isLoggedIn = state.isLoggedIn;
            if (action.status) {
                isLoggedIn = true;
            }
            return {
                ...state,
                ...action,
                isLoading: false,
                isLoggedIn: isLoggedIn,
            };
        case types.kUserLogout:
            return {
                ...state,
                isLoading: true,
            };
        case types.kUserLogoutReceived:
            var isLoggedIn = state.isLoggedIn;
            if (action.status) {
                isLoggedIn = false;
            }
            return {
                ...state,
                ...action,
                isLoading: false,
                isLoggedIn: isLoggedIn,
            };
        default:
            return state;
    }
};

export default userReducer;