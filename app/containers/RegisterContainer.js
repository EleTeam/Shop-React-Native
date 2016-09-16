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
import RegisterPage from '../pages/RegisterPage';

class RegisterContainer extends Component {
    render() {
        return (
            <RegisterPage {...this.props} />
        )
    }
}

export default connect((state) => {
    const { userReducer } = state;
    return {
        userReducer
    }
})(RegisterContainer);