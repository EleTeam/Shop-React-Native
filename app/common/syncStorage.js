/**
 * ShopReactNative
 *
 * @author Tony Wong
 * @date 2016-09-16
 * @email 908601756@qq.com
 * @copyright Copyright © 2016 EleTeam
 * @license The MIT License (MIT)
 */

/**
 * 同步缓存的实现
 * It is simple wrapper around AsyncStorage with sync get, set, remove methods and background syncing with AsyncStorage.
 * 调用: 应该放在启动页Splash.js里, 使用地方如下:
 * import syncStorage from 'react-native-sync-storage'
 ...
 await syncStorage.init // somewhere where you can wait for loading storage, 首次载入需要,其它地方不用
 ...
 syncStorage.get('property')
 syncStorage.set('property', 2333)
 syncStorage.remove('property')
 */

'use strict';

import { AsyncStorage } from 'react-native'

const kStorage = 'kStorage';
const kStorageUser = 'kStorageUser';
const kStorageAppCartCookieId = 'kStorageAppCartCookieId';

let getState = async () => {
    let savedState = await AsyncStorage.getItem(kStorage);
    if (savedState) {
        return JSON.parse(kStorage);
    }

    return {};
};

let saveState = (state) => {
    return AsyncStorage.setItem(kStorage, JSON.stringify(state))
};

class SyncStorage {
    cache = {};

    init = new Promise(async (resolve, reject) => {
        this.cache = await getState();
        resolve();
    });

    get (property) {
        return this.cache[property];
    }

    async set (property, value) {
        if (this.cache[property] === value) return;
        this.cache[property] = value;
        await saveState(this.cache);
        return true;
    }

    async remove (property) {
        delete this.cache[property];
        await saveState(this.cache);
        return true;
    }
}

if (!global.syncStorage)
    global.syncStorage = new SyncStorage();

export default  global.syncStorage;
