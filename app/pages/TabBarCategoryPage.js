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

import React, { Component } from 'react';
import {
    TochableOpacity,
    View,
    Text,
    StyleSheet,
    ListView,
} from 'react-native';
import { connect } from 'react-redux';
import { listCategoryWithProduct } from '../actions/productActions';

class TabBarCategoryPage extends Component {
    render() {
        return (
            <View style={styles.container}>
                <CategoryList {...this.state} />
                <ProductList {...this.state} />
            </View>
        )
    }

    componentDidMount() {
        const {dispatch} = this.props;
        dispatch(listCategoryWithProduct());
    }
}

class CategoryList extends Component {
    constructor(props) {
        super(props);
        var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            dataSource: ds.cloneWithRows(this.props),
        };
    }

    _renderRow(rowData, sectionId, rowId) {
        return (
            <View>
                <Text>{sectionId}</Text>
            </View>
        );
    }

    render() {
        return (
            <View style={styles.container_category}>
                <ListView
                    dataSource={this.state.dataSource}
                    renderRow={this._renderRow.bind(this)}
                    enableEmptySections={true}
                />
            </View>
        )
    }
}

class ProductList extends Component {
    render() {
        return (
            <View style={styles.container_product}>

            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection:'row',
    },
    container_category: {
        backgroundColor: '#eef0f3',
        width: 80,
    },
    container_product: {
        backgroundColor: '#aaaaf3',
        flex:1,
    },

    category:{
        justifyContent: 'center',
        alignItems: 'center',
        height:50,
    },
    category_bg_select:{
        backgroundColor:'#d7ead6',
    },
    category_bg_normal:{
        backgroundColor:'#ffffff',
    },
    line:{
        backgroundColor:'#eef0f3',
        height:1,
    },
})

export default connect((state)=>{
    const { page } = state;
    return { page };
})(TabBarCategoryPage);