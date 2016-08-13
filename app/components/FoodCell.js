/**
 * ShopReactNative
 *
 * @author Tony Wong
 * @date 2016-08-13
 * @email 908601756@qq.com
 * @copyright Copyright © 2016 EleTeam
 * @license The MIT License (MIT)
 */

import React from 'react';
import {
    StyleSheet,
    TouchableOpacity,
    View,
    Text,
    Image,
} from 'react-native';

import Common from '../common/constants';

export default class FoodCell extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {

        let lightStyle = [styles.healthLight];
        if (food.health_light == 2) {
            lightStyle.push({backgroundColor: 'orange'})
        } else if (food.health_light == 3) {
            lightStyle.push({backgroundColor: 'red'})
        }

        return <View style={{width: 300, height: 20, marginTop: 10, backgroundColor: 'red'}}/>

        // return (
        //     <TouchableOpacity
        //         style={styles.foodsCell}
        //     >
        //         <View style={{flexDirection: 'row'}}>
        //             <Image style={styles.foodIcon} source={{uri: food.thumb_image_url}}/>
        //             <View style={styles.titleContainer}>
        //                 <Text style={styles.foodName} numberOfLines={1}>{food.name}</Text>
        //                 <Text style={styles.calory}>
        //                     {food.calory}
        //                     <Text style={styles.unit}> 千卡/{food.weight}克</Text>
        //                 </Text>
        //             </View>
        //         </View>
        //         <View style={lightStyle}/>
        //     </TouchableOpacity>
        // )
    }
}

const styles = StyleSheet.create({
    foodsCell: {
        flexDirection: 'row',
        paddingLeft: 15,
        paddingRight: 15,
        paddingTop: 10,
        paddingBottom: 10,
        borderBottomColor: '#ccc',
        borderBottomWidth: 0.5,
        alignItems: 'center',
        justifyContent: 'space-between',
    },

    foodIcon: {
        width: 40,
        height: 40,
        borderRadius: 20,
    },

    titleContainer: {
        height: 40,
        marginLeft: 15,
        justifyContent: 'space-between',
    },

    foodName: {
        width: Common.window.width - 15 - 15 - 40 - 15 - 10,
    },

    calory: {
        fontSize: 13,
        color: 'red',
    },

    unit: {
        fontSize: 13,
        color: 'black'
    },

    healthLight: {
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: 'green',
        marginRight: 0,
    },
})