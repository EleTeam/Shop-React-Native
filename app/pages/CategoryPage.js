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
    StyleSheet,
    View,
    ListView,
    Text,
    Image,
    InteractionManager,
    TouchableOpacity,
    Alert
} from 'react-native';
import { categoryListWithProduct } from '../actions/productActions';
import Loading from '../components/Loading';
import ProductContainer from '../containers/ProductContainer';
import Common from '../common/constants';

//页面变量
let isLoading = true;
let curCategoryIndex = 0;

export default class CategoryPage extends Component {
    constructor(props) {
        super(props);

        let dsCategory = new ListView.DataSource({
            getRowData: (data, sectionId, rowId) => {
                return data[sectionId][rowId];
            },
            getSectionHeaderData: (data, sectionId) => {
                return data[sectionId];
            },
            rowHasChanged: (row1, row2) => row1 !== row2,
            sectionHeaderHasChanged: (section1, section2) => section1 !== section2,
        });

        let dsProduct = new ListView.DataSource({
            getRowData: (data, sectionId, rowId) => {
                return data[sectionId][rowId];
            },
            getSectionHeaderData: (data, sectionId) => {
                return data[sectionId];
            },
            rowHasChanged: (row1, row2) => row1 !== row2,
            sectionHeaderHasChanged: (section1, section2) => section1 !== section2,
        });

        this.state = {
            dsCategory: dsCategory,
            dsProduct: dsProduct
        }
    }

    componentDidMount() {
        //交互管理器在任意交互/动画完成之后，允许安排长期的运行工作. 在所有交互都完成之后安排一个函数来运行。
        InteractionManager.runAfterInteractions(() => {
            const {dispatch} = this.props;
            dispatch(categoryListWithProduct(isLoading));
        });
    }

    render() {
        const {categoryReducer} = this.props;
        let categories = categoryReducer.categories;
        let products = [];
        if (!categoryReducer.isLoading){
            products = categories[curCategoryIndex].products;
            isLoading = false;
        }

        return (
            <View style={styles.container}>
                <View style={styles.headerWrap}>
                    <Text style={styles.header}>商品分类</Text>
                </View>
                {isLoading ?
                    <Loading /> :
                    <View style={styles.mainWrap}>
                        <ListView style={styles.categoryList}
                            dataSource={this.state.dsCategory.cloneWithRows(categories)}
                            renderRow={this._renderRowCategory.bind(this)}
                            enableEmptySections={true}
                        />
                        <ListView style={styles.productList}
                              dataSource={this.state.dsProduct.cloneWithRows(products)}
                              renderRow={this._renderRowProduct.bind(this)}
                              enableEmptySections={true}
                        />
                    </View>
                }
            </View>
        )
    }

    //=== 分类栏方法 ===

    _renderRowCategory(category, sectionId, rowId) {
        let categoryItemStyle = [styles.categoryItem];
        if (curCategoryIndex == rowId) {
            categoryItemStyle.push(styles.categoryItemActive);
        }
        return (
            <TouchableOpacity
                onPress={this._onPressCategory.bind(this, rowId)}
            >
                <View style={categoryItemStyle}>
                    <Text>{category.name}</Text>
                </View>
            </TouchableOpacity>
        );
    }

    _onPressCategory(rowId) {
        curCategoryIndex = rowId;
        this.forceUpdate();
    }

    //=== 产品栏方法 ===

    _renderRowProduct(product, sectionId, rowId) {
        return (
            <TouchableOpacity onPress={this._onPressProduct.bind(this, product.id)}>
                <View style={styles.productItem}>
                    <Image
                        style={styles.productImage}
                        source={{uri: product.image_small}}
                    />
                    <View style={styles.productRight}>
                        <Text>{product.name}</Text>
                        <View style={{flexDirection:'row'}}>
                            <Text>￥{product.price}</Text>
                            <Text>￥{product.featured_price}</Text>
                        </View>
                        <Text>立减 ￥{product.price - product.featured_price}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        );
    }

    _onPressProduct(product_id) {
        // Alert.alert(product_id);
        InteractionManager.runAfterInteractions(() => {
            this.props.navigator.push({
                name: 'ProductContainer',
                component: ProductContainer,
                passProps: {...this.props, product_id:product_id}
            })
        });
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    headerWrap: {
        alignItems: 'center',
        height: 44,
        backgroundColor: '#ff7419',
    },
    header: {
        color: '#fff',
        paddingTop: 22,
        fontSize: 16,
    },
    mainWrap: {
        flex:1,
        flexDirection:'row',
    },

    categoryList: {
        flex:0,
        backgroundColor: '#eee',
        width: 70,
        height: Common.window.height - 64 - 24,
    },
    productList: {
        flex: 1,
        height: Common.window.height - 64 - 24,
    },
    line:{
        backgroundColor:'#eef0f3',
        height:1,
    },

    categoryItem:{
        alignItems: 'center',    //水平居中
        justifyContent: 'center',//垂直居中
        height:50,
    },
    categoryItemActive: {
        backgroundColor: '#fff',
    },
    category_bg_select:{
        backgroundColor:'#d7ead6',
    },
    category_bg_normal:{
        backgroundColor:'#fff',
    },

    productItem: {
        height: 80,
        flexDirection:'row',
        padding: 15,
        marginBottom: 1,
        backgroundColor:'#fff',
    },
    productRight: {
        flexDirection:'column',
    },
    productImage: {
        width: 60,
        height: 60,
        marginRight: 15,
    },
    productPrice: {
        fontSize: 24,
        color: 'red',
    },
    productFeaturedPrice: {
        fontSize: 14,
        color: '#ddd',
    }
});