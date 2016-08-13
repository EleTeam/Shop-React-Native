/**
 * ShopReactNative
 *
 * @author Tony Wong
 * @date 2016-08-13
 * @email 908601756@qq.com
 * @copyright Copyright © 2016 EleTeam
 * @license The MIT License (MIT)
 */

import * as types from './actionTypes';

export let clearCompareFood = (position)=> {
    return {
        type: types.CLEAR_COMPARE_FOOD,
        position: position
    }
}

export let resetState = ()=> {
    return { type: types.FOOD_COMPARE_RESET_STATE }
}