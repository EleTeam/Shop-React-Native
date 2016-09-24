/**
 * ShopReactNative
 *
 * @author Tony Wong
 * @date 2016-08-13
 * @email 908601756@qq.com
 * @copyright Copyright © 2016 EleTeam
 * @license The MIT License (MIT)
 */

import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    PixelRatio,
    ScrollView,
    Alert,
    TouchableOpacity,
    TouchableHighlight,
    InteractionManager,
} from 'react-native';
import Common from '../common/constants';
import commonStyles, {colors} from '../common/commonStyles';
import * as Storage from '../common/Storage';
import ImageButton from '../common/ImageButton';
import TextButton from '../common/TextButton';
import {userLogout, userFromSync} from '../actions/userActions';
import LoginContainer from '../containers/LoginContainer';
// import LoginContainer from '../pages/LoginPage';

export default class MyPage extends Component {
    // constructor(props) {
    //     super(props);
    //     this.state = {
    //         user: {}
    //     };
    // }

    // componentDidMount() {
    //     let user = {};
    //     Storage.getUser()
    //     .then((result) => {
    //         // this.setState({user: user});
    //         user = result;
    //     });
    //
    //     InteractionManager.runAfterInteractions(() => {
    //         const {dispatch} = this.props;
    //         dispatch(userFromSync(user));
    //     });
    // }

    // componentWillUpdate() {
    //     const {userReducer} = this.props;
    //     if (userReducer.user.id) {
    //         this.state.user = userReducer.user;
    //     }
    // }

