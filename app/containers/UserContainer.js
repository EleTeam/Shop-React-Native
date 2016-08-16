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
import User from '../pages/User';

class UserContainer extends React.Component {
    render() {
        return (
            <User {...this.props} />
        )
    }
}

export default connect((state) => {
    const { User } = state;
    return {
        User
    }
})(UserContainer);