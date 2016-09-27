/**
 * ShopReactNative
 *
 * @author Tony Wong
 * @date 2016-09-27
 * @email 908601756@qq.com
 * @copyright Copyright © 2016 EleTeam
 * @license The MIT License (MIT)
 */

import * as types from './actionTypes';
import Util from '../common/utils';
import * as urls from '../common/constants_url';
import {commonIsToasting} from './commonActions';

/**
 * 订单actions
 */

export let orderCreate = (access_token, preorder_id, address_id, notice)=> {
    let url = urls.kUrlOrderCreate;
    let data = {
        access_token: access_token,
        preorder_id: preorder_id,
        address_id: address_id,
        notice: notice
    };

    return dispatch => {
        dispatch({type: types.kOrderCreate});
        return Util.post(url, data,
            (status, code, message, data, share) => {
                let order = {};
                if (status) {
                    order = data.order;
                }else{
                    dispatch(commonIsToasting(true));
                }
                dispatch({type:types.kOrderCreateReceived, status:status, code:code, message:message, share:share,
                    order:order});
                dispatch(commonIsToasting(false));
            },
            (error) => {
                // console.log('Fetch banner list error: ' + error);
                dispatch({'type': types.kActionError});
            }
        );
    }
};

export let orderView = (order_id, access_token)=> {
    let url = urls.kUrlOrderView + order_id;
    let data = {
        access_token: access_token
    };

    return dispatch => {
        dispatch({type: types.kOrderView});
        return Util.post(url, data,
            (status, code, message, data, share) => {
                let order = {};
                let address = {};
                if (status) {
                    order = data.order;
                    address = data.address;
                }
                dispatch({type:types.kOrderViewReceived, status:status, code:code, message:message, share:share,
                    order:order, address:address});
            },
            (error) => {
                // console.log('Fetch banner list error: ' + error);
                dispatch({'type': types.kActionError});
            }
        );
    }
};