/**
 * ShopReactNative
 *
 * @author Tony Wong
 * @date 2016-09-11
 * @email 908601756@qq.com
 * @copyright Copyright © 2016 EleTeam
 * @license The MIT License (MIT)
 */

import React, {Component} from 'react';
import {
    StyleSheet,
    TouchableOpacity,
    Text,
    View,
    ListView,
    Image,
    InteractionManager,
} from 'react-native';
import {cartView} from '../actions/cartActions';
import {preorderCreate, preorderIsTurnedToViewFromSync} from '../actions/preorderActions';
import Common from '../common/constants';
import Header from '../components/Header';
import ProductContainer from '../containers/ProductContainer';
import LoginContainer from '../containers/LoginContainer';
import PreorderContainer from '../containers/PreorderContainer';
import Loading from '../components/Loading';

export default class CartPage extends Component {
    constructor(props) {
        super(props);
        this._renderRow = this._renderRow.bind(this);
        this.state = {
            dataSource: new ListView.DataSource({
                rowHasChanged: (row1, row2) => row1 !== row2,
            }),
        };
    }

    componentDidMount() {
        // 交互管理器在任意交互/动画完成之后，允许安排长期的运行工作. 在所有交互都完成之后安排一个函数来运行。
        InteractionManager.runAfterInteractions(() => {
            const {dispatch, cartReducer, userReducer} = this.props;
            let app_cart_cookie_id = cartReducer.app_cart_cookie_id;
            let access_token = userReducer.user.access_token;
            dispatch(cartView(app_cart_cookie_id, access_token));
        });
    }

    componentWillReceiveProps(nextProps) {
        const {dispatch, preorderReducer} = nextProps;
        if(preorderReducer.isTurnToPreorderView && preorderReducer.preorder.id) {
            dispatch(preorderIsTurnedToViewFromSync());
            InteractionManager.runAfterInteractions(() => {
                this.props.navigator.push({
                    name: 'PreorderContainer',
                    component: PreorderContainer
                })
            });
        }
    }

    render() {
        const {cartReducer, userReducer, isShowNavigator} = this.props;
        let cartItems = cartReducer.cartItems;
        let isLoading = cartReducer.isLoading;
        let cart_num = cartReducer.cart_num;
        let user = userReducer.user;

        return (
            <View style={styles.container}>
                {isShowNavigator ?
                    <Header
                        leftIcon='angle-left'
                        leftIconAction={()=>this.props.navigator.pop()}
                        title='购物车'
                    /> :
                    <View style={styles.headerWrap}>
                        <Text style={styles.header}>购物车</Text>
                    </View>
                }
                {isLoading ?
                    <Loading /> :
                    <View style={{flex:1,flexDirection:'column'}}>
                        <ListView
                            style={styles.productListWrap}
                            dataSource={this.state.dataSource.cloneWithRows(cartItems)}
                            renderRow={this._renderRow}
                            enableEmptySections={true}
                        />
                        <View style={styles.toolBarWrap}>
                            <Text style={styles.cartNum}>总{cart_num}种商品</Text>
                            <TouchableOpacity style={styles.toolBarItem} onPress={this._preorderCreateAndView.bind(this, user)}>
                                <View style={styles.addToCartWrap}>
                                    <Text style={styles.addToCart}>去结算</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                }
            </View>
        )
    }

    _renderRow(cartItem, sectionID, rowID) {
        const {isShowNavigator} = this.props;
        let product = cartItem.product;
        return (
            <View>
                {!isShowNavigator ?
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
                    </TouchableOpacity> :
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
                }
            </View>
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

    _preorderCreateAndView(user) {
        if(user.id) {
            const {dispatch, cartReducer} = this.props;
            if(!cartReducer.cartItems.length){
                alert('请先选择商品');
                return;
            }
            dispatch(preorderCreate(user.access_token));
        }else{ //去登录
            InteractionManager.runAfterInteractions(() => {
                this.props.navigator.push({
                    name: 'LoginContainer',
                    component: LoginContainer
                })
            });
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
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

    productListWrap: {
        height: Common.window.height - 64 - 44 - 40,
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
    },

    // 底部栏
    toolBarWrap: {
        height: 440,
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