    render() {
        const {userReducer} = this.props;
        const user = userReducer.user;

        return (
            <View style={styles.container}>
                <View style={styles.headerWrap}>
                    <Text style={styles.header}>我的</Text>
                </View>
                <ScrollView style={{
                    backgroundColor: 'rgba(240,240,240,0.9)'
                }}>
                    <Image style={styles.myBgImage} source={require('../images/img_my_bg.png')}>
                        <TouchableOpacity
                            style={styles.loginWrap}
                            onPress={this._onPressHead.bind(this)}
                        >
                            {user.avatar ?
                                <Image style={styles.headIcon} source={{uri:user.avatar}}/> :
                                <Image style={styles.headIcon} source={require('../images/img_default_head.png')}/>
                            }
                            {user.id ?
                                <Text style={styles.login}>{user.mobile}</Text> :
                                <Text style={styles.login}>点击登录</Text>
                            }
                        </TouchableOpacity>
                    </Image>

                    <Text style={{
                        width: Common.window.width,
                        height: 40,
                        position: 'absolute',
                        padding: 10,
                        fontSize: 18,
                        backgroundColor: 'white'
                    }}>
                        我的订单
                    </Text>
                    <Text
                        style={{position: 'absolute', padding: 10, fontSize: 18, marginLeft: Common.window.width - 30}}>
                        >
                    </Text>
                    <View style={{
                        width: Common.window.width,
                        height: 2 / PixelRatio.get(),
                        backgroundColor: 'gray',
                        marginTop: 40
                    }}>
                    </View>
                    <View style={{
                        padding: 10,
                        flex: 1,
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        backgroundColor: 'white'
                    }}>
                        <ImageButton
                            imageStyle={{
                                width: 30,
                                height: 30,
                            }}
                            onPress={() => {
                            } }
                            imageUrl={require('../images/moneys.png') }
                            text={'代付款'}
                        />
                        <ImageButton
                            imageStyle={{
                                width: 30,
                                height: 30,
                            }}
                            onPress={() => {
                            } }
                            imageUrl={require('../images/bus.png') }
                            text={'物流'}
                        />
                        <ImageButton
                            imageStyle={{
                                width: 30,
                                height: 30,
                            }}
                            onPress={() => {
                            } }
                            imageUrl={require('../images/tosts.png') }
                            text={'物流'}
                        />

                    </View>


                    <Text style={{
                        marginTop: 10,
                        width: Common.window.width,
                        height: 40,
                        position: 'absolute',
                        padding: 10,
                        fontSize: 18,
                        backgroundColor: 'white'
                    }}>
                        我的钱包
                    </Text>
                    <View style={{
                        width: Common.window.width,
                        height: 2 / PixelRatio.get(),
                        backgroundColor: 'gray',
                        marginTop: 50
                    }}>
                    </View>

                    <View style={{
                        padding: 15,
                        flex: 1,
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        backgroundColor: 'white'
                    }}>
                        <TextButton

                            onPress={() => {
                            } }
                            text={'物流'}
                            upText={'0'}
                        />
                        <TextButton

                            onPress={() => {
                            } }
                            text={'物流'}
                            upText={'0'}
                        />
                        <TextButton

                            onPress={() => {
                            } }
                            text={'物流'}
                            upText={'0'}
                        />
                        <ImageButton
                            imageStyle={{
                                width: 20,
                                height: 20,
                            }}
                            onPress={() => {
                            } }
                            imageUrl={require('../images/RMB.png') }
                            text={'优红利'}
                        />
                    </View>

                    <View style={{
                        marginTop: 10,
                        padding: 15,
                        flex: 1,
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        backgroundColor: 'white'
                    }}>
                        <ImageButton
                            imageStyle={{
                                width: 30,
                                height: 30,
                            }}
                            onPress={() => {
                            } }
                            imageUrl={require('../images/sc.png') }
                            text={'我的收藏'}
                        />
                        <ImageButton
                            imageStyle={{
                                width: 30,
                                height: 30,
                            }}
                            onPress={() => {
                            } }
                            imageUrl={require('../images/yj.png') }
                            text={'浏览记录'}
                        />
                        <ImageButton
                            imageStyle={{
                                width: 30,
                                height: 30,
                            }}
                            onPress={() => {
                            } }
                            imageUrl={require('../images/wh.png') }
                            text={'帮组中心'}
                        />
                        <ImageButton
                            imageStyle={{
                                width: 30,
                                height: 30,
                            }}
                            onPress={() => {
                            } }
                            imageUrl={require('../images/yjj.png') }
                            text={'意见反馈'}
                        />

                    </View>

                    <TouchableOpacity style={{
                        marginTop: 10,
                        flexDirection: 'row',
                        alignItems: 'center',
                        height: 50,
                        position: 'relative',
                        backgroundColor: 'white'
                    }} activeOpacity={0.75}>
                        <Image
                            source={require('../images/ri.png') }
                            style={{width: 30, height: 30, marginLeft: 20}}
                        />
                        <Text style={{marginLeft: 10}}>
                            每日签到
                        </Text>
                        <Text style={{
                            position: 'absolute',
                            padding: 12,
                            fontSize: 18,
                            marginLeft: Common.window.width - 150
                        }}>
                            >
                        </Text>

                    </TouchableOpacity>

                    <TouchableOpacity style={{
                        marginTop: 1,
                        flexDirection: 'row',
                        alignItems: 'center',
                        height: 50,
                        position: 'relative',
                        backgroundColor: 'white'
                    }} activeOpacity={0.75}>
                        <Image
                            source={require('../images/kf.png')}
                            style={{width: 30, height: 30, marginLeft: 20}}
                        />
                        <Text style={{marginLeft: 10}}>
                            联系客服
                        </Text>
                        <Text style={{
                            position: 'absolute',
                            padding: 12,
                            fontSize: 18,
                            marginLeft: Common.window.width - 150
                        }}>
                            >
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[commonStyles.btn, {marginBottom:20}]}
                        onPress={() => {
                            Alert.alert(
                                "确定要登录么?",
                                "",
                                [
                                    {text:"确定", onPress:()=>{this._logout()}},
                                    {text:"取消", onPress:()=>{}},
                                ]
                            );
                        }}
                        underlayColor={colors.backGray}
                    >
                        <Text style={[{color: colors.white, fontWeight: "bold",textAlign:"center"}]}> 退出登录 </Text>
                    </TouchableOpacity>
                </ScrollView>
            </View>
        );
    }

    _onPressHead() {
        const {userReducer} = this.props;
        const user = userReducer.user;

        if(!user.id) {
            InteractionManager.runAfterInteractions(() => {
                this.props.navigator.push({
                    name: 'LoginContainer',
                    component: LoginContainer,
                    passProps: {
                        ...this.props,
                    }
                })
            });
        }
    }

    _logout() {
        InteractionManager.runAfterInteractions(() => {
            const {dispatch} = this.props;
            dispatch(userLogout());
        });
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
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

    myBgImage: {
        flex: 1,
        width: Common.window.width,
        height: 100,
        justifyContent: 'center',
        alignItems: 'center',
    },
    headIcon: {
        height: 70,
        width: 70,
        borderRadius: 35,
    },
    loginWrap: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    login: {
        borderColor: 'white',
        color: 'white',
        borderWidth: 0.5,
        padding: 5,
        marginTop: 10,
        borderRadius: 3,
    },
});
