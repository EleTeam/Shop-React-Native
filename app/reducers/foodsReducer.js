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
    categoryList: [],
    isLoading: true,
}

let foodsReducer = (state = initialState, action)=>{
    
    switch (action.type) {
        case types.FETCH_CATEGORY_LIST:
            return Object.assign({}, state, {
                ...state,
            })
        case types.RECEIVE_CATEGORY_LIST:
            return Object.assign({}, state, {
                categoryList: action.categoryList,
                isLoading: false,
            })
        default:
            return state
    }
}

export default foodsReducer;