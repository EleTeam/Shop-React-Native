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
    Image,
    Text,
    ScrollView,
    TouchableOpacity,
    InteractionManager,
} from 'react-native';
import {
    fetchFoodInfo,
    changeUnitsStatus,
} from '../actions/foodInfoActions';

import Icon from 'react-native-vector-icons/FontAwesome';
import Loading from '../components/Loading';
import Common from '../common/constants';
import Header from '../components/Header';
import FoodAllIngredient from '../pages/FoodAllIngredient';

// 初始显示5个营养元素
const ingredientProps = ['calory', 'protein', 'fat', 'carbohydrate', 'fiber_dietary'];

export default class FoodInfo extends React.Component {

    componentDidMount() {
        const {dispatch, food} = this.props;
        dispatch(fetchFoodInfo(food.code))
    }

    render() {
        const {FoodInfo, food, dispatch} = this.props;
        let fetchedFood = FoodInfo.food;
        // 所含热量数组
        let units = [];
        if (fetchedFood) {
            if (fetchedFood.units.length > 2) {
                if (FoodInfo.isShowAllUnit) {
                    units = fetchedFood.units;
                } else {
                    units = fetchedFood.units.slice(0, 2);
                }
            } else {
                units = fetchedFood.units;
            }
        }

        let remindTitle = FoodInfo.isShowAllUnit ? '收起' : '展开';
        let angleName = FoodInfo.isShowAllUnit ? 'angle-up' : 'angle-down';

        return (
            <View style={styles.container}>
                <Header
                    leftIcon='angle-left'
                    leftIconAction={()=>this.props.navigator.pop()}
                    title={food.name}
                    rightIcon="heart-o"
                    rightIconAction={()=>alert('like')}
                />
                {FoodInfo.isFetchingFood ?
                    <Loading /> :
                    <ScrollView
                        bounces={false}
                        showsVerticalScrollIndicator={false}
                        style={styles.scrollView}
                    >
                        <View style={styles.headerSection}>
                            <View style={styles.foodNameHeader}>
                                <Image
                                    style={styles.thumbImage}
                                    source={{uri: FoodInfo.food.thumb_image_url}}
                                />
                                <View style={styles.nameContainer}>
                                    <Text>{FoodInfo.food.name}</Text>
                                    <View style={styles.foodName}>
                                        <Text style={{fontSize: 13}}>
                                            <Text style={{fontSize: 22, fontWeight: 'bold'}}>
                                                {FoodInfo.food.calory}千卡
                                            </Text>
                                            / 每{FoodInfo.food.weight}克
                                        </Text>
                                    </View>
                                </View>
                                <View style={styles.units}>
                                    <TouchableOpacity
                                        style={{marginRight: 8, height: 25, borderBottomWidth: 1, borderColor: 'red'}}
                                    >
                                        <Text>千卡</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity>
                                        <Text>千焦</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                            <View style={{justifyContent: 'space-between', flexDirection: 'row', marginTop: 20}}>
                                <TouchableOpacity style={styles.addOrCompareItem}>
                                    <Text style={{color: 'red'}}>+ 添加记录</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.addOrCompareItem}>
                                    <Text style={{color: 'red'}}>+ 加入对比</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={styles.caloryContainer}>
                                {(fetchedFood && (fetchedFood.compare.target_name || units.length)) ?
                                    <Text>所含热量:</Text> : null}
                                {fetchedFood && fetchedFood.compare.target_name && <View style={styles.compareCell}>
                                    <Image
                                        style={styles.thumbImage}
                                        source={{uri: fetchedFood.compare.target_image_url}}
                                    />
                                    <View style={{height: 50, justifyContent: 'space-between'}}>
                                        <Text
                                            style={{color: 'red', fontSize: 20}}>x {fetchedFood.compare.amount1}</Text>
                                        <Text
                                            style={{color: 'gray', fontSize: 13}}>{`${fetchedFood.compare.amount0}${fetchedFood.compare.unit0}${food.name} ≈ ${fetchedFood.compare.amount1}${fetchedFood.compare.target_name}`}</Text>
                                    </View>
                                </View>}
                                {units.map((item, i) => {
                                    return (
                                        <View key={i} style={styles.unitCell}>
                                            <Text
                                                style={{fontSize: 12}}>{`${Math.floor(item.amount)} ${item.unit}`}</Text>
                                            <View
                                                style={{flexDirection: 'row', width: 120, justifyContent: 'space-between'}}>
                                                <Text
                                                    style={{color: 'gray', fontSize: 12}}>{`${Math.floor(item.weight)} 克`}</Text>
                                                <Text
                                                    style={{color: 'gray', fontSize: 12}}>{`${Math.floor(item.calory)} 千卡`}</Text>
                                            </View>
                                        </View>
                                    )
                                })}
                                {fetchedFood && fetchedFood.units.length > 2 &&
                                <TouchableOpacity
                                    activeOpacity={0.75}
                                    style={styles.statusCell}
                                    onPress={()=>dispatch(changeUnitsStatus())}
                                >
                                    <Icon name={angleName} color="#ccc" size={15}/>
                                    <Text style={{color: 'gray', fontSize: 13, marginLeft: 10}}>{remindTitle}</Text>
                                </TouchableOpacity>
                                }
                            </View>
                        </View>
                        <View style={styles.nutritionsSection}>
                            <View style={styles.nutritionHeader}>
                                <Text style={{flex: 2, color:'gray', fontSize: 13}}>营养元素</Text>
                                <Text style={{flex: 1, color:'gray', fontSize: 13, textAlign: 'right'}}>每100克</Text>
                                <Text style={{flex: 1, color:'gray', fontSize: 13, textAlign: 'right'}}>备注</Text>
                            </View>
                            <View>
                                {fetchedFood && ingredientProps.map((props, i) => {
                                    let itemUnit = `${fetchedFood.ingredient[props]} ${Common.ingredientMapper[props].unit}`;
                                    if (fetchedFood.ingredient[props] === '') {
                                        itemUnit = '-'
                                    }

                                    return (
                                        <View key={i} style={styles.nutritionHeader}>
                                            <Text
                                                style={{flex: 2, fontSize: 13}}>{Common.ingredientMapper[props].name}</Text>
                                            <Text
                                                style={{flex: 1, fontSize: 13, textAlign: 'right'}}>{itemUnit}</Text>
                                            <Text style={{flex: 1, fontSize: 13, textAlign: 'right', color: 'red'}}>{fetchedFood.lights[props]}</Text>
                                        </View>
                                    )
                                })}
                                <TouchableOpacity
                                    activeOpacity={0.75}
                                    style={styles.statusCell}
                                    onPress={()=>{
                                        InteractionManager.runAfterInteractions(() => {
                                            this.props.navigator.push({
                                                name: 'FoodAllIngredient',
                                                component: FoodAllIngredient,
                                                passProps: {
                                                    food: fetchedFood
                                                }
                                            })
                                        })
                                    }}
                                >
                                    <Text style={{fontSize: 13, color: 'gray'}}>更多营养元素</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </ScrollView>
                }
                <View style={styles.toolBar}>

                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgb(228, 229, 230)',
    },

