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
import MyPage from '../pages/MyPage';

class MyContainer extends Component {
    render() {
        return (
            <MyPage {...this.props} />
        )
    }
}

export default connect((state) => {
    const { myReducer } = state;
    return {
        myReducer
    }
})(MyContainer);