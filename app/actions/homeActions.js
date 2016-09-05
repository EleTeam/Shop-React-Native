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
import * as urls from '../common/constants_url';

export let bannerList = ()=> {
    let url = urls.kUrlBannerList;

    return dispatch => {
        // 请求轮播数据
        dispatch({type: types.kBannerList});
        return Util.get(url, (response) => {
            dispatch({type: types.kBannerListReceived, bannerList: response.data.banners});
        }, (error) => {
            // console.log('Fetch banner list error: ' + error);
            // dispatch({'type': types.kActionError});
        });
    }
};

//异步调用服务端
export let fetchFeeds = (page, isLoadMore, isRefreshing, isLoading)=> {
    let URL = 'http://food.boohee.com/fb/v1/feeds?page=' + page + '&per=10';
    return dispatch => {
        // 请求轮播数据
        dispatch(fetchFeedList(isLoadMore, isRefreshing, isLoading));

        return Util.get(URL, (response) => {
            dispatch(receiveFeedList(response.feeds));
        }, (error) => {
            dispatch(receiveFeedList([]));
        });

        //模拟网络延迟
        // function fetching() {
        //     Util.get(URL, (response) => {
        //         dispatch(receiveFeedList(response.feeds));
        //     }, (error) => {
        //         dispatch(receiveFeedList([]));
        //     });
        // }
        // setTimeout(fetching, 3000);
    }
}

let fetchFeedList = (isLoadMore, isRefreshing, isLoading)=> {
    return {
        type: types.FETCH_FEED_LIST,
        isLoadMore: isLoadMore,
        isRefreshing: isRefreshing,
        isLoading: isLoading,
    }
}

let receiveFeedList = (feeds) => {
    return {
        type: types.RECEIVE_FEED_LIST,
        feedList: feeds,
    }
}