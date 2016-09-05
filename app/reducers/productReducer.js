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
import {Alert} from 'react-native';

const initialState = {
    categories: [],
    product: {},
    isLoading: true,
};

let productReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.kCategoryListWithProduct:
            return {
                ...state
            };
        case types.kCategoryListWithProductReceived:
            // Alert.alert(action.categories);
            return {
                ...state,
                categories: action.categories,
                isLoading: false,
            };

        case types.kProductView:
            // alert(1);
            return {
                ...state,
                isLoading: true,
            };
        case types.kProductViewReceived:
            // alert(2);
            // Alert.alert(action.product.name);
            return {
                ...state,
                product: action.product,
                isLoading: false,
            };
        default:
            return state;
    }
};

export default productReducer;