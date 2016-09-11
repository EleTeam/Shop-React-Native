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

import React, {Component} from 'react';
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
import Header from '../components/Header';
import Common from '../common/constants';
import Icon from 'react-native-vector-icons/FontAwesome';
import Swiper from 'react-native-swiper';
import {productView} from '../actions/productActions';

export default class ProductPage extends React.Component {
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

        return (
            <View style={{flex: 1, backgroundColor: 'white'}}>
                <Header
                    leftIcon='angle-left'
                    leftIconAction={()=>this.props.navigator.pop()}
                    title='商品详情'
                />
                <View style={styles.mainWrap}>
                    {productReducer.isLoading ?
                        <Loading /> :
                        <View
                            bounces={false}
                            showsVerticalScrollIndicator={false}
                            style={styles.scrollView}
                        >
                            <Text>{product.name}</Text>
                            <Text>{product.price}</Text>
                        </View>
                    }
                </View>
                <ToolBar style={{position: 'absolute', bottom: 0}}/>
            </View>
        )
    }
}

class ToolBar extends React.Component {
    render() {
        return (
            <View style={styles.toolBarWrap}>
                <TouchableOpacity style={styles.toolBarItem}>
                    <Icon
                        name="share-square-o"
                        color="gray"
                        size={15}
                    />
                    <Text style={styles.itemTitle}>分享</Text>
                </TouchableOpacity>
                <View style={styles.centerLine}/>
                <TouchableOpacity style={styles.toolBarItem}>
                    <Icon
                        name="heart-o"
                        color="gray"
                        size={15}
                    />
                    <Text style={styles.itemTitle}>收藏</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    //内容栏
    mainWrap: {
        width: Common.window.width,
        height: Common.window.height - 64 - 20,
    },
    scrollView: {
        height: Common.window.height - 64 - 20,
        paddingTop: 25,
        backgroundColor: 'rgb(241, 241, 241)',
    },

    // 底部栏
    toolBarWrap: {
        height: 40,
        flexDirection: 'row',
        alignItems: 'center',
        borderTopColor: '#ccc',
        borderTopWidth: 0.5,
    },
    toolBarItem: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    centerLine: {
        position: 'absolute',
        height: 20,
        width: 0.5,
        top: 10,
        right: Common.window.width * 0.5,
        backgroundColor: '#ccc'
    },
    itemTitle: {
        marginLeft: 5,
        fontSize: 12,
        color: 'gray'
    },
});