    scrollView: {
        height: Common.window.height - 64 - 40,
        paddingTop: 25,
        backgroundColor: 'rgb(241, 241, 241)',
    },

    headerSection: {
        backgroundColor: 'white',
        paddingHorizontal: 15,
        flex: 1,
    },

    foodNameHeader: {
        flexDirection: 'row',
        backgroundColor: 'white',
        height: 80,
        width: Common.window.width - 15 * 2,
        alignItems: 'center',
        padding: 10,
        shadowColor: 'gray',
        shadowOffset: {x: 1, y: 1},
        shadowOpacity: 0.5,
        marginTop: -10,
    },

    thumbImage: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight: 10,
    },

    nameContainer: {
        height: 50,
        justifyContent: 'space-between',
    },

    foodName: {
        flexDirection: 'row'
    },

    units: {
        flexDirection: 'row',
        position: 'absolute',
        right: 10,
        bottom: 0,
        height: 25,
    },

    addOrCompareItem: {
        borderColor: 'red',
        borderWidth: 0.7,
        justifyContent: 'center',
        alignItems: 'center',
        width: (Common.window.width - 15 * 3) / 2,
        height: 35,
        borderRadius: 4,
    },

    caloryContainer: {
        marginTop: 15,
    },

    compareCell: {
        flexDirection: 'row',
        height: 80,
        paddingVertical: 15,
        alignItems: 'center',
    },

    unitCell: {
        flexDirection: 'row',
        height: 40,
        width: Common.window.width - 15 * 2,
        borderBottomWidth: 0.5,
        borderColor: '#ccc',
        alignItems: 'center',
        justifyContent: 'space-between'
    },

    statusCell: {
        flexDirection: 'row',
        height: 40,
        alignItems: 'center',
        justifyContent: 'center'
    },

    nutritionsSection: {
        backgroundColor: 'white',
        marginTop: 10,
        paddingHorizontal: 15,
        paddingBottom: 40,
    },

    nutritionHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 40,
        borderBottomWidth: 0.5,
        borderColor: '#ccc',
    },

    toolBar: {
        position: 'absolute',
        height: 40,
        bottom: 0,
        right: 0,
        left: 0,
        borderTopWidth: 0.5,
        borderColor: '#ccc',
        backgroundColor: 'white'
    }

})