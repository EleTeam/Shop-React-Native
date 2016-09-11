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
        return Util.get(url,
            (response) => {
                dispatch({type: types.kBannerListReceived, bannerList: response.data.banners});
            },
            (error) => {
                // console.log('Fetch banner list error: ' + error);
                dispatch({'type': types.kActionError});
                alert('Android要用外网地址');
            }
        );
    }
};

//异步调用服务端
export let homeListArticles = (page, isLoadMore, isRefreshing, isLoading)=> {
    let url = urls.kUrlHomeListArticles + '?page=' + page;
    return dispatch => {
        // 请求轮播数据
        dispatch({
            type: types.kHomeListArticles,
            isLoadMore: isLoadMore,
            isRefreshing: isRefreshing,
            isLoading: isLoading,
        });

        return Util.get(url, (response) => {
            dispatch({type:types.kHomeListArticlesReceived, feedList:response.data.articles});
            // alert(isLoading);
        }, (error) => {
            dispatch({'type': types.kActionError, 'isLoading':false});
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
};