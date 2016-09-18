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
    ScrollView,
    Alert
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Swiper from 'react-native-swiper';
import Loading from '../components/Loading';
import Header from '../components/Header';
import Common from '../common/constants';
import CartContainer from '../containers/CartContainer';
import {productView} from '../actions/productActions';
import {cartAdd} from '../actions/cartActions';
import * as Storage from '../common/Storage';

export default class ProductPage extends Component {
    componentDidMount() {
        //交互管理器在任意交互/动画完成之后，允许安排长期的运行工作. 在所有交互都完成之后安排一个函数来运行。
        InteractionManager.runAfterInteractions(() => {
            const {dispatch, product_id, cartReducer, userReducer} = this.props;
            let app_cart_cookie_id = cartReducer.app_cart_cookie_id;
            let access_token = userReducer.user.access_token;
            dispatch(productView(product_id, app_cart_cookie_id, access_token));
        });
    }

    render() {
        const {productReducer} = this.props;
        let product = productReducer.product;
        let images = [];
        if (!productReducer.isLoading){
            product.app_long_image1.length && images.push(product.app_long_image1);
            product.app_long_image2.length && images.push(product.app_long_image2);
            product.app_long_image3.length && images.push(product.app_long_image3);
            product.app_long_image4.length && images.push(product.app_long_image4);
            product.app_long_image5.length && images.push(product.app_long_image5);
        }

        return (
            <View style={styles.container}>
                <Header
                    leftIcon='angle-left'
                    leftIconAction={()=>this.props.navigator.pop()}
                    title='商品详情'
                />
                <View style={styles.mainWrap}>
                    {productReducer.isLoading ?
                        <Loading /> :
                        <ScrollView
                            bounces={false}
                            showsVerticalScrollIndicator={false}
                            style={styles.scrollView}
                        >
                            <Swiper
                                height={200}
                                loop={true}
                                autoplay={false}
                                dot={<View style={styles.customDot} />}
                                activeDot={<View style={styles.customActiveDot} />}
                                paginationStyle={{
                                    bottom: 10
                                }}
                            >
                                {images.map((image) => {
                                    return (
                                        <TouchableOpacity key={image} activeOpacity={0.75}>
                                            <Image
                                                style={styles.productImage}
                                                source={{uri: image}}
                                            />
                                        </TouchableOpacity>
                                    )
                                })}
                            </Swiper>
                            <View style={styles.contentWrap}>
                                <View style={styles.nameWrap}>
                                    <Text style={styles.name}>{product.name}</Text>
                                    <Text style={styles.price}>{product.price}</Text>
                                    <Text style={styles.featuredPrice}>{product.featured_price}</Text>
                                </View>
                                <Text style={styles.shortDesc}>{product.short_description}</Text>
                            </View>
                        </ScrollView>
                    }
                </View>
                <ToolBar {...this.props} />
            </View>
        )
    }
}

class ToolBar extends Component {
    render() {
        const {cartReducer} = this.props;
        let cart_num = cartReducer.cart_num;

        return (
            <View style={styles.toolBarWrap}>
                <TouchableOpacity style={styles.toolBarItem}>
                    <Icon
                        name="share-square-o"
                        color="gray"
                        size={15}
                    />
                </TouchableOpacity>
                <TouchableOpacity style={styles.toolBarItem}>
                    <Icon
                        name="heart-o"
                        color="gray"
                        size={15}
                    />
                </TouchableOpacity>
                <TouchableOpacity style={styles.toolBarItem} onPress={this._goToCartPage.bind(this)}>
                    <Icon
                        name="shopping-cart"
                        color="gray"
                        size={18}
                    />
                    <Text style={styles.cartNum}>{cart_num}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.toolBarItem} onPress={this._addToCart.bind(this)}>
                    <View style={styles.addToCartWrap}>
                        <Text style={styles.addToCart}>加入购物车</Text>
                    </View>
                </TouchableOpacity>
            </View>
        )
    }

    _addToCart() {
        const {dispatch, productReducer, cartReducer, userReducer} = this.props;
        const product_id = productReducer.product.id;
        let app_cart_cookie_id = cartReducer.app_cart_cookie_id;
        let access_token = userReducer.user.access_token;
        let count = 1;
        Storage.getAppCartCookieId()
        .then((result)=>{
            app_cart_cookie_id = result;
        });

        InteractionManager.runAfterInteractions(() => {
            dispatch(cartAdd(product_id, count, app_cart_cookie_id, access_token));
        });
    }

    _goToCartPage() {
        InteractionManager.runAfterInteractions(() => {
            this.props.navigator.push({
                name: 'CartContainer',
                component: CartContainer,
                passProps: {...this.props, isShowNavigator:true}
            })
        });
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },

    //内容栏
    mainWrap: {
        width: Common.window.width,
        height: Common.window.height - 64 - 20,
    },
    scrollView: {
        height: Common.window.height - 64 - 20,
        backgroundColor: 'rgb(241, 241, 241)',
    },
    contentWrap: {
        marginLeft: 10,
        marginRight: 10,
    },

    productImage: {
        height: 200,
        width: Common.window.width,
    },
    customDot: {
        backgroundColor: '#ccc',
        height: 1.5,
        width: 15,
        marginLeft: 2,
        marginRight: 2,
        marginTop: 2,
    },
    customActiveDot: {
        backgroundColor: 'white',
        height: 1.5,
        width: 15,
        marginLeft: 2,
        marginRight: 2,
        marginTop: 2,
    },

    nameWrap: {
        flexDirection: 'row',
        marginTop: 12,
    },
    name: {
        fontSize: 20,
        color: '#222',
    },
    price: {
        fontSize: 18,
        color: '#FC5500',
        marginLeft: 50,
    },
    featuredPrice: {
        fontSize: 16,
        color: '#666',
        marginLeft: 20,
    },
    shortDesc: {
        fontSize: 16,
        color: '#666',
        marginTop: 10,
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
    addToCartWrap: {
        flex: 1,
        backgroundColor: '#fd6161',
        justifyContent: 'center',
        alignItems: 'center',
    },
    addToCart: {
        flex: 1,
        color: '#fff',
        fontSize: 16,
    },
    cartNum: {
        color: 'red',
        fontSize: 11,
        marginTop: -18,
        marginLeft: -10,
        backgroundColor: 'transparent',
    },
});
