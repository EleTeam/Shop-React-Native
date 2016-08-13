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
import FoodsList from '../pages/FoodsList';

class FoodsListContainer extends React.Component {
    render() {
        return (
            <FoodsList {...this.props} />
        )
    }
}

export default connect((state) => {
    const {FoodsList} = state;
    return {
        FoodsList
    }
})(FoodsListContainer);