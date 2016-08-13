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
    // 食物分类数组
    foodsList: [],
    // 营养素数组
    sortTypesList: [],
    // 当前营养素
    currentSortType: null,
    // 显示营养素视图
    showSortTypeView: false,
    // 升降序
    orderByAsc: false,
    // 显示子分类视图
    showSubcategoryView: false,
    // 当前子分类
    currentSubcategory: null,
    isLoading: true,
    isLoadMore: false,
}

let foodsListReducer = (state = initialState, action)=> {
    
    switch (action.type) {
        case types.FETCH_FOODS_LIST:
            return Object.assign({}, state, {
                isLoading: action.isLoading,
                isLoadMore: action.isLoadMore,
            })
        case types.RECEIVE_FOODS_LIST: 
            return Object.assign({}, state, {
                foodsList: state.isLoadMore ? state.foodsList.concat(action.foodsList) : action.foodsList,
                isLoading: false,
            })
        case types.FETCH_SORT_TYPES_LIST:
            return Object.assign({}, state, {
                ...state,
            })
        case types.RECEIVE_SORT_TYPES_LIST: 
            return Object.assign({}, state, {
                sortTypesList: action.sortTypesList,
            })
        case types.SELECT_SORT_TYPE:
            return Object.assign({}, state, {
                currentSortType: action.currentSortType,
            })
        case types.CHANGE_SORT_VIEW_STATUS:
            return Object.assign({}, state, {
                showSortTypeView: !state.showSortTypeView
            })
        case types.ORDER_ASC_OR_DESC:
            return Object.assign({}, state, {
                orderByAsc: !state.orderByAsc,
            })
        case types.CHANGE_SUBCATEGORY_STATUS:
            return Object.assign({}, state, {
                showSubcategoryView: !state.showSubcategoryView,
            })
        case types.SELECT_SUBCATEGORY:
            return Object.assign({}, state, {
                currentSubcategory: action.currentSubcategory,
                showSubcategoryView: false,
            })
        case types.RESET_FOODS_LIST_STATE:
            return initialState
        default:
            return state
    }
}

export default foodsListReducer;