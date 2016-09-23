/**
 * ShopReactNative
 *
 * @author Tony Wong
 * @date 2016-08-13
 * @email 908601756@qq.com
 * @copyright Copyright © 2016 EleTeam
 * @license The MIT License (MIT)
 */

'use strict';

/**
 * action 类型
 */

//公用类型
export const kActionError                       = 'kActionError';

//首页
export const kBannerList                        = 'kBannerList';
export const kBannerListReceived                = 'kBannerListReceived';
export const kHomeListArticles                  = 'kHomeListArticles';
export const kHomeListArticlesReceived          = 'kHomeListArticlesReceived';

// 用户
export const kUserFromSync                      = 'kUserFromSync'; //同步加载用户数据, 一般从缓存加载
export const kUserRegister                      = 'kUserRegister';
export const kUserRegisterReceived              = 'kUserRegisterReceived';
export const kUserView                          = 'kUserView';
export const kUserLogin                         = 'kUserLogin';
export const kUserLoginReceived                 = 'kUserLoginReceived';
export const kUserLogout                        = 'kUserLogout';
export const kUserLogoutReceived                = 'kUserLogoutReceived';

//商品、商品目录
export const kCategoryListWithProduct           = 'kCategoryListWithProduct';
export const kCategoryListWithProductReceived   = 'kCategoryListWithProductReceived';
export const kProductView                       = 'kProductView';
export const kProductViewReceived               = 'kProductViewReceived';

//文章
export const kArticleView                       = 'kArticleView';
export const kArticleViewReceived               = 'kArticleViewReceived';

//购物车
export const kAppCartCookieIdFromSync           = 'kAppCartCookieIdFromSync'; //同步加载数据, 一般从缓存加载
export const kCartNumFromSync                   = 'kCartNumFromSync'; //同步加载数据, 一般从商品详情页
export const kCartView                          = 'kCartView';
export const kCartViewReceived                  = 'kCartViewReceived';
export const kCartAdd                           = 'kCartAdd';
export const kCartAddReceived                   = 'kCartAddReceived';

//预订单
export const kPreorderCreate                    = 'kPreorderCreate';
export const kPreorderCreateReceived            = 'kPreorderCreateReceived';
export const kPreorderIsTurnedToViewFromSync    = 'kPreorderIsTurnedToViewFromSync';
export const kPreorderView                      = 'kPreorderView';
export const kPreorderViewReceived              = 'kPreorderViewReceived';

//地址
export const kAddressList                       = 'kAddressList';
export const kAddressListReceived               = 'kAddressListReceived';
export const kAddressCreate                     = 'kAddressCreate';
export const kAddressCreateReceived             = 'kAddressCreateReceived';
export const kAddressDelete                     = 'kAddressDelete';
export const kAddressDeleteReceived             = 'kAddressDeleteReceived';



