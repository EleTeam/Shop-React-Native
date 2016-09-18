/**
 * ShopReactNative
 *
 * @author Tony Wong
 * @date 2016-09-11
 * @email 908601756@qq.com
 * @copyright Copyright © 2016 EleTeam
 * @license The MIT License (MIT)
 */

import * as types from '../actions/actionTypes';
const initialState = {
    cartItems: [],
    cart_num: 0,
    app_cart_cookie_id: '',
    isLoading: true,
};

/**
 * 购物车reducer
 * @param state
 * @param action
 * @returns {*}
 */
let cartReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.kAppCartCookieIdFromSync:
            return {
                ...state,
                ...action,
            };
        case types.kCartNumFromSync:
            return {
                ...state,
                ...action,
            };
        case types.kCartView:
            return {
                ...state,
                isLoading: true,
            };
        case types.kCartViewReceived:
            return {
                ...state,
                ...action,
                isLoading: false,
            };
        case types.kCartAdd:
            return {
                ...state,
                isLoading: true,
            };
        case types.kCartAddReceived:
            return {
                ...state,
                ...action,
                isLoading: false,
            };
        default:
            return state;
    }
};

export default cartReducer;