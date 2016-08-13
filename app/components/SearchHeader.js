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
            <View style={styles.header}>
                <TouchableOpacity
                    activeOpacity={0.75}
                    style={styles.searchInput}
                    onPress={this.props.searchAction}
                >
                    <Image
                        style={styles.searchIcon}
                        source={{uri: 'ic_input_search'}}
                    />
                    <Text style={styles.searchPlaceholder}>请输入食物名称</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    activeOpacity={0.75}
                    onPress={this.props.scanAction}
                >
                    <Image
                        style={styles.scanIcon}
                        source={{uri: 'ic_homepage_scan'}}
                    />
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
        borderBottomColor: '#ccc',
        borderBottomWidth: 0.5,
    },

    searchInput: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 32,
        width: Common.window.width - 30 - 6 * 3,
        margin: 6,
        padding: 10,
        backgroundColor: 'rgb(245, 246, 247)',
        borderRadius: 2,
    },

    searchIcon: {
        width: 20,
        height: 20,
    },

    scanIcon: {
        width: 30,
        height: 30,
    },

    searchPlaceholder: {
        marginLeft: 10,
        textAlign: 'center',
        fontSize: 15,
        color: 'gray'
    }
})