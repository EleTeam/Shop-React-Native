/**
 * ShopReactNative
 *
 * @author Tony Wong
 * @date 2016-09-11
 * @email 908601756@qq.com
 * @copyright Copyright © 2016 EleTeam
 * @license The MIT License (MIT)
 */

import * as types from './actionTypes';
import Util from '../common/utils';
import * as urls from '../common/constants_url';

/**
 * 购物车actions
 * @param id
 * @returns {function(*)}
 */
export let cartView = ()=> {
    let url = urls.kUrlCart;

    return dispatch => {
        dispatch({type: types.kCartView});
        return Util.get(url, (response) => {
            dispatch({type: types.kCartViewReceived, cartItems: response.data.cartItems});
        }, (error) => {
            // console.log('Fetch banner list error: ' + error);
            dispatch({'type': types.kActionError});
        });
    }
};