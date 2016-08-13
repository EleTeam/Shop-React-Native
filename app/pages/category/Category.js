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
import {
    StyleSheet,
    View,
} from 'react-native';
import CategoryList from './CategoryList';
import ProductList from './ProductList';

export default class Category extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                <CategoryList/>
                <ProductList/>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection:'row',
    },
})