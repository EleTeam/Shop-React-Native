/**
 * ShopReactNative
 *
 * @author Tony Wong
 * @date 2016-09-27
 * @email 908601756@qq.com
 * @copyright Copyright © 2016 EleTeam
 * @license The MIT License (MIT)
 */

import * as types from '../actions/actionTypes';

const initialState = {
    order: {},
    address: {},
    isLoading: true,
    isOrderCreating: false, //订单是否在创建中
    isTurnToOrderView: false, //是否转向订单查看页
};

let orderReducer = (state=initialState, action) => {
    switch (action.type) {
        case types.kOrderCreate:
            return {
                ...state,
                isLoading: true,
                isOrderCreating: true,
                isTurnToOrderView: false,
            };
        case types.kOrderCreateReceived:
            return {
                ...state,
                ...action,
                isLoading: false,
                isOrderCreating: false,
                isTurnToOrderView: true,
            };
        case types.kOrderIsTurnedToViewFromSync:
            return {
                ...state,
                isLoading: true,
                isOrderCreating: false,
                isTurnToOrderView: false,
            };
        case types.kOrderView:
            return {
                ...state,
                isLoading: true,
                isOrderCreating: false,
                isTurnToOrderView: false,
            };
        case types.kOrderViewReceived:
            return {
                ...state,
                ...action,
                isLoading: false,
                isOrderCreating: false,
                isTurnToOrderView: false,
            };
        default:
            return state;
    }
};

export default orderReducer;