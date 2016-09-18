/**
 * ShopReactNative
 *
 * @author Tony Wong
 * @date 2016-08-13
 * @email 908601756@qq.com
 * @copyright Copyright © 2016 EleTeam
 * @license The MIT License (MIT)
 */

/**
 * redux actions - 用户模块
 */

'user strict';

import * as types from './actionTypes';
import {cartNumFromSync} from '../actions/cartActions';
import * as urls from '../common/constants_url';
import Util from '../common/utils';
import { Alert } from 'react-native';

/**
 *
 * @param isLoading
 * @returns {function(*)}
 */
export let categoryListWithProduct = (isLoading) => {
    let url = urls.kUrlCategoryListWithProduct;
    return (dispatch) => {
        dispatch({'type': types.kCategoryListWithProduct, 'isLoading':isLoading});
        Util.get(url,
            (status, code, message, data, share) => {
                let categories = [];
                if (status) {
                    categories = data.categories;
                }
                dispatch({type:types.kCategoryListWithProductReceived, status:status, code:code, message:message, share:share, categories:categories});
            },
            (error) => {
                // Alert.alert(error.message);
                dispatch({'type': types.kActionError, 'isLoading':false});
            });
    }
};

/**
 *
 * @param isLoading
 * @returns {function(*)}
 */
export let productView = (product_id, app_cart_cookie_id, access_token) => {
    let url = urls.kUrlProductView + product_id;
    let data = {
        app_cart_cookie_id: app_cart_cookie_id,
        access_token: access_token,
    };
    return (dispatch) => {
        dispatch({'type': types.kProductView, 'isLoading':true});
        Util.post(url, data,
            (status, code, message, data, share) => {
                let product = [];
                let cart_num = 0;
                if (status) {
                    product = data.product;
                    cart_num = data.cart_num;
                }
                dispatch({type:types.kProductViewReceived, status:status, code:code, message:message, share:share, product:product, cart_num:cart_num});
                dispatch(cartNumFromSync(cart_num));
            },
            (error) => {
                // Alert.alert(error.message);
                dispatch({'type': types.kActionError, 'isLoading':false, 'error':error});
            });
    }
};
