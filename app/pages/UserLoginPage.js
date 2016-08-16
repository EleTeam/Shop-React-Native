/**
 * ShopReactNative
 *
 * @author Tony Wong
 * @date 2016-08-13
 * @email 908601756@qq.com
 * @copyright Copyright © 2016 EleTeam
 * @license The MIT License (MIT)
 */

'user strict';

import React from 'react';
import {connect} from 'react-redux';
import {
    StyleSheet,
    View,
    Text,
    Image,
    Switch,
    TouchableOpacity,
    TextInput,
    Dimensions,
} from 'react-native';

class UserLoginPage extends React.Component {
    render() {
        return (
            <View>
                <Image source={require('../images/bg.png')} style={{resizeMode: 'stretch'}}>
                    <View style={styles.loginMain}>
                        <View style={styles.loginMainCon}>
                            <View style={styles.comCulture}>
                                <Text style={[styles.textCenter,{color:'#ccc'}]}>Welcome</Text>
                                <Text style={[styles.textCenter,{color:'#ccc'}]}>You are the best.</Text>
                            </View>
                            <View style={styles.formStyle}>
                                <View style={[styles.formInput,styles.formInputSplit]}>
                                    <Image source={require('../images/user.png')} style={{width:25,height:25,resizeMode: 'contain'}}/>
                                    <TextInput
                                        ref="login_name"
                                        placeholder='username'
                                        style={styles.loginInput}
                                        onChangeText={this.onChangeName.bind(this)} />
                                </View>
                                <View style={styles.formInput}>
                                    <Image source={require('../images/passicon.png')} style={{width:25,height:25,resizeMode: 'contain'}}/>
                                    <TextInput
                                        ref="login_psw"
                                        style={styles.loginInput}
                                        secureTextEntry={true}
                                        placeholder='password'
                                        onChangeText={this.onChangePswd.bind(this)} />
                                </View>
                                <View style={{alignItems: 'flex-end'}}>
                                    <View style={styles.forget}>
                                        <View>
                                            <Image source={require('../images/prompt.png')} style={{width:15,height:15,resizeMode: 'contain',marginRight:10}}/>
                                        </View>
                                        <View >
                                            <Text style={{color:'#62a2e0', backgroundColor: 'white'}}>forget password?</Text>
                                        </View>
                                    </View>
                                </View>
                            </View>
                            <View style={styles.btn}>
                                <View style={styles.btnWrap}>
                                    <Text style={styles.loginBtn1} onPress={this.handleLogin.bind(this)}>Log in</Text>
                                </View>
                                <View style={styles.btnWrap}>
                                    <Text style={styles.loginBtn2} onPress={this.handleRegister.bind(this)}>Skip</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                </Image>
            </View>
        )
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

    onChangeName(text){
        this.setState({'username': text});
    }

    onChangePswd(text){
        this.setState({'password': text});
    }
}

export default connect(
    (store) => {
        const {UserLoginPage} = store;
        return {UserLoginPage}
    }
)(UserLoginPage);

var cell_w = Dimensions.get('window').width;
var styles = StyleSheet.create({
    textCenter: {
        textAlign: 'center',
        flex: 1,
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
    loginMainCon: {
        position: 'absolute',
        top: 110,
        left: (cell_w-320)/2,
        backgroundColor: '#fff',
        height: 330,
        borderRadius: 20,
    },
    comCulture: {
        width:320,
        marginTop:50,
    },
    logoImg: {
        position: 'absolute',
        top:0,
        left: cell_w/7,
        width:cell_w/7*5,
        resizeMode: 'contain',
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
    forget: {
        //alignItems: 'flex-end',
        flexDirection:'row',
        margin: 20

    },
    btn: {
        flexDirection:'row',
        //backgroundColor:'transparent',
    },

    btnWrap:{
        marginTop: 150,
        borderRadius: 5,
    },

    loginBtn1: {
        fontSize: 20,
        color: '#ffffff',
        backgroundColor: 'transparent',
        width: 150,
        height: 50,
        borderWidth: 1,
        borderColor: '#fff',
        paddingTop: 15,
        marginRight: 20,
        flex: 1,
        textAlign: 'center',
    },
    loginBtn2: {
        fontSize: 20,
        color: '#C7D634',
        backgroundColor: '#fff',
        width: 150,
        height: 50,
        borderWidth: 1,
        borderColor: '#fff',
        paddingTop: 15,
        flex: 1,
        textAlign: 'center',
    },
})

