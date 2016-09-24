/**
 * ShopReactNative
 *
 * @author Tony Wong
 * @date 2016-09-24
 * @email 908601756@qq.com
 * @copyright Copyright © 2016 EleTeam
 * @license The MIT License (MIT)
 */

'use strict';

import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    ScrollView,
    Text,
    Image,
    InteractionManager,
    TouchableOpacity,
} from 'react-native';
import DeviceInfo from 'react-native-device-info';
import Common from '../common/constants';

export default class FunPage extends Component {
    render() {
        return (
            <ScrollView style={styles.container}>
                <View style={styles.headerWrap}>
                    <Text style={styles.header}>好玩集市</Text>
                </View>
                <View style={styles.mainWrap}>
                    <DeviceComponent />
                </View>
            </ScrollView>
        )
    }
}

class DeviceComponent extends Component {
    render(){
        console.log(DeviceInfo);
        // console.log("Device Unique ID", DeviceInfo.getUniqueID());  // e.g. FCDBD8EF-62FC-4ECB-B2F5-92C9E79AC7F9
        // * note this is IDFV on iOS so it will change if all apps from the current apps vendor have been previously uninstalled
        // console.log("Device Manufacturer", DeviceInfo.getManufacturer());  // e.g. Apple
        // console.log("Device Brand", DeviceInfo.getBrand());  // e.g. Apple / htc / Xiaomi
        // console.log("Device Model", DeviceInfo.getModel());  // e.g. iPhone 6
        // console.log("Device ID", DeviceInfo.getDeviceId());  // e.g. iPhone7,2 / or the board on Android e.g. goldfish
        // console.log("System Name", DeviceInfo.getSystemName());  // e.g. iPhone OS
        // console.log("System Version", DeviceInfo.getSystemVersion());  // e.g. 9.0
        // console.log("Bundle ID", DeviceInfo.getBundleId());  // e.g. com.learnium.mobile
        // console.log("Build Number", DeviceInfo.getBuildNumber());  // e.g. 89
        // console.log("App Version", DeviceInfo.getVersion());  // e.g. 1.1.0
        // console.log("App Version (Readable)", DeviceInfo.getReadableVersion());  // e.g. 1.1.0.89
        // console.log("Device Name", DeviceInfo.getDeviceName());  // e.g. Becca's iPhone 6
        // console.log("User Agent", DeviceInfo.getUserAgent()); // e.g. Dalvik/2.1.0 (Linux; U; Android 5.1; Google Nexus 4 - 5.1.0 - API 22 - 768x1280 Build/LMY47D)
        // console.log("Device Locale", DeviceInfo.getDeviceLocale()); // e.g en-US
        // console.log("Device Country", DeviceInfo.getDeviceCountry()); // e.g US
        // console.log("App Instance ID", DeviceInfo.getInstanceID()); // ANDROID ONLY - see https://developers.google.com/instance-id/

        return (
            <View style={styles.deviceInfoWrap}>
                <Text style={styles.deviceTitle}>我的设备</Text>
                <View style={styles.deviceRow}>
                    <View style={styles.deviceItem}>
                        <Text style={styles.deviceName}>型号:</Text>
                        <Text style={styles.deviceValue}>{DeviceInfo.getModel()}</Text>
                    </View>
                    <View style={styles.deviceItem}>
                        <Text style={styles.deviceName}>手机版本:</Text>
                        <Text style={styles.deviceValue}>{DeviceInfo.getSystemVersion()}</Text>
                    </View>
                </View>
                <View style={styles.deviceRow}>
                    <View style={styles.deviceItem}>
                        <Text style={styles.deviceName}>厂家:</Text>
                        <Text style={styles.deviceValue}>{DeviceInfo.getManufacturer()}</Text>
                    </View>
                    <View style={styles.deviceItem}>
                        <Text style={styles.deviceName}>APP版本:</Text>
                        <Text style={styles.deviceValue}>{DeviceInfo.getVersion()}</Text>
                    </View>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#eee',
    },
    headerWrap: {
        alignItems: 'center',
        height: 44,
        backgroundColor: '#ff7419',
    },
    header: {
        color: '#fff',
        paddingTop: 22,
        fontSize: 16,
    },
    mainWrap: {
    },

    //我的设备
    deviceInfoWrap: {
        padding: 10,
        backgroundColor: 'white',
    },
    deviceTitle: {
        fontSize: 15,
        color: '#383838',
    },
    deviceRow: {
        flexDirection: 'row',
        marginTop: 8,
    },
    deviceItem: {
        flex: 1,
        flexDirection: 'row',
        width: (Common.width - 20 ) / 2,
    },
    deviceName: {
        fontSize: 14,
        color: '#555',
    },
    deviceValue: {
        fontSize: 13,
        color: '#777',
        marginLeft: 2,
    },
});