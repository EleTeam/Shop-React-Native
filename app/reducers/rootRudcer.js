/**
 * ShopReactNative
 *
 * @author Tony Wong
 * @date 2016-08-13
 * @email 908601756@qq.com
 * @copyright Copyright © 2016 EleTeam
 * @license The MIT License (MIT)
 */

/**
 * 根reducer
 */
import { combineReducers } from 'redux';
import Strolling from './strollingReducer';
import Foods from './foodsReducer';
import FoodsList from './foodsListReducer';
import FoodCompare from './foodCompareReducer';
import FoodInfo from './foodInfoReducer';
import Search from './searchReducer';
import User from './userReducer';
import ProductReducer from './productReducer';


export default rootReducer = combineReducers({
    Strolling,
    Foods,
    FoodsList,
    FoodCompare,
    FoodInfo,
    Search,
    User,
    ProductReducer,
})