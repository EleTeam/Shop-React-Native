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
import FunPage from '../pages/FunPage';

class FunContainer extends Component {
    render() {
        return (
            <FunPage {...this.props} />
        )
    }
}

export default connect((state) => {
    return { userReducer } = state;
})(FunContainer);