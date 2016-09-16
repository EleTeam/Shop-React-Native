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
    PixelRatio,
    ScrollView,
    TouchableOpacity,
    InteractionManager,
} from 'react-native';
import Header from '../components/Header';
import RegisterContainer from '../containers/RegisterContainer';

export default class LoginPage extends Component {
    constructor(props){
        super(props);
        this.state = {
            username: '',
            password: '',
            spinnerLoading:false,
            memberObject:null
        };
    }
    componentWillUnmount(){
        // this.unsubscribe();
    }
    componentDidMount(){
        // this.unsubscribe = MemberStore.listen(this.onLogined.bind(this));
    }
    componentWillUpdate(nextProps,nextState){
        // if(!_.isEqual(this.state.memberObject,nextState.memberObject) && !_.isEmpty(nextState.memberObject)){
        //     this.props.navigator.replace({'id':'ucenter'});
        // }else{
        // }
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
                        onChangeText={this.onChangeName.bind(this)} />
                </View>
                <View style={[styles.formInput, styles.formInputSplit]}>
                    <Image source={require('../images/passicon.png')} style={{width:25,height:25,resizeMode: 'contain'}}/>
                    <TextInput
                        ref="login_psw"
                        style={styles.loginInput}
                        secureTextEntry={true}
                        placeholder='请输入密码'
                        onChangeText={this.onChangePswd.bind(this)} />
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
        // MemberAction.login(this.state.username,this.state.password);
    }

    onChangeName(text){
        this.setState({'username': text});
    }

    onChangePswd(text){
        this.setState({'password': text});
    }

    handleLogin(){
        if(!this.state.username || !this.state.password){
            AlertIOS.alert(
                'username, password?'
            );
            return;
        }
        let opt = {
            'name': this.state.username,
            'password': this.state.password,
        };
        this.props.dispatch(logIn(opt));
    }

    handleRegister(){
        const {dispatch} = this.props;
        dispatch(skipLogin());
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
    formStyle: {
        backgroundColor:'#F4F3F3',
        marginTop: 30,
        marginLeft: 10,
        width: 300,
        height: 120,
        borderRadius: 8,
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
        height: 30,
        borderColor: '#000',
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
