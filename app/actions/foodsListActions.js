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

export let fetchFoods = (kind, value, order_by, page, order_asc, isLoadMore, isLoading, sub_value)=> {

    if (sub_value == undefined) sub_value = '';

    let URL = 'http://food.boohee.com/fb/v1/foods?kind=' + kind + '&value=' + value + '&order_by=' + order_by + '&page=' + page + '&order_asc=' + order_asc + '&sub_value=' + sub_value;

    return dispatch => {
        dispatch(fetchFoodsList(isLoadMore, isLoading));

        Util.get(URL, (response) => {
            dispatch(receiveFoodsList(response.foods))
        }, (error) => {
            console.log('Fetch foods list error: ' + error);
            dispatch(receiveFoodsList([]))
        })
    }
}

let fetchFoodsList = (isLoadMore, isLoading)=> {
    return {
        type: types.FETCH_FOODS_LIST,
        isLoadMore: isLoadMore,
        isLoading: isLoading,
    }
}

let receiveFoodsList = (foods)=> {
    return {
        type: types.RECEIVE_FOODS_LIST,
        foodsList: foods,
    }
}

export let fetchSortTypes = ()=> {
    let URL = 'http://food.boohee.com/fb/v1/foods/sort_types';

    return dispatch => {
        dispatch(fetchSortTypesList());
        
        Util.get(URL, (response) => {
            dispatch(receiveSortTypesList(response.types));
        }, (error) => {
            console.log('Fetch sort types error: ' + error);
            dispatch(receiveSortTypesList([]))
        })
    }
}

let fetchSortTypesList = ()=> {
    return {
        type: types.FETCH_SORT_TYPES_LIST,
    }
}

let receiveSortTypesList = (sortTypes)=> {
    return {
        type: types.RECEIVE_SORT_TYPES_LIST,
        sortTypesList: sortTypes,
    }
}

export let selectSortType = (type)=> {
    return {
        type: types.SELECT_SORT_TYPE,
        currentSortType: type
    }
}

export let changeSortViewStatus = ()=> {
    return {
        type: types.CHANGE_SORT_VIEW_STATUS,
    }
}

export let changeOrderAscStatus = ()=> {
    return {
        type: types.ORDER_ASC_OR_DESC,
    }
}

export let changeSubcategoryViewStatus = ()=> {
    return {
        type: types.CHANGE_SUBCATEGORY_STATUS,
    }
}

export let selectSubcategory = (subcategory)=> {
    return {
        type: types.SELECT_SUBCATEGORY,
        currentSubcategory: subcategory,
    }
}

export let resetState = ()=> {
    return {
        type: types.RESET_FOODS_LIST_STATE,
    }
}