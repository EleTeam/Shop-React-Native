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
    categories: [],
    isFetching: true,
}

let productReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.kCategoryListWithProduct:
            return Object.assign({}, state, {
                ...state,
                isFetching: true
            })
        case types.kCategoryListWithProductDone:
            return Object.assign({}, state, {
                categories: action.categories,
                isFetching: false
            })
        default:
            return state
    }
}

export default productReducer;