/**
 * ShopReactNative
 *
 * @author Tony Wong
 * @date 2016-08-13
 * @email 908601756@qq.com
 * @copyright Copyright © 2016 EleTeam
 * @license The MIT License (MIT)
 */

/**
 * 导航栏标题
 */
import React from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image,
    TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

export default class Header extends React.Component {
    render() {
        let NavigationBar = [];

        // 左边图片按钮
        if (this.props.leftIcon != undefined) {
            NavigationBar.push(
                <TouchableOpacity
                    key={'leftIcon'}
                    activeOpacity={0.75}
                    style={styles.leftIcon}
                    onPress={this.props.leftIconAction}
                >
                    <Icon color="black" size={30} name={this.props.leftIcon}/>
                </TouchableOpacity>
            )
        }

        // 标题
        if (this.props.title != undefined) {
            NavigationBar.push(
                <View key={'title'} style={styles.titleWrap}>
                    <Text style={styles.title}>{this.props.title}</Text>
                </View>
            )
        }

        // 自定义标题View
        if (this.props.titleView != undefined) {
            let Component = this.props.titleView;
            NavigationBar.push(
                <Component key={'titleView'}/>
            )
        }

        // 右边图片按钮
        if (this.props.rightIcon != undefined) {
            NavigationBar.push(
                <TouchableOpacity
                    key={'rightIcon'}
                    activeOpacity={0.75}
                    style={styles.rightIcon}
                    onPress={this.props.rightIconAction}
                >
                    <Icon color="gray" size={30} name={this.props.rightIcon}/>
                </TouchableOpacity>
            )
        }

        // 右边文字按钮
        if (this.props.rightButton != undefined) {
            NavigationBar.push(
                <TouchableOpacity
                    key={'rightButton'}
                    activeOpacity={0.75}
                    style={styles.rightButton}
                    onPress={this.props.rightButtonAction}
                >
                    <Text style={styles.buttonTitleFont}>{this.props.rightButton}</Text>
                </TouchableOpacity>
            )
        }

        if (this.props.rightMenu != undefined) {
            NavigationBar.push(
                <TouchableOpacity
                    key={'rightMenu'}
                    activeOpacity={0.75}
                    style={styles.rightMenu}
                    onPress={this.props.rightMenuAction}
                >
                    <Text style={{color: 'gray', fontSize: 12}}>{this.props.rightMenu}</Text>
                    <Image source={{uri: 'ic_food_ordering'}} style={{width: 16, height: 16}}/>
                </TouchableOpacity>
            )
        }


        return (
            <View style={styles.navigationBarContainer}>
                {NavigationBar}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    navigationBarContainer: {
        flexDirection: 'row',
        height: 44,
        alignItems: 'center',
        borderBottomColor: '#ccc',
        borderBottomWidth: 0.5,
        backgroundColor: 'white'
    },
    titleWrap: {
        flex:1,
        alignItems:'center',
    },
    title: {
        fontSize: 15,
        marginLeft: -40,
    },
    leftIcon: {
        paddingLeft: 15,
        paddingRight: 15,
    },
    rightIcon: {
        position: 'absolute',
        right: 10,
        top: 7
    },
    rightButton: {
        position: 'absolute',
        right: 10,
        height: 44,
        justifyContent: 'center',
        flexDirection: 'row',
    },
    buttonTitleFont: {
        color: 'white',
        fontSize: 15,
    },
    rightMenu: {
        position: 'absolute',
        right: 10,
        height: 44,
        justifyContent: 'center',
        flexDirection: 'row',
        alignItems: 'center'
    },
});