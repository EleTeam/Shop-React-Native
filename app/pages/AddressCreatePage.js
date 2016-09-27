/**
 * ShopReactNative
 *
 * @author Tony Wong
 * @date 2016-09-25
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
import {addressCreate, addressList} from '../actions/addressActions';

export default class AddressCreatePage extends Component {
    constructor(props){
        super(props);
        this.state = {
            area_id: 0,
            detail: '',
            fullname:'',
            telephone:'',
        };
    }

    componentWillUnmount(){
        // this.unsubscribe();
    }

    componentDidMount(){
        // this.unsubscribe = MemberStore.listen(this.onLogined.bind(this));
    }

    componentWillUpdate(nextProps, nextState){
        InteractionManager.runAfterInteractions(() => {
            const {addressReducer} = this.props;
            if (addressReducer.isToasting) {
                Toast.show(addressReducer.message, {position:Toast.positions.CENTER});
            }
        });
    }

    render(){
        return (
            <View style={styles.container}>
                <Header
                    leftIcon='angle-left'
                    leftIconAction={()=>this.props.navigator.pop()}
                    title='添加收货地址'
                />
                <View style={[styles.formInput, styles.formInputSplit]}>
                    <Image source={require('../images/user.png')} style={{width:25,height:25,resizeMode: 'contain'}}/>
                    <TextInput
                        placeholder='请输入收货人姓名'
                        style={styles.loginInput}
                        onChangeText={this._onChangeFullname.bind(this)} />
                </View>
                <View style={[styles.formInput, styles.formInputSplit]}>
                    <Image source={require('../images/passicon.png')} style={{width:25,height:25,resizeMode: 'contain'}}/>
                    <TextInput
                        style={styles.loginInput}
                        placeholder='请输入收货人电话'
                        onChangeText={this._onChangeTelephone.bind(this)} />
                </View>
                <View style={[styles.formInput, styles.formInputSplit]}>
                    <Image source={require('../images/passicon.png')} style={{width:25,height:25,resizeMode: 'contain'}}/>
                    <TextInput
                        style={styles.loginInput}
                        placeholder='请输入详情地址'
                        onChangeText={this._onChangeDetail.bind(this)} />
                </View>
                <TouchableOpacity style={styles.registerBtn} onPress={this._addressCreate.bind(this)}>
                    <Text style={styles.registerText}>保存</Text>
                </TouchableOpacity>
            </View>
        )
    }

    _onChangeFullname(text) {
        this.state.fullname = text;
        // this.setState({'mobile': text});
    }

    _onChangeTelephone(text){
        this.state.telephone = text;
        // this.setState({'password': text});
    }

    _onChangeDetail(text){
        this.state.detail = text;
        // this.setState({'password': text});
    }

    _addressCreate(){
        let {telephone, fullname, detail, area_id} = this.state;

        if (!fullname.length) {
            Toast.show('请输入收货人姓名', {position:Toast.positions.CENTER});
            return;
        }
        if (!telephone.length) {
            Toast.show('请输入收货人电话', {position:Toast.positions.CENTER});
            return;
        }

        InteractionManager.runAfterInteractions(() => {
            const {dispatch, userReducer} = this.props;
            let access_token = userReducer.user.access_token;
            dispatch(addressCreate(access_token, fullname, telephone, area_id, detail));
        });
    };
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

    verifyCodeBtn: {
        backgroundColor: '#c5523f',
        paddingTop: 5,
        paddingBottom: 5,
        alignItems:'center',
        width: 80,
        height: 30,
        borderRadius: 2,
    },
    verifyCodeText: {
        color: '#ffffff',
    },

    registerBtn:{
        backgroundColor: '#ff6836',
        padding: 10,
        alignItems: 'center',
        marginTop: 20,
        marginLeft: 10,
        marginRight: 10,
        borderRadius: 3,
    },
    registerText:{
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
