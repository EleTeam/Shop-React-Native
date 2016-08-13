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
    rightFood: undefined,       // 右边食物
    rightFoodBrief: undefined,  // 右边食物营养元素对象
    rightFoodBriefNames: [],    // 右边食物营养元素名称数组

    leftFood: undefined,        // 左边食物
    leftFoodBrief: undefined,   // 左边食物营养元素对象
    leftFoodBriefNames: [],     // 左边食物营养元素名称数组
}

let foodCompareReducer = (state = initialState, action)=> {

    switch (action.type) {
        case types.SELECT_COMPARE_FOOD:
            return Object.assign({}, state, {
                rightFood: action.rightFood ? action.rightFood : state.rightFood,
                leftFood: action.leftFood ? action.leftFood : state.leftFood,
            })
        case types.CLEAR_COMPARE_FOOD:

            // 左边食物、营养元素对象、营养元素名称数组
            let leftFood = action.position === 'Left' ? undefined : state.leftFood;
            let leftBrief = action.position === 'Left' ? undefined : state.leftFoodBrief;
            let leftBriefNames = action.position === 'Left' ? [] : state.leftFoodBriefNames;

            // 右边食物、营养元素对象、营养元素名称数组
            let rightFood = action.position === 'Right' ? undefined : state.rightFood;
            let rightBrief = action.position === 'Right' ? undefined : state.rightFoodBrief;
            let rightBriefNames = action.position === 'Right' ? [] : state.rightFoodBriefNames;

            return Object.assign({}, state, {
                rightFood: rightFood,
                rightFoodBrief: rightBrief,
                rightFoodBriefNames: rightBriefNames,
                leftFood: leftFood,
                leftFoodBrief: leftBrief,
                leftFoodBriefNames: leftBriefNames
            })
        case types.FETCH_FOOD_BRIEF:
            return Object.assign({}, state, {
                ...state
            })
        case types.RECEIVE_FOOD_BRIEF:

            // 左边食物营养元素对象
            let leftFoodBrief = action.position === 'Left' ? action.brief : state.leftFoodBrief;
            let leftNames  = [];
            if (leftFoodBrief) {
                leftFoodBrief.nutrition.map(data => {
                    leftNames.push(data.name)
                })
            }

            // 右边食物营养元素对象
            let rightFoodBrief = action.position === 'Right' ? action.brief : state.rightFoodBrief;
            let rightNames  = [];
            if (rightFoodBrief) {
                rightFoodBrief.nutrition.map(data => {
                    rightNames.push(data.name)
                })
            }

            return Object.assign({}, state, {
                leftFoodBrief: leftFoodBrief,
                leftFoodBriefNames: leftNames,
                rightFoodBrief: rightFoodBrief,
                rightFoodBriefNames: rightNames,
            })
        case types.FOOD_COMPARE_RESET_STATE:
            return initialState
        default:
            return state
    }
}

export default foodCompareReducer;