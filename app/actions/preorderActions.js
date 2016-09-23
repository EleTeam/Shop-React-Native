/**
 * ShopReactNative
 *
 * @author Tony Wong
 * @date 2016-09-23
 * @email 908601756@qq.com
 * @copyright Copyright © 2016 EleTeam
 * @license The MIT License (MIT)
 */

import * as types from './actionTypes';
import Util from '../common/utils';
import * as urls from '../common/constants_url';

/**
 * 预订单actions
 */

export let preorderCreate = (access_token)=> {
    let url = urls.kUrlPreorderCreate;
    let data = {
        access_token: access_token,
    };

    return dispatch => {
        dispatch({type: types.kPreorderCreate});
        return Util.post(url, data,
            (status, code, message, data, share) => {
                let preorder = {};
                if (status) {
                    preorder = data.preorder;
                }
                dispatch({type:types.kPreorderCreateReceived, status:status, code:code, message:message, share:share,
                    preorder:preorder});
            },
            (error) => {
                // console.log('Fetch banner list error: ' + error);
                dispatch({'type': types.kActionError});
            }
        );
    }
};

export let preorderIsTurnedToViewFromSync = () => {
    return (dispatch) => {
        dispatch({type:types.kPreorderIsTurnedToViewFromSync});
    }
};

export let preorderView = (preorder_id, access_token)=> {
    let url = urls.kUrlPreorderView + preorder_id;
    let data = {
        access_token: access_token
    };

    return dispatch => {
        dispatch({type: types.kPreorderView});
        return Util.post(url, data,
            (status, code, message, data, share) => {
                let preorder = {};
                let address = {};
                if (status) {
                    preorder = data.preorder;
                    address = data.address;
                }
                dispatch({type:types.kPreorderViewReceived, status:status, code:code, message:message, share:share,
                    preorder:preorder, address:address});
            },
            (error) => {
                // console.log('Fetch banner list error: ' + error);
                dispatch({'type': types.kActionError});
            }
        );
    }
};