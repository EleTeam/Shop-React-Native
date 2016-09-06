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
import ArticlePage from '../pages/ArticlePage';

class ArticleContainer extends Component {
    render() {
        return (
            <ArticlePage {...this.props} />
        )
    }
}

export default connect((state) => {
    const { articleReducer } = state;
    return {
        articleReducer
    }
})(ArticleContainer);