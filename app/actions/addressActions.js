/**
 * ShopReactNative
 *
 * @author Tony Wong
 * @date 2016-09-24
 * @email 908601756@qq.com
 * @copyright Copyright © 2016 EleTeam
 * @license The MIT License (MIT)
 */

import * as types from './actionTypes';
import Util from '../common/utils';
import * as urls from '../common/constants_url';

/**
 * 地址actions
 */

export let addressList = (access_token)=> {
    let url = urls.kUrlAddressList;
    let data = {
        access_token: access_token
    };

    return dispatch => {
        dispatch({type: types.kAddressList});
        return Util.post(url, data,
            (status, code, message, data, share) => {
                let addresses = [];
                if (status) {
                    addresses = data.addresses;
                }
                dispatch({type:types.kAddressListReceived, status:status, code:code, message:message, share:share,
                    addresses:addresses});
            },
            (error) => {
                // console.log('Fetch banner list error: ' + error);
                dispatch({'type': types.kActionError});
            }
        );
    }
};

export let addressCreate = (access_token, area_id, detail)=> {
    let url = urls.kUrlAddressCreate;
    let data = {
        access_token: access_token,
        area_id: area_id,
        detail: detail
    };

    return dispatch => {
        dispatch({type: types.kAddressCreate});
        return Util.post(url, data,
            (status, code, message, data, share) => {
                let address = {};
                let addresses = [];
                if (status) {
                    address = data.address;
                    addresses = data.addresses;
                }
                dispatch({type:types.kAddressCreateReceived, status:status, code:code, message:message, share:share,
                    address:address, addresses:addresses});
            },
            (error) => {
                // console.log('Fetch banner list error: ' + error);
                dispatch({'type': types.kActionError});
            }
        );
    }
};

export let addressDelete = (access_token, address_id)=> {
    let url = urls.kUrlAddressDelete;
    let data = {
        access_token: access_token,
        id: address_id,
    };

    return dispatch => {
        dispatch({type: types.kAddressDelete});
        return Util.post(url, data,
            (status, code, message, data, share) => {
                if (status) {
                }
                dispatch({type:types.kPreorderViewReceived, status:status, code:code, message:message, share:share});
            },
            (error) => {
                // console.log('Fetch banner list error: ' + error);
                dispatch({'type': types.kActionError});
            }
        );
    }
};