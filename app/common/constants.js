/**
 * ShopReactNative
 *
 * @author Tony Wong
 * @date 2016-08-13
 * @email 908601756@qq.com
 * @copyright Copyright © 2016 EleTeam
 * @license The MIT License (MIT)
 */

import {Dimensions} from 'react-native';

let window = {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
};

let colors = {
    themeColor: 'rgb(217, 51, 58)',
};

let storeKeys = {
    SEARCH_HISTORY_KEY: 'SEARCH_HISTORY_KEY',
};

let mapper = {
    'calory': {name: '热量', unit: ''},
    'protein': {name: '蛋白质', unit: '克'},
    'fat': {name: '脂肪', unit: '克'},
    'carbohydrate': {name: '碳水化合物', unit: '克'},
    'fiber_dietary': {name: '膳食纤维', unit: '克'},
    'vitamin_a': {name: '维生素A', unit: 'IU'},
    'vitamin_c': {name: '维生素C', unit: '毫克'},
    'vitamin_e': {name: '维生素E', unit: '毫克'},
    'carotene': {name: '胡萝卜素', unit: '微克'},
    'thiamine': {name: '维生素B1', unit: '毫克'},
    'lactoflavin': {name: '维生素B2', unit: '毫克'},
    'niacin': {name: '烟酸', unit: '毫克'},
    'cholesterol': {name: '胆固醇', unit: '毫克'},
    'magnesium': {name: '镁', unit: '毫克'},
    'calcium': {name: '钙', unit: '毫克'},
    'iron': {name: '铁', unit: '毫克'},
    'zinc': {name: '锌', unit: '毫克'},
    'copper': {name: '铜', unit: '毫克'},
    'manganese': {name: '锰', unit: '毫克'},
    'kalium': {name: '钾', unit: '毫克'},
    'phosphor': {name: '磷', unit: '毫克'},
    'natrium': {name: '钠', unit: '毫克'},
    'selenium': {name: '硒', unit: '毫克'}
};

export default {
    window: window,
    colors: colors,
    storeKeys: storeKeys,
    ingredientMapper: mapper
};