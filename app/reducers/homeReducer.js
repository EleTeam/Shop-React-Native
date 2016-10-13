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
    banners: [],
    articles: [],
    isLoading: true,
    isLoadMore: false,
    isRefreshing: false,
};

let homeReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.kBannerList:
            return {
                ...state,
            };
        case types.kBannerListReceived:
            return {
                ...state,
                banners: action.banners,
            };
        case types.kHomeListArticles:

            return Object.assign({}, state, {
                isLoadMore: action.isLoadMore,
                isRefreshing: action.isRefreshing,
                isLoading: action.isLoading,
            });
        case types.kHomeListArticlesReceived:
            return {
                ...state,
                //articles: action.articles,
                articles: action.articles.length > 0 ? state.articles.concat(action.articles) : state.articles,
                isLoading: false,
                isRefreshing: false,
            };
        default:
            return state;
    }
};

export default homeReducer;