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

// const kUrlHost = 'http://local.eleteamapi.ygcr8.com/v1'; //本地服务器
const kUrlHost = 'http://eleteamapi.ygcr8.com/v1';    //在线服务器

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

//用户
export const kUrlUserRegister               = kUrlHost + '/user/register';
export const kUrlUserLogin                  = kUrlHost + '/user/login';
export const kUrlUserLogout                 = kUrlHost + '/user/logout';
