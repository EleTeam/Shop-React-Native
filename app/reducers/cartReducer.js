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
        case types.kCartView:
            return {
                ...state,
                isLoading: true,
            };
        case types.kCartViewReceived:
            return {
                ...state,
                cartItems: action.cartItems,
                isLoading: false,
            };
        default:
            return state;
    }
};

export default cartReducer;