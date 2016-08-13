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
    food: undefined,
    isFetchingFood: true,
    isShowAllUnit: false,   // 是否展开所有元素
}

let foodInfoReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.FOOD_INFO_FETCH_FOOD:
            return Object.assign({}, state, {
                ...state,
                isFetchingFood: true
            })
        case types.FOOD_INFO_RECEIVE_FOOD:
            return Object.assign({}, state, {
                food: action.food,
                isFetchingFood: false
            })
        case types.FOOD_INFO_CHANGE_SHOW_UNITS_STATUS:
            return Object.assign({}, state, {
                isShowAllUnit: !state.isShowAllUnit
            })
        default:
            return state
    }
}

export default foodInfoReducer;