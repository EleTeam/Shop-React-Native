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
 * action 创建函数 - 用户模块
 */

'user strict';

import * as types from './actionTypes';
import {cartView} from './cartActions';
import Util from '../common/utils';
import * as urls from '../common/constants_url';
import * as Storage from '../common/Storage';
import { Alert } from 'react-native';

export let userFromSync = (user) => {
    return (dispatch) => {
        dispatch({type: types.kUserFromSync, user: user});
    }
};

export let userRegister = (mobile, password, code) => {
    let url = urls.kUrlUserRegister;
    let data = {
        mobile: mobile,
        password: password,
        code: code
    };
    return (dispatch) => {
        dispatch({type: types.kUserRegister});
        Util.post(url, data,
            (status, code, message, data, share) => {
                let user = {};
                let app_cart_cookie_id = '';
                if (status) {
                    user = data.user;
                    app_cart_cookie_id = data.app_cart_cookie_id;
                    Storage.setAppCartCookieId(app_cart_cookie_id);
                    Storage.setUser(user);
                }
                dispatch({type:types.kUserRegisterReceived, status:status, code:code, message:message, user:user, share:share});
                dispatch(cartView(app_cart_cookie_id, user.access_token));
            },
            (error) => {
                dispatch({'type': types.kActionError});
            });
    }
};

export let userView = () => {
    let url = 'http://local.eleteamapi.ygcr8.com/v1/user/view?id=2';
    return (dispatch) => {
        dispatch({'type':types.kUserView});
        Util.get(url,
            () => {},
            () => {});
    }
};

export let userLogin = (mobile, password) => {
    let url = urls.kUrlUserLogin;
    let data = {
        mobile: mobile,
        password: password
    };
    return (dispatch) => {
        dispatch({'type': types.kUserLogin});
        Util.post(url, data,
            (status, code, message, data, share) => {
                let app_cart_cookie_id = '';
                let user = {};
                if (status) {
                    user = data.user;
                    app_cart_cookie_id = data.app_cart_cookie_id;
                    Storage.setAppCartCookieId(app_cart_cookie_id);
                    Storage.setUser(user);
                }
                dispatch({type:types.kUserLoginReceived, status:status, code:code, message:message, share:share, user:user, app_cart_cookie_id:app_cart_cookie_id});
                dispatch(cartView(app_cart_cookie_id, user.access_token));
            },
            (error) => {
                Alert.alert(error.message);
                dispatch({'type': types.kActionError});
            });
    }
};

export let userLogout = () => {
    let url = urls.kUrlUserLogout;
    return (dispatch) => {
        dispatch({'type': types.kUserLogout});
        Util.get(url,
            (status, code, message, data, share) => {
                let app_cart_cookie_id = '';
                if (status) {
                    app_cart_cookie_id = data.app_cart_cookie_id;
                    Storage.setAppCartCookieId(app_cart_cookie_id);
                    Storage.setUser({});
                }
                dispatch({type:types.kUserLogoutReceived, status:status, code:code, message:message, share:share, app_cart_cookie_id:app_cart_cookie_id, user:{}});
                dispatch(cartView(app_cart_cookie_id, ''));
            },
            (error) => {
                Alert.alert(error.message);
                dispatch({'type': types.kActionError});
            });
    }
};
