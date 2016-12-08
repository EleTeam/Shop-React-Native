# Shop-React-Native

### Shop-React-Native 是基于 React Native 和 Redux 实现的电商类APP，同时运行在iOS和Android平台上。持续更新中，欢迎一起讨论学习！

#### 如果你支持这个项目，请 Star and Fork Me。

#### 注：有任何问题请在Issues提交，EleTeam会尽快回复。

#### EleTeam开源项目 - 电商全套解决方案之 React Native 版 - Shop-React-Native。一个类似京东/天猫/淘宝的商城，有对应的服务端支持，由EleTeam团队维护！
#### 服务端是PHP商城，对应项目是 Shop-PHP-Yii2，https://github.com/EleTeam/Shop-PHP-Yii2

### 功能如下:
    支持下拉刷新和上拖加载更多
    广告模块
    文章模块
    用户模块
    产品模块
    购物车模块
    订单模块
    地址模块
    分享&收藏
    营销模块
    
#### 依赖组件:
    "dependencies": {
        "react": "15.3.1",                      //react框架
        "react-native": "0.33.0",               //react native
        "react-native-device-info": "^0.9.5",   //获取硬件信息
        "react-native-root-toast": "^1.0.3",    //纯JS toast, 用于错误提示的小弹窗
        "react-native-swiper": "^1.4.4",        //滑动查看图片
        "react-native-tab-navigator": "^0.3.3", //纯JS底部导航条, 同时适用在iOS和Android上
        "react-native-vector-icons": "^2.0.3",  //图标库, 需要更改原生文件的组件, 查看: https://www.npmjs.com/package/react-native-vector-icons
        "react-redux": "^4.4.5",                //将redux跟react应用结合起来
        "redux": "^3.5.2",                      //数据流动的控制
        "redux-persist": "^2.0.1",              //将store对象存储到本地, 从本地恢复数据到store中
        "redux-thunk": "^2.1.0"                 //redux-thunk
        
    }

##### 访问在线服务器:
    取消注释, 在文件: app/common/constants_url.js: 
        const kUrlHost = 'http://eleteamapi.ygcr8.com/v1';    //在线服务器
    确认在线服务器是否可以访问：
        http://eleteamapi.ygcr8.com/v1/product/view?id=3
        
#### 安装出现问题
    1. Application Shop-React-Native has not been registered. This is either due to a require() error during initialization or failure to call AppRegistry.registerComponent
    解决办法:
        造成这种错误有两种情况:
        1. AppRegistry.registerComponent('项目名', () => 项目名); 与./ios/项目名/appDelegate.m中的RCTRootView *rootView = [[RCTRootView alloc] initWithBundleURL:jsCodeLocation moduleName:@"项目名" initialProperties:nil launchOptions:launchOptions]; 不同
          在Android项目中可能是./android/app/src/main/java/com/项目名/MainActivity.java中的mReactRootView.startReactApplication(mReactInstanceManager, "项目名", null); 没有保持一致，修改方法：编辑成相同的参数即可。
        2. 有可能你同时在运行一个以上的程序。如果你的react-native在运行程序A而你打开了程序B，也会出现相同的问题。解决方法：关闭其它React Native程序, 只运行一个。
        
#### react-native 的学习文档: 
    入门基础: http://reactnative.cn/docs/0.31/getting-started.html
    组件的生命周期: http://www.race604.com/react-native-component-lifecycle
    
### 部分App界面：
![](https://github.com/EleTeam/Shop-React-Native/blob/master/screenshoot/01.png)      ![](https://github.com/EleTeam/Shop-React-Native/blob/master/screenshoot/02.jpg)      ![](https://github.com/EleTeam/Shop-React-Native/blob/master/screenshoot/03.jpg)     

![](https://github.com/EleTeam/Shop-React-Native/blob/master/screenshoot/04.jpg)      ![](https://github.com/EleTeam/Shop-React-Native/blob/master/screenshoot/05.png)      ![](https://github.com/EleTeam/Shop-React-Native/blob/master/screenshoot/06.jpg)        

###### @author Tony Wong
###### @email 908601756@qq.com
###### @copyright Copyright © 2016 EleTeam. All rights reserved.
###### @license The MIT License (MIT)

###### 此源码遵守 The MIT License (MIT)，可用于商业上，但是因此带来的商业损失EleTeam团队不承担责任。
