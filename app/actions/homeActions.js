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
            (status, code, message, data, share) => {
                let banners = [];
                if (status) {
                    banners = data.banners;
                }
                dispatch({type:types.kBannerListReceived, status:status, code:code, message:message, share:share, banners:banners});
            },
            (error) => {
                // console.log('Fetch banner list error: ' + error);
                dispatch({'type': types.kActionError});
                alert('Android要用外网地址');
            }
        );
    }
};

export let homeListArticles = (page, isLoadMore, isRefreshing, isLoading)=> {
    let url = urls.kUrlHomeListArticles + '?page=' + page;
    return dispatch => {
        dispatch({
            type: types.kHomeListArticles,
            isLoadMore: isLoadMore,
            isRefreshing: isRefreshing,
            isLoading: isLoading,
        });

        return Util.get(url,
            (status, code, message, data, share) => {
                let articles = [];
                if (status) {
                    articles = data.articles;
                }
                dispatch({type:types.kHomeListArticlesReceived, status:status, code:code, message:message, share:share, articles:articles});
            },
            (error) => {
                dispatch({'type': types.kActionError, 'isLoading':false});
            }
        );

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