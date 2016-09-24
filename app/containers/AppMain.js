/**
 * 商城主框架界面
 */
'use strict';
import React, {Component} from 'react';
import {
  StyleSheet,
  Image
} from 'react-native';
import TabNavigator from 'react-native-tab-navigator';

import HomeContainer from './HomeContainer';
import CategoryContainer from './CategoryContainer';
import CartContainer from './CartContainer';
import FunContainer from './FunContainer';
import MyContainer from './MyContainer';

class AppMain extends Component {
    constructor(props) {
        super(props);
        this.state = {
	  	      selectedTab:'home'
	      };
    }
    
    render() {
        return (
          <TabNavigator>
			  <TabNavigator.Item
			  	title="首页"
			    selected={this.state.selectedTab === 'home'}
			    selectedTitleStyle={styles.selectedTextStyle}
			    titleStyle={styles.textStyle}
			    renderIcon={() => <Image source={require("../images/tab/ic_tab_home.png")} style={styles.iconStyle}/>}
			    renderSelectedIcon={() => <Image source={require("../images/tab/ic_tab_home_press.png")} style={styles.iconStyle}/>}
			    onPress={() => this.setState({ selectedTab: 'home' })}>
			    <HomeContainer {...this.props}/>
			  </TabNavigator.Item>
			  <TabNavigator.Item
			  	title="分类"
			    selected={this.state.selectedTab === 'order'}
			    selectedTitleStyle={styles.selectedTextStyle}
			    titleStyle={styles.textStyle}
			    renderIcon={() => <Image source={require("../images/tab/ic_tab_category.png")} style={styles.iconStyle}/>}
			    renderSelectedIcon={() => <Image source={require("../images/tab/ic_tab_category_press.png")} style={styles.iconStyle}/>}
			    onPress={() => this.setState({ selectedTab: 'order' })}>
			    <CategoryContainer {...this.props}/>
			  </TabNavigator.Item>
			  <TabNavigator.Item
			  	title="购物车"
			    selected={this.state.selectedTab === 'cart'}
			    selectedTitleStyle={styles.selectedTextStyle}
			    titleStyle={styles.textStyle}
			    renderIcon={() => <Image source={require("../images/tab/ic_tab_cart.png")} style={styles.iconStyle}/>}
			    renderSelectedIcon={() => <Image source={require("../images/tab/ic_tab_cart_press.png")} style={styles.iconStyle}/>}
			    onPress={() => this.setState({ selectedTab: 'cart' })}>
			    <CartContainer {...this.props}/>
			  </TabNavigator.Item>
			  <TabNavigator.Item
				  title="好玩"
				  selected={this.state.selectedTab === 'fun'}
				  selectedTitleStyle={styles.selectedTextStyle}
				  titleStyle={styles.textStyle}
				  renderIcon={() => <Image source={require("../images/tab/ic_tab_fun.png")} style={styles.iconStyle}/>}
				  renderSelectedIcon={() => <Image source={require("../images/tab/ic_tab_fun_press.png")} style={styles.iconStyle}/>}
				  onPress={() => this.setState({ selectedTab: 'fun' })}>
				  <FunContainer {...this.props}/>
			  </TabNavigator.Item>
			  <TabNavigator.Item
			  	title="我的"
			    selected={this.state.selectedTab === 'center'}
			    selectedTitleStyle={styles.selectedTextStyle}
			    titleStyle={styles.textStyle}
			    renderIcon={() => <Image source={require("../images/tab/ic_tab_my.png")} style={styles.iconStyle}/>}
			    renderSelectedIcon={() => <Image source={require("../images/tab/ic_tab_my_press.png")} style={styles.iconStyle}/>}
			    onPress={() => this.setState({ selectedTab: 'center' })}>
			    <MyContainer {...this.props}/>
			  </TabNavigator.Item>
			</TabNavigator>
        );
    }
}

const styles=StyleSheet.create({
   iconStyle:{
       width:26,
       height:26,
   },
   textStyle:{
       color:'#999',
   },
   selectedTextStyle:{
       color:'black',
   }
});

export default AppMain;

