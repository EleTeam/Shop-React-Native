/**
 * ShopReactNative
 *
 * @author Tony Wong
 * @date 2016-08-13
 * @email 908601756@qq.com
 * @copyright Copyright © 2016 EleTeam
 * @license The MIT License (MIT)
 */

import React, {Component} from 'react';
import {connect} from 'react-redux';
import LoginPage from '../pages/LoginPage';

class LoginContainer extends Component {
    render() {
        return (
            <LoginPage {...this.props} />
        )
    }
}

export default connect((state) => {
    const { userReducer } = state;
    return {
        userReducer
    }
})(LoginContainer);