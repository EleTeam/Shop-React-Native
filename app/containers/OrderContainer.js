/**
 * ShopReactNative
 *
 * @author Tony Wong
 * @date 2016-09-27
 * @email 908601756@qq.com
 * @copyright Copyright © 2016 EleTeam
 * @license The MIT License (MIT)
 */

import React, {Component} from 'react';
import {connect} from 'react-redux';
import OrderPage from '../pages/OrderPage';

class OrderContainer extends Component {
    render() {
        return (
            <OrderPage {...this.props} />
        )
    }
}

export default connect((state) => {
    return { orderReducer, userReducer, commonReducer} = state;
})(OrderContainer);