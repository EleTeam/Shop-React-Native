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
import HomePage from '../pages/HomePage';

class HomeContainer extends Component {
    render() {
        return (
            <HomePage {...this.props} />
        )
    }
}

export default connect((state) => {
    return { homeReducer, cartReducer, userReducer } = state;
})(HomeContainer);