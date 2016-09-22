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
import * as Storage from '../common/Storage';

/**
 * 购物车actions
 * @param id
 * @returns {function(*)}
 */

export let appCartCookieIdFromSync = (app_cart_cookie_id) => {
    return (dispatch) => {
        dispatch({type:types.kAppCartCookieIdFromSync, app_cart_cookie_id:app_cart_cookie_id});
    }
};

export let cartNumFromSync = (cart_num) => {
    return (dispatch) => {
        dispatch({type:types.kCartNumFromSync, cart_num:cart_num});
    }
};

export let cartView = (app_cart_cookie_id, access_token)=> {
    let url = urls.kUrlCart;
    let data = {
        app_cart_cookie_id: app_cart_cookie_id,
        access_token: access_token
    };

    return dispatch => {
        dispatch({type: types.kCartView});
        return Util.post(url, data,
            (status, code, message, data, share) => {
                let app_cart_cookie_id = '';
                let cartItems = [];
                if (status) {
                    cartItems = data.cartItems;
                    app_cart_cookie_id = data.app_cart_cookie_id;
                }
                dispatch({type:types.kCartViewReceived, status:status, code:code, message:message, share:share, cartItems:cartItems, app_cart_cookie_id:app_cart_cookie_id});
            },
            (error) => {
                // console.log('Fetch banner list error: ' + error);
                dispatch({'type': types.kActionError});
            }
        );
    }
};

export let cartAdd = (product_id, count, app_cart_cookie_id, access_token)=> {
    let url = urls.kUrlCartAdd;
    let data = {
        product_id: product_id,
        count: count,
        app_cart_cookie_id: app_cart_cookie_id,
        access_token: access_token,
    };

    return dispatch => {
        dispatch({type: types.kCartAdd});
        return Util.post(url, data,
            (status, code, message, data, share) => {
                let cart_num = 0;
                let app_cart_cookie_id = app_cart_cookie_id;
                if (status) {
                    cart_num = data.cart_num;
                    app_cart_cookie_id = data.app_cart_cookie_id;
                }
                Storage.setAppCartCookieId(app_cart_cookie_id);
                dispatch({type:types.kCartAddReceived, status:status, code:code, message:message, share:share,
                    cart_num:cart_num, app_cart_cookie_id});
                dispatch(cartView(app_cart_cookie_id, access_token));
            },
            (error) => {
                // console.log('Fetch banner list error: ' + error);
                dispatch({'type': types.kActionError});
            }
        );
    }
};