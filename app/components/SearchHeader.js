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
    Text,
    TouchableOpacity,
    Image,
} from 'react-native';
import Common from '../common/constants';

export default class SearchHeader extends React.Component {
    render() {
        return (
            <View style={styles.headerWrap}>
                <TouchableOpacity
                    activeOpacity={0.75}
                    style={styles.searchInput}
                    onPress={this.props.searchAction}
                >
                    <Image
                        style={styles.searchIcon}
                        source={require('../images/ic_search.jpg')}
                    />
                    <Text style={styles.searchPlaceholder}>请输入食物名称</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    activeOpacity={0.75}
                    onPress={this.props.scanAction}
                >
                    <Image
                        style={styles.scanIcon}
                        source={require('../images/ic_scan.jpg')}
                    />
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    headerWrap: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#ff7419',
        borderBottomColor: '#ccc',
        borderBottomWidth: 0.5,
        height: 44,
    },

    searchInput: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 24,
        width: Common.window.width - 30 - 6 * 3,
        marginTop: 16,
        backgroundColor: '#ff7419',
        borderRadius: 2,
    },

    searchIcon: {
        width: 20,
        height: 20,
    },

    scanIcon: {
        marginTop: 16,
        width: 20,
        height: 20,
    },

    searchPlaceholder: {
        marginLeft: 10,
        textAlign: 'center',
        fontSize: 15,
        color: 'gray'
    }
})