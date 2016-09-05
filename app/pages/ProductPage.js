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
    Text,
    Image,
    InteractionManager,
    TouchableOpacity,
    Alert
} from 'react-native';
import Loading from '../components/Loading';
import {productView} from '../actions/productActions';

export default class ProductPage extends React.Component {
    constructor(props) {
        super(props);

            //交互管理器在任意交互/动画完成之后，允许安排长期的运行工作. 在所有交互都完成之后安排一个函数来运行。
            // InteractionManager.runAfterInteractions(() => {
            //     const {dispatch, product_id} = this.props;
            //     dispatch(productView(product_id));
            // });
    }

    componentDidMount() {
        //交互管理器在任意交互/动画完成之后，允许安排长期的运行工作. 在所有交互都完成之后安排一个函数来运行。
        InteractionManager.runAfterInteractions(() => {
            const {dispatch, product_id} = this.props;
            dispatch(productView(product_id));
        });
    }

    render() {
        const {productReducer} = this.props;
        let product = productReducer.product;
        // alert(productReducer.isLoading);
        if (productReducer.isLoading){
            Alert.alert(product);
        }

        return (
                productReducer.isLoading ?
                    <Loading /> :
                    <View style={styles.container}>
                        <Text>product.name}</Text>
                    </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection:'row',
    },
    categoryList: {
        backgroundColor: '#eee',
        width: 70,
    },
    productList: {
        flex: 1,
        backgroundColor: '#eee',
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