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

const kUrlHost = 'http://local.eleteamapi.ygcr8.com/v1'

//产品和分类
export const kUrlCategoryListWithProduct    = kUrlHost + '/category/list-with-product';
export const kUrlProductView                = kUrlHost + '/product/view?id=';

//广告
export const kUrlBannerList                 = kUrlHost + '/banner/list';