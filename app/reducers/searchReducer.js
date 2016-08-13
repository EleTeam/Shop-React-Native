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
    history: [],                // 搜索历史
    keywordsList: [],           // 热搜词
    searchText: null,           // 搜索文本
    tags: [],                   // 标签数组
    searchResultList: [],       // 搜索结果
    sortTypesList: [],          // 营养素数组
    currentSortType: null,      // 当前营养素
    currentTag: null,           // 当前tag
    showSortTypeView: false,    // 显示营养素视图
    orderByAsc: false,          // 升降序
    isHealthLight: false,       // 是否推荐食物
    isLoading: true,
    isLoadMore: false,
}

let searchReducer = (state = initialState, action)=> {

    switch (action.type) {
        case types.FETCH_KEYWORDS_LIST:
            return Object.assign({}, state, {
                ...state
            })
        case types.RECEIVE_KEYWORDS_LIST:
            return Object.assign({}, state, {
                keywordsList: action.keywordsList,
                history: action.history,
            })
        case types.FETCH_SEARCH_RESULT_LIST:
            return Object.assign({}, state, {
                tags: [],
                isLoading: action.isLoading,
                isLoadMore: action.isLoadMore,
            })
        case types.RECEIVE_SEARCH_RESULT_LIST:
            return Object.assign({}, state, {
                tags: action.tags,
                searchResultList: state.isLoadMore ? state.searchResultList.concat(action.searchResultList) : action.searchResultList,
                isLoading: false,
            })
        case types.SELECT_KEYWORD:
            return Object.assign({}, state, {
                searchText: action.searchText,
            })
        case types.SETUP_SEARCH_TEXT:
            return Object.assign({}, state, {
                searchText: action.searchText,
            })
        case types.CACHE_HISTORY:
            return Object.assign({}, state, {
                history: action.history,
            })
        case types.CLEAR_HISTORY:
            return Object.assign({}, state, {
                history: []
            })
        case types.CHANGE_SORT_VIEW_STATUS_SEARCH:
            return Object.assign({}, state, {
                showSortTypeView: !state.showSortTypeView,
            })
        case types.RECEIVE_SORT_TYPES_LIST_SEARCH:
            return Object.assign({}, state, {
                sortTypesList: action.sortTypesList
            })
        case types.SELECT_SORT_TYPE_SEARCH:
            return Object.assign({}, state, {
                currentSortType: action.currentSortType
            })
        case types.ORDER_ASC_OR_DESC_SEARCH:
            return Object.assign({}, state, {
                orderByAsc: !state.orderByAsc
            })
        case types.CHANGE_HEALTH_LIGHT_SEARCH:
            return Object.assign({}, state, {
                isHealthLight: !state.isHealthLight
            })
        case types.SELECT_FOOD_TAG:
            return Object.assign({}, state, {
                currentTag: action.currentTag
            })
        case types.RESET_SEARCH_STATE:
            return initialState
        default:
            return state;
    }
}

export default searchReducer;