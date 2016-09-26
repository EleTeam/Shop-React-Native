/**
 * ShopReactNative
 *
 * @author Tony Wong
 * @date 2016-09-25
 * @email 908601756@qq.com
 * @copyright Copyright © 2016 EleTeam
 * @license The MIT License (MIT)
 */

import React, {Component} from 'react';
import {connect} from 'react-redux';
import AddressCreatePage from '../pages/AddressCreatePage';

class AddressCreateContainer extends Component {
    render() {
        return (
            <AddressCreatePage {...this.props} />
        )
    }
}

export default connect((state) => {
    return {addressReducer, userReducer} = state;
})(AddressCreateContainer);