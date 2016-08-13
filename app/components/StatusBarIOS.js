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
    StatusBar,
} from 'react-native';
import Constants from '../common/constants';

export default class StatusBarIOS extends React.Component {
    render() {
        return (
            <View>
                <StatusBar {...this.props}/>
                <View style={styles.statusBar} />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    statusBar: {
        flex: 1,
        height: 20,
        backgroundColor: Constants.colors.themeColor,
    }
})