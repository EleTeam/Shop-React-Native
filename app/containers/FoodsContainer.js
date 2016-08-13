/**
 * ShopReactNative
 *
 * @author Tony Wong
 * @date 2016-08-13
 * @email 908601756@qq.com
 * @copyright Copyright © 2016 EleTeam
 * @license The MIT License (MIT)
 */

import React from 'react';
import {connect} from 'react-redux';
import Foods from '../pages/Foods';

class FoodsContainer extends React.Component {
    render() {
        return (
            <Foods {...this.props} />
        )
    }
}

export default connect((state) => {
    const {Foods} = state;
    return {
        Foods
    }
})(FoodsContainer);