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
import CategoryPage from '../pages/CategoryPage';

class CategoryContainer extends React.Component {
    render() {
        return (
            <CategoryPage {...this.props} />
        )
    }
}

export default connect((state) => {
    const { productReducer } = state;
    return {
        productReducer
    }
})(CategoryContainer);