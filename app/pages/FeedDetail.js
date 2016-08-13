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
    View,
    StyleSheet,
    WebView,
    Image,
    Text,
    TouchableOpacity,
} from 'react-native';

import Header from '../components/Header';
import Common from '../common/constants';
import Icon from 'react-native-vector-icons/FontAwesome';

export default class FeedDetail extends React.Component {

    render() {
        const {feed} = this.props;

        return (
            <View style={{flex: 1, backgroundColor: 'white'}}>
                <Header
                    leftIcon='angle-left'
                    leftIconAction={()=>this.props.navigator.pop()}
                    title='资讯详情'
                />
                <WebView
                    source={{uri: feed.link}}
                    startInLoadingState={true}
                    bounces={false}
                    scalesPageToFit={true}
                    style={styles.webView}
                />
                <ToolBar style={{position: 'absolute', bottom: 0}}/>
            </View>
        )
    }
}

class ToolBar extends React.Component {
    render() {
        return (
            <View style={styles.container}>
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
    webView: {
        width: Common.window.width,
        height: Common.window.height - 64 - 40,
    },

    container: {
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

    itemTitle: {
        marginLeft: 5,
        fontSize: 12,
        color: 'gray'
    },

    centerLine: {
        position: 'absolute',
        height: 20,
        width: 0.5,
        top: 10,
        right: Common.window.width * 0.5,
        backgroundColor: '#ccc'
    }
})
