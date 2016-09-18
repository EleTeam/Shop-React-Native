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
    TextInput,
    View,
    Image,
    TouchableOpacity,
    InteractionManager,
} from 'react-native';
import Toast from 'react-native-root-toast';
import Header from '../components/Header';
import * as Storage from '../common/Storage';
import RegisterContainer from '../containers/RegisterContainer';
import {userLogin} from '../actions/userActions';
import Loading from '../components/Loading';

export default class LoginPage extends Component {
    constructor(props){
        super(props);
        this.state = {
            mobile: '',
            password: '',
        };
    }
    componentWillUnmount(){
        // this.unsubscribe();
    }
    componentDidMount(){
        // Storage.getUser()
        // .then((user) => {
        //     if (user.id) {
        //         this.props.navigator.popToTop();
        //     }
        // });
    }

    componentWillUpdate(nextProps, nextState) {
        InteractionManager.runAfterInteractions(() => {
            const {userReducer} = this.props;
            if (userReducer.user.id) {
                this.props.navigator.popToTop();
            }
            if (!userReducer.isLoading && userReducer.status == false) {
                Toast.show(userReducer.message, {position: Toast.positions.CENTER});
            }
        });
    }

    render(){
        return (
            <View style={styles.container}>
                <Header
                    leftIcon='angle-left'
                    leftIconAction={()=>this.props.navigator.pop()}
                    title='手机号登录'
                />
                <View style={[styles.formInput, styles.formInputSplit]}>
                    <Image source={require('../images/user.png')} style={{width:25,height:25,resizeMode: 'contain'}}/>
                    <TextInput
                        ref="login_name"
                        placeholder='请输入手机号'
                        style={styles.loginInput}
                        onChangeText={this.onChangeMobile.bind(this)} />
                </View>
                <View style={[styles.formInput, styles.formInputSplit]}>
                    <Image source={require('../images/passicon.png')} style={{width:25,height:25,resizeMode: 'contain'}}/>
                    <TextInput
                        ref="login_psw"
                        style={styles.loginInput}
                        secureTextEntry={true}
                        placeholder='请输入密码'
                        onChangeText={this.onChangePassword.bind(this)} />
                </View>
                <TouchableOpacity style={styles.loginBtn} onPress={this._login.bind(this)}>
                    <Text style={styles.loginText}>登录</Text>
                </TouchableOpacity>
                <View style={styles.registerWrap}>
                    <TouchableOpacity style={{alignItems:'flex-start',flex:1}} onPress={this._forgetPassword.bind(this)}>
                        <Text style={{color:'#62a2e0'}}>忘记密码?</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{alignItems:'flex-end',flex:1}} onPress={this._register.bind(this)}>
                        <Text style={{color:'#62a2e0'}}>立即注册</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }

    _register() {
        InteractionManager.runAfterInteractions(() => {
            this.props.navigator.push({
                name: 'RegisterContainer',
                component: RegisterContainer,
                passProps: {
                    ...this.props,
                }
            })
        });
    }

    _forgetPassword() {

    }

    _login(){
        let {mobile, password} = this.state;

        if (!mobile.length) {
            Toast.show('请输入正确的手机号', {position:Toast.positions.CENTER});
            return;
        }
        if (!password.length) {
            Toast.show('请输入密码', {position:Toast.positions.CENTER});
            return;
        }

        InteractionManager.runAfterInteractions(() => {
            const {dispatch} = this.props;
            dispatch(userLogin(mobile, password));
        });
    }

    onChangeMobile(text){
        this.state.mobile = text;
        // this.setState({'mobile': text});
    }

    onChangePassword(text){
        this.state.password = text;
        // this.setState({'password': text});
    }
}

class RegisterBtn extends Component{
    constructor(props){
        super(props);
    }
    render(){
        return (
            <TouchableOpacity onPress={()=>this.props.navigator.push({'id':'register'})}>
                <Text>注册</Text>
            </TouchableOpacity>
        )
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
        fontSize: 17,
    },

    loginWrap: {
        backgroundColor: '#FCE9D4',
    },
    imgWrap: {
        flexDirection: 'row',
        flex: 1,
    },
    loginMain: {
        flex:1,
    },
    comCulture: {
        width:320,
        marginTop:50,
    },

    formInput:{
        flexDirection:'row',
        height: 60,
        padding: 20,
    },
    formInputSplit:{
        borderBottomWidth:1,
        borderBottomColor:'#dbdada',
    },
    loginInput: {
        height: 40,
        paddingLeft: 10,
        flex: 1,
        fontSize: 16,
    },

    loginBtn:{
        backgroundColor: '#ff6836',
        padding: 10,
        alignItems: 'center',
        marginTop: 20,
        marginLeft: 10,
        marginRight: 10,
        borderRadius: 3,
    },
    loginText:{
        color:'#ffffff',
        fontSize: 17,
    },

    registerWrap: {
        flexDirection: 'row',
        marginTop: 20,
        marginBottom: 20,
        marginLeft: 10,
        marginRight: 10,
    },
});
