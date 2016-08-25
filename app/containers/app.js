/**
 * ShopReactNative
 *
 * @author Tony Wong
 * @date 2016-08-13
 * @email 908601756@qq.com
 * @copyright Copyright © 2016 EleTeam
 * @license The MIT License (MIT)
 */

import React, { Component } from 'react';
import {
    Navigator,
    View,
} from 'react-native';

import StatusBarIOS from '../components/StatusBarIOS';
import TabBarView from '../containers/TabBarView';

class App extends Component {
    render() {
        return (
            <View style={{flex: 1}}>
                <StatusBarIOS barStyle="light-content"/>
                <Navigator
                    initialRoute={{name: 'TabBarView', component: TabBarView}}
                    configureScene={()=>{
                        return  Navigator.SceneConfigs.PushFromRight;
                    }}
                    renderScene={(route, navigator) => {
                        let Component = route.component;
                        return (
                            <Component navigator = {navigator} route = {route} {...route.passProps} />
                        )
                    }}
                />
            </View>
        )
    }
}

export default App;