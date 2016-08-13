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
import Strolling from '../pages/Strolling';

class StrollingContainer extends React.Component {
    render() {
        return (
            <Strolling {...this.props} />
        )
    }
}

export default connect((state) => {
    const { Strolling } = state;
    return {
        Strolling
    }
})(StrollingContainer);