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
    TextInput,
    TouchableOpacity,
    Image,
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';
import Common from '../common/constants';

export default class SearchInputBar extends React.Component {
    render() {
        return (
            <View style={styles.searchContainer}>
                <TouchableOpacity
                    activeOpacity={0.75}
                    style={{marginLeft: 15}}
                    onPress={this.props.backAction}
                >
                    <Icon name="angle-left" size={30} color="black"/>
                </TouchableOpacity>
                <TextInput
                    style={styles.textInput}
                    placeholder='请输入食物名称'
                    {...this.props}
                />
                <TouchableOpacity
                    style={styles.searchIcon}
                    activeOpacity={0.75}
                    onPress={this.props.searchAction}
                >
                    <Image style={{height: 20, width: 20}} source={{uri: 'ic_homepage_search'}}/>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    searchContainer: {
        flexDirection: 'row',
        height: 44,
        alignItems: 'center',
        borderBottomColor: '#ccc',
        borderBottomWidth: 0.5,
        backgroundColor: 'white',
    },

    textInput: {
        width: Common.window.width - 15 - 30 - 20,
        height: 30,
        marginTop: 9,
        paddingLeft: 5,
        fontSize: 14,
    },

    searchIcon: {
        position: 'absolute',
        right: 15,
        top: 12
    }
})