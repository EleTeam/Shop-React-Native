/**
 * ShopReactNative
 *
 * @author Tony Wong
 * @date 2016-09-24
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
} from 'react-native';
import Loading from '../components/Loading';
import Header from '../components/Header';
import Common from '../common/constants';
import {addressList, addressCreate} from '../actions/addressActions';

export default class AddressCreatePage extends Component {
    componentDidMount() {
        const {dispatch, userReducer} = this.props;
        //交互管理器在任意交互/动画完成之后，允许安排长期的运行工作. 在所有交互都完成之后安排一个函数来运行。
        InteractionManager.runAfterInteractions(() => {
            let user = userReducer.user;
            dispatch(addressList(user.access_token));
        });
    }

    render() {
        const {addressReducer} = this.props;
        let isLoading = addressReducer.isLoading;
        let addresses = addressReducer.addresses;

        return (
            <View style={styles.container}>
                <Header
                    leftIcon='angle-left'
                    leftIconAction={()=>this.props.navigator.pop()}
                    title='收货地址'
                />
                {isLoading ?
                    <Loading /> :
                    <View style={{flex:1,flexDirection:'column'}}>
                        <ListView
                            style={styles.productListWrap}
                            dataSource={this.state.dataSource.cloneWithRows(addresses)}
                            renderRow={this._renderRow.bind(this)}
                            enableEmptySections={true}
                        />
                    </View>
                }
            </View>
        )
    }

    _renderRow(address) {
        return (
            <View style={styles.productItem}>
                <View style={styles.productRight}>
                    <Text>{address.name}</Text>
                </View>
            </View>
        );
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
        fontSize: 17,
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