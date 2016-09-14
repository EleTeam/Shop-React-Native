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
    isLoading: true,
    isLoggedIn: false,
    user: {},
};

let userReducer = (state=initialState, action) => {
    switch (action.type) {
        case types.kUserRegister:
            return {
                ...state,
                isLoading: true,
            };
        case types.kUserRegisterReceived:
            return {
                ...state,
                isLoading: false,
                isLoggedIn: true,
                user: action.user,
            };


        case types.kUserLoggedDoing:
            return {
                ...state,
                isLoading: true,
            };
        case types.kUserLoggedIn:
            return {
                ...state,
                isLoggedIn: true,
                user: action.user,
            };
        case types.kUserLoggedOut:
            return {
                ...state,
                isLoggedIn: false,
                user: {},
            }
        case types.kUserLoggedError:
            return {
                ...state,
                isLoggedIn: false,
                user: {},
            }
        default:
            return state;
    }
}

export default userReducer;