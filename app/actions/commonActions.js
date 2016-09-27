/**
 * ShopReactNative
 *
 * @author Tony Wong
 * @date 2016-09-24
 * @email 908601756@qq.com
 * @copyright Copyright © 2016 EleTeam
 * @license The MIT License (MIT)
 */

import * as types from './actionTypes';

/**
 * 公共的actions
 */

export let commonIsToasting = (isToasting) => {
    return (dispatch) => {
        dispatch({type:types.kCommonIsToasting, isToasting:isToasting});
    }
};