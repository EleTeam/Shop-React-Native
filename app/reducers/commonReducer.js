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
    isToasting: false,
};

let commonReducer = (state=initialState, action) => {
    switch (action.type) {
        case types.kCommonIsToasting:
            return {
                ...state,
                isToasting: action.isToasting,
            };
        default:
            return state;
    }
};

export default commonReducer;