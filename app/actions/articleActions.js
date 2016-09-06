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

export let articleView = (id)=> {
    let url = urls.kUrlArticleView + id;

    return dispatch => {
        dispatch({type: types.kArticleView});
        return Util.get(url, (response) => {
            dispatch({type: types.kArticleViewReceived, article: response.data.article});
        }, (error) => {
            // console.log('Fetch banner list error: ' + error);
            dispatch({'type': types.kActionError});
        });
    }
};