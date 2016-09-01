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
            (response) => {
                // Alert.alert(response);
                let categories = response.data.categories;
                dispatch({'type': types.kCategoryListWithProductReceived, 'isLoading':false, 'categories': categories});
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
export let productView = (product_id) => {
    let url = urls.kUrlProductView + product_id;
    return (dispatch) => {
        dispatch({'type': types.kProductView, 'isLoading':true});
        Util.get(url,
            (response) => {
                let product = response.data.product;
                // Alert.alert(product);
                dispatch({'type': types.kProductViewReceived, 'isLoading':false, 'product': product});
            },
            (error) => {
                // Alert.alert(error.message);
                dispatch({'type': types.kActionError, 'isLoading':false, 'error':error});
            });
    }
};
