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
    Image,
    Switch,
    TouchableOpacity,
} from 'react-native';

export default class User extends React.Component {

    render() {
        let titles = ['清除缓存', '关于我', '将ShopReactNative分享给朋友'];

        return (
            <View>
                <View style={styles.header}>
                    <Text style={{fontSize: 17}}>我的</Text>
                </View>
                <HeadView />
                <JurisdictionView />
                <View style={styles.switchCell}>
                    <View style={{}}>
                        <Text>控血糖模式</Text>
                        <Text style={{color: 'gray', fontSize: 12, marginTop: 10}}>开启后食物红绿灯将针对糖尿病人群</Text>
                    </View>
                    <Switch
                        style={styles.switch}
                        // onTintColor="red"
                        // thumbTintColor="white"
                    />
                </View>
                {
                    titles.map((title) => {
                        return (
                            <TouchableOpacity
                                key={title}
                                style={styles.cell}
                            >
                                <Text>{title}</Text>
                                <Image style={styles.rightIcon} source={{uri: 'ic_my_right'}}/>
                            </TouchableOpacity>
                        )
                    })
                }

            </View>
        )
    }
}

class HeadView extends React.Component {
    render() {

        return (
            <View>
                <Image style={styles.myBgImage} source={{uri: 'img_my_bg'}}>
                    <Image style={styles.headIcon} source={{uri: 'img_default_head'}}/>
                    <TouchableOpacity style={styles.login}>
                        <Text style={{color: 'white'}}>点击登录</Text>
                    </TouchableOpacity>
                </Image>
            </View>
        )
    }
}

class JurisdictionView extends React.Component {
    render() {
        let icons = ['ic_my_food', 'ic_my_upload', 'ic_my_collect'];
        let titles = ['饮食分析', '上传食物', '我的收藏'];
        return (
            <View style={styles.jurisdictionView}>
                {
                    icons.map((icon, i) => {
                        return (
                            <TouchableOpacity
                                key={i}
                                style={styles.handleView}

                            >
                                <Image source={{uri: icon}} style={{height: 40, width: 40}}/>
                                <Text style={{marginTop: 10}}>{titles[i]}</Text>
                            </TouchableOpacity>
                        )
                    })
                }
            </View>
        )
    }
}

const styles = StyleSheet.create({
    header: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 44,
        borderBottomColor: '#ccc',
        borderBottomWidth: 0.5
    },

    myBgImage: {
        flex: 1,
        height: 160,
        justifyContent: 'center',
        alignItems: 'center',
    },

    headIcon: {
        height: 80,
        width: 80,
    },

    login: {
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: 'white',
        borderWidth: 0.5,
        padding: 5,
        marginTop: 10,
    },

    jurisdictionView: {
        flexDirection: 'row',
        height: 100,
        borderBottomColor: 'rgb(241, 241, 241)',
        borderBottomWidth: 10
    },

    handleView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },

    switchCell: {
        flexDirection: 'row',
        padding: 10,
        alignItems: 'center',
        borderBottomColor: 'rgb(241, 241, 241)',
        borderBottomWidth: 10
    },

    switch: {
        position: 'absolute',
        right: 15,
        top: 10,
    },

    cell: {
        flexDirection: 'row',
        height: 40,
        marginLeft: 10,
        marginRight: 10,
        justifyContent: 'space-between',
        borderBottomColor: '#ccc',
        borderBottomWidth: 0.5,
        alignItems: 'center'
    },

    rightIcon: {
        position: 'absolute',
        right: -10,
        top: 5,
        height: 30,
        width: 30
    }

})