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
import UserDefaults from '../common/UserDefaults';
import Common from '../common/constants';

// 请求热搜关键词
export let fetchKeywords = ()=> {

    let URL = 'http://food.boohee.com/fb/v1/keywords';

    return dispatch => {
        dispatch(fetchKeywordsList());

        Util.get(URL, (response) => {
            // 已缓存的搜索记录
            UserDefaults.cachedObject(Common.storeKeys.SEARCH_HISTORY_KEY)
                .then((historyKeywords)=> {
                    let history = historyKeywords ? historyKeywords : [];

                    dispatch(receiveKeywordsList(history, response.keywords));

                });
        }, (error) => {
            console.log('Fetch keywords error: ' + error);
            dispatch(receiveKeywordsList([], []));
        })
    }
}

let fetchKeywordsList = ()=> {
    return {
        type: types.FETCH_KEYWORDS_LIST,
    }
}

let receiveKeywordsList = (history, keywords)=> {
    return {
        type: types.RECEIVE_KEYWORDS_LIST,
        history: history,
        keywordsList: keywords,
    }
}

// 请求搜索结果
export let fetchSearchResults = (keyword, ...params)=> {

    // 请求参数:q、order_asc、page、order_by、health_mode(血糖)、health_light(推荐)、tags
    // http://food.boohee.com/fb/v1/search?page=1&order_asc=asc&q=&tags=&order_by=calory&health_mode=1

    const [page, order_by, order_asc, tags, health_light, isLoadMore, isLoading, health_mode] = params;

    // let URL = 'http://food.boohee.com/fb/v1/search?page=' + page + '&order_asc=' + order_asc + '&q=' + keyword;
    let URL = 'http://food.boohee.com/fb/v1/foods/extra_search?page=' + page +
        '&order_asc=' + order_asc + '&q=' + keyword + '&tags=' + tags;

    // 如无参数则不拼接
    if (order_by) URL += '&order_by=' + order_by;
    if (health_light) URL += '&health_light=' + health_light;
    if (health_mode) URL += '&health_mode=' + health_mode;
    console.log(URL)

    return dispatch => {
        dispatch(fetchSearchResultList(isLoading, isLoadMore));

        Util.get(URL, (response) => {

            dispatch(receiveSearchResultList(response.tags, response.foods));

        }, (error) => {
            console.log('Fetch search result error: ' + error);
            dispatch(receiveSearchResultList([], []))
        })
    }
}

let fetchSearchResultList = (isLoading, isLoadMore)=> {
    return {
        type: types.FETCH_SEARCH_RESULT_LIST,
        isLoading: isLoading,
        isLoadMore: isLoadMore
    }
}

let receiveSearchResultList = (tags, foods)=> {
    return {
        type: types.RECEIVE_SEARCH_RESULT_LIST,
        tags: tags,
        searchResultList: foods,
    }
}

export let selectKeyword = (keyword)=> {

    return dispatch => {
        dispatch(setupSearchText(keyword))

        // 已缓存的搜索记录
        UserDefaults.cachedObject(Common.storeKeys.SEARCH_HISTORY_KEY)
            .then((historyKeywords)=> {

                let history = historyKeywords ? historyKeywords : [];

                // 缓存中已有该搜索记录
                if (history.indexOf(keyword) != -1) return;

                history.push(keyword);

                UserDefaults.setObject(Common.storeKeys.SEARCH_HISTORY_KEY, history);

                dispatch(cacheHistory(history))
            });
    }
}

export let resetState = ()=> {
    return {
        type: types.RESET_SEARCH_STATE,
    }
}

export let setupSearchText = (text)=> {
    return {
        type: types.SETUP_SEARCH_TEXT,
        searchText: text,
    }
}

// 添加搜索记录
let cacheHistory = (history)=> {
    return {
        type: types.CACHE_HISTORY,
        history: history,
    }
}

// 清除搜索历史
export let clearHistory = ()=> {
    UserDefaults.clearCachedObject(Common.storeKeys.SEARCH_HISTORY_KEY);

    return {
        type: types.CLEAR_HISTORY,
    }
}

export let changeSortViewStatus = ()=> {
    return {
        type: types.CHANGE_SORT_VIEW_STATUS_SEARCH,
    }
}

export let changeOrderAscStatus = ()=> {
    return {
        type: types.ORDER_ASC_OR_DESC_SEARCH,
    }
}

export let changeHealthLight = ()=> {
    return {
        type: types.CHANGE_HEALTH_LIGHT_SEARCH,
    }
}

export let selectSortType = (type)=> {
    return {
        type: types.SELECT_SORT_TYPE_SEARCH,
        currentSortType: type
    }
}

export let selectFoodTag = (tag)=> {
    return {
        type: types.SELECT_FOOD_TAG,
        currentTag: tag,
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
        type: types.FETCH_SORT_TYPES_LIST_SEARCH,
    }
}

let receiveSortTypesList = (sortTypes)=> {

    if (sortTypes.length > 0) {
        sortTypes.splice(0, 0, {name: '常见'})
    }

    return {
        type: types.RECEIVE_SORT_TYPES_LIST_SEARCH,
        sortTypesList: sortTypes,
    }
}

export let selectCompareFood = (food, position)=> {
    // 选择对比食物,请求食物营养元素信息
    let URL = 'http://food.boohee.com/fb/v1/foods/' + food.code + '/brief?';

    return dispatch => {
        dispatch(selectFood(food, position));
        dispatch(fetchBrief())

        Util.get(URL, response => {
            dispatch(receiveBrief(response, position))
        }, error => {
            console.log('Fetch food brief error: ' + error);
            dispatch(receiveBrief({}))
        })
    }
}

let fetchBrief = ()=> {
    return { type: types.FETCH_FOOD_BRIEF }
}

let receiveBrief = (brief, position)=> {
    return {
        type: types.RECEIVE_FOOD_BRIEF,
        brief: brief,
        position: position
    }
}

let selectFood = (food, position)=> {

    if (position === 'Left') {
        return {
            type: types.SELECT_COMPARE_FOOD,
            leftFood: food
        }
    }
    return {
        type: types.SELECT_COMPARE_FOOD,
        rightFood: food
    }
}