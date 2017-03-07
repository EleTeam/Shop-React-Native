/**
 * ShopReactNative
 *
 * @author Tony Wong
 * @date 2016-08-13
 * @email 908601756@qq.com
 * @copyright Copyright © 2016 EleTeam
 * @license The MIT License (MIT)
 */

/**
 * 服务器地址
 * @type {string}
 */

// const kUrlHost = 'http://local.api.eleteam.com/v1'; //本地服务器
const kUrlHost = 'http://api.eleteam.com/v1';    //在线服务器

//产品和分类
export const kUrlCategoryListWithProduct    = kUrlHost + '/category/list-with-product';
export const kUrlProductView                = kUrlHost + '/product/view?id=';

//首页
export const kUrlBannerList                 = kUrlHost + '/banner/list';
export const kUrlHomeListArticles           = kUrlHost + '/home/list-articles';

//文章
export const kUrlArticleView                = kUrlHost + '/cms-article/view?id=';

//购物车
export const kUrlCart                       = kUrlHost + '/cart';
export const kUrlCartAdd                    = kUrlHost + '/cart/add';

//用户
export const kUrlUserRegister               = kUrlHost + '/user/register';
export const kUrlUserLogin                  = kUrlHost + '/user/login';
export const kUrlUserLogout                 = kUrlHost + '/user/logout';

//预订单
export const kUrlPreorderCreate             = kUrlHost + '/preorder/create';
export const kUrlPreorderView               = kUrlHost + '/preorder/view?id=';

//订单
export const kUrlOrderCreate                = kUrlHost + '/order/create';
export const kUrlOrderView                  = kUrlHost + '/order/view?id=';
export const kUrlOrderIndex                 = kUrlHost + '/order/index';

//地址
export const kUrlAddressList                = kUrlHost + '/address/index';
export const kUrlAddressCreate              = kUrlHost + '/address/create';
export const kUrlAddressDelete              = kUrlHost + '/address/delete';
