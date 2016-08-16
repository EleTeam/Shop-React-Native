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
    isLoggedIn: false,
    user: {},
    status: null,
}

let userReducer = (state=initialState, action) => {
    switch (action.type) {
        case types.kUserLoggedDoing:
            return {
                ...state,
                status: 'doing'
            };
        case types.kUserLoggedIn:
            return {
                ...state,
                isLoggedIn: true,
                user: action.user,
                status: 'done'
            }
        case types.kUserLoggedOut:
            return {
                ...state,
                isLoggedIn: false,
                user: {},
                status: null
            }
        case types.kUserLoggedError:
            return {
                ...state,
                isLoggedIn: false,
                user: {},
                status: null
            }
        default:
            return state;
    }
}

export default userReducer;