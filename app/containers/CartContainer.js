/**
 * ShopReactNative
 *
 * @author Tony Wong
 * @date 2016-09-11
 * @email 908601756@qq.com
 * @copyright Copyright © 2016 EleTeam
 * @license The MIT License (MIT)
 */

import React, {Component} from 'react';
import {connect} from 'react-redux';
import CartPage from '../pages/CartPage';

class CartContainer extends Component {
    render() {
        return (
            <CartPage {...this.props} />
        )
    }
}

export default connect((state) => {
    const { cartReducer } = state;
    return {
        cartReducer
    }
})(CartContainer);