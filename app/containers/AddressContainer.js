/**
 * ShopReactNative
 *
 * @author Tony Wong
 * @date 2016-09-24
 * @email 908601756@qq.com
 * @copyright Copyright © 2016 EleTeam
 * @license The MIT License (MIT)
 */

import React, {Component} from 'react';
import {connect} from 'react-redux';
import AddressPage from '../pages/AddressPage';

class AddressContainer extends Component {
    render() {
        return (
            <AddressPage {...this.props} />
        )
    }
}

export default connect((state) => {
    return { addressReducer, userReducer} = state;
})(AddressContainer);