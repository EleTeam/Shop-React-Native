/**
 * ShopReactNative
 *
 * @author Tony Wong
 * @date 2016-08-13
 * @email 908601756@qq.com
 * @copyright Copyright © 2016 EleTeam
 * @license The MIT License (MIT)
 */

import { AsyncStorage } from 'react-native';

let UserDefaults = {
    setObject: (key, value) => {
        const jsonValue = JSON.stringify(value);
        return AsyncStorage.setItem(key, jsonValue, (error) => {
            // console.log(key + ' setOrRemoveObject error: ' + error);
        });
    },

    cachedObject: (key) => {
        return AsyncStorage.getItem(key)
            .then((data, error) => {
                if (data) return JSON.parse(data);
                
                // console.log(key + ' cachedObject error: ' + error);
                return null;
            })
    },

    clearCachedObject: (key) => {
        return AsyncStorage.removeItem(key);
    },
}

export default UserDefaults;