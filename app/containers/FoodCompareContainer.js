/**
 * Created by ljunb on 16/6/5.
 */
import React from 'react';
import {connect} from 'react-redux';
import FoodCompare from '../pages/FoodCompare';

class FoodCompareContainer extends React.Component {
    render() {
        return (
            <FoodCompare {...this.props} />
        )
    }
}

export default connect((state)=>{
    const {FoodCompare} = state;
    return {
        FoodCompare,
    }
})(FoodCompareContainer);