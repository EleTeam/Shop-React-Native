/**
 * ShopReactNative
 *
 * @author Tony Wong
 * @date 2016-09-23
 * @email 908601756@qq.com
 * @copyright Copyright © 2016 EleTeam
 * @license The MIT License (MIT)
 */

import React, {Component} from 'react';
import {connect} from 'react-redux';
import PreorderPage from '../pages/PreorderPage';

class PreorderContainer extends Component {
    render() {
        return (
            <PreorderPage {...this.props} />
        )
    }
}

export default connect((state) => {
    return { preorderReducer, userReducer} = state;
})(PreorderContainer);