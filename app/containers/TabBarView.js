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
    TabBarIOS,
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import StrollingContainer from '../containers/StrollingContainer';
// import CategoryContainer from '../containers/CategoryContainer';
import TabBarCategoryPage from '../pages/TabBarCategoryPage';
import UserContainer from '../containers/UserContainer';
import Constants from '../common/constants';

const tabBarItems = [
    {title: '首頁', icon: 'home', component: StrollingContainer},
    //{title: '分类', icon: 'th-list', component: CategoryContainer},
    {title: '分类', icon: 'th-list', component: TabBarCategoryPage},
    {title: '购物车', icon: 'shopping-cart', component: StrollingContainer},
    {title: '优惠', icon: 'folder-o', component: StrollingContainer},
    {title: '我的', icon: 'user', component: UserContainer},
];

export default class TabBarView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedTab: tabBarItems[0].title,
        };
    }

    render() {
        return (
            <TabBarIOS tintColor={Constants.colors.themeColor}>
                {
                    tabBarItems.map((controller, i) => {
                        let Component = controller.component;
                        return (
                            <FontAwesome.TabBarItem
                                key={i}
                                title={controller.title}
                                iconName={controller.icon}
                                selectedIconName={controller.icon}
                                selected={this.state.selectedTab === controller.title}
                                onPress={() => {
                                    this.setState({
                                       selectedTab: controller.title
                                    })
                                }}
                            >
                                <Component navigator = {this.props.navigator} {...this.props}/>
                            </FontAwesome.TabBarItem>
                        )
                    })
                }
            </TabBarIOS>
        )
    }
}