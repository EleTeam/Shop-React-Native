/**
 * ShopReactNative
 *
 * @author Tony Wong
 * @date 2016-08-13
 * @email 908601756@qq.com
 * @copyright Copyright © 2016 EleTeam
 * @license The MIT License (MIT)
 */

'use strict';

import React from 'react';
import {
    StyleSheet,
    View,
    ListView,
} from 'react-native';
import CategoryList from './CategoryList';
import ProductList from './ProductList';

export default class Category extends React.Component {
    constructor(props) {
        super(props);
        var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            categories: this._genRows(),
        };
    }

    _genRows() {
        const dataBlob = [];
        for(let i = 0 ; i< 200 ; i ++ ){
            dataBlob.push("aa"+i);
        }
        return dataBlob;
    }

    render() {
        return (
            <View style={styles.container}>
                <CategoryList categories={this.state.categories}/>
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