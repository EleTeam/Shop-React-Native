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
import homeReducer from './homeReducer';
import categoryReducer from './categoryReducer';
import productReducer from './productReducer';
import articleReducer from './articleReducer';
import cartReducer from './cartReducer';
import preorderReducer from './preorderReducer';
import myReducer from './myReducer';
import userReducer from './userReducer';

export default rootReducer = combineReducers({
    homeReducer,
    categoryReducer,
    productReducer,
    articleReducer,
    cartReducer,
    preorderReducer,
    myReducer,
    userReducer,
})