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
    View,
    Text,
    ScrollView,
} from 'react-native';

import Common from '../common/constants';
import Header from '../components/Header';

export default class FoodAllIngredient extends React.Component {
    render() {
        const {food} = this.props;

        let ingredientNames = [];
        for (let ingredient in Common.ingredientMapper) {
            ingredientNames.push(ingredient)
        }

        return (
            <View style={styles.container}>
                <Header
                    leftIcon='angle-left'
                    leftIconAction={()=>this.props.navigator.pop()}
                    title="营养信息"
                />
                <View style={styles.nutritionHeader}>
                    <Text style={{flex: 2, color:'gray', fontSize: 13}}>营养元素</Text>
                    <Text style={{flex: 1, color:'gray', fontSize: 13, textAlign: 'right'}}>每100克</Text>
                    <Text style={{flex: 1, color:'gray', fontSize: 13, textAlign: 'right'}}>备注</Text>
                </View>
                <ScrollView
                    bounces={false}
                    showsVerticalScrollIndicator={false}
                    style={{paddingHorizontal: 15}}
                >

                    {ingredientNames.map((ingredient, i) => {

                        let itemUnit = `${food.ingredient[ingredient]} ${Common.ingredientMapper[ingredient].unit}`;
                        if (food.ingredient[ingredient] === '') {
                            itemUnit = '-'
                        }
                        return (
                            <View key={i} style={[styles.nutritionHeader, {paddingHorizontal: 0}]}>
                                <Text
                                    style={{flex: 2, fontSize: 13}}>{Common.ingredientMapper[ingredient].name}</Text>
                                <Text
                                    style={{flex: 1, fontSize: 13, textAlign: 'right'}}>{itemUnit}</Text>
                                <Text
                                    style={{flex: 1, fontSize: 13, textAlign: 'right', color: 'red'}}>{food.lights[ingredient]}</Text>
                            </View>
                        )
                    })}
                </ScrollView>
            </View>
        )
    }
}

const styles = {
    container: {
        flex: 1,
        backgroundColor: 'white',
    },

    nutritionHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 40,
        borderBottomWidth: 0.5,
        borderColor: '#ccc',
        paddingHorizontal: 15
    },
}