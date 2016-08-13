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
import Util from '../common/utils';

export let fetchFoodInfo = (foodCode)=> {

    let URL = `http://food.boohee.com/fb/v1/foods/${foodCode}/mode_show`;

    return dispatch => {
        dispatch(fetchFood());
        
        Util.get(URL, (response) => {
            dispatch(receiveFood(response));
        }, (error) => {alert(error)
            console.log(`Fetch food info error: ${error}`);
            dispatch(receiveFood({}))
        })
    }
}

let fetchFood = ()=> {
    return { type: types.FOOD_INFO_FETCH_FOOD }
}

let receiveFood = (food)=> {
    return {
        type: types.FOOD_INFO_RECEIVE_FOOD,
        food: food
    }
}

export let changeUnitsStatus = ()=> {
    return { type: types.FOOD_INFO_CHANGE_SHOW_UNITS_STATUS }
}