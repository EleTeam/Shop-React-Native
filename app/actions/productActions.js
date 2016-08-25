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
import Util from '../common/utils';
import { Alert } from 'react-native';

export let listCategoryWithProduct = () => {
    let url = 'http://local.eleteamapi.ygcr8.com/v1/category/list-with-product';
    return (dispatch) => {
        dispatch({'type': types.kCategoryListWithProduct});
        Util.get(url,
            (response) => {
                response = ['a','b','c'];
                dispatch({'type': types.kCategoryListWithProductDone, 'categories': response});
            },
            (error) => {
                Alert.alert(error.message);
                dispatch({'type': types.kActionError});
            });
    }
}
