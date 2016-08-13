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
    bannerList: [],
    feedList: [],
    isLoading: true,
    isLoadMore: false,
    isRefreshing: false,
};

let strollingReducer = (state = initialState, action) => {
   
    switch (action.type) {
        case types.FETCH_BANNER_LIST:
            return {
                ...state,
            }
        case types.RECEIVE_BANNER_LIST:
            return Object.assign({}, state, {
                bannerList: action.bannerList,
            })
        case types.FETCH_FEED_LIST:
            return Object.assign({}, state, {
                isLoadMore: action.isLoadMore,
                isRefreshing: action.isRefreshing,
                isLoading: action.isLoading,
            })
        case types.RECEIVE_FEED_LIST:
            return Object.assign({}, state, {
                feedList: state.isLoadMore ? state.feedList.concat(action.feedList) : action.feedList,
                isRefreshing: false,
                isLoading: false,
            })
        default:
            return state;
    }
}

export default strollingReducer;