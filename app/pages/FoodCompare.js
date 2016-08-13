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
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
    InteractionManager,
    ListView,
    ScrollView,
} from 'react-native';
import {
    clearCompareFood,
    resetState
} from '../actions/foodCompareActions'

import Icon from 'react-native-vector-icons/Ionicons';
import Header from '../components/Header';
import Common from '../common/constants';
import SearchContainer from '../containers/SearchContainer';

export default class FoodCompare extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            dataSource: new ListView.DataSource({
                rowHasChanged: (row1, row2) => row1 !== row2
            }),

            compareResult: []
        }
    }

    componentWillReceiveProps(nextProps) {
        const {leftFoodBrief, rightFoodBrief, leftFoodBriefNames, rightFoodBriefNames} = nextProps.FoodCompare;

        let rightNutritionLength = rightFoodBrief ? rightFoodBrief.nutrition.length : 0;
        let leftNutritionLength = leftFoodBrief ? leftFoodBrief.nutrition.length : 0;

        // 显示的营养元素列表
        let nutritionList = [];

        // 已经选择了食物
        if (rightNutritionLength != 0 || leftNutritionLength != 0) {

            // 右边的多
            if (rightNutritionLength > leftNutritionLength) {
                nutritionList = rightFoodBrief.nutrition;
            } else if (rightNutritionLength < leftNutritionLength) {
                // 左边的多
                nutritionList = leftFoodBrief.nutrition;
            } else {
                // 两边一样多
                nutritionList = rightFoodBrief.nutrition;
            }
        }

        // 每行显示的数据
        let sourceData = [];

        nutritionList.map((nutrition) => {
            // 每行显示的元素
            let item = {'left': '', 'name': nutrition.name, 'right': ''};
            // 单位处理
            let unit = '';
            if (nutrition.unit) {
                unit = nutrition.unit === 'kcal' ? '千卡' : nutrition.unit;
            }

            // 左右食物的营养元素是否存在于所有元素中
            let leftIndex, rightIndex;
            if (leftFoodBrief) {
                leftIndex = leftFoodBriefNames.indexOf(nutrition.name);
            }
            if (rightFoodBrief) {
                rightIndex = rightFoodBriefNames.indexOf(nutrition.name);
            }

            // 定位到可对比的营养元素对象
            let leftData, rightData;
            if (leftIndex !== undefined && leftIndex != -1 && leftFoodBrief) {
                leftData = leftFoodBrief.nutrition[leftIndex];
            }

            if (rightIndex !== undefined && rightIndex != -1 && rightFoodBrief) {
                rightData = rightFoodBrief.nutrition[rightIndex];
            }

            // 设置营养元素最终显示结果
            if (leftData) {
                item.left = leftData.value + unit;
            } else if (leftFoodBrief) {
                item.left = '-'
            }

            if (rightData) {
                item.right = rightData.value + unit;
            } else if (rightFoodBrief) {
                item.right = '-'
            }

            sourceData.push(item);
        })

        this.setState({compareResult: sourceData})
    }

    componentWillUnmount() {
        const { dispatch } = this.props;
        dispatch(resetState());
    }

    render() {

        const {FoodCompare} = this.props;

        return (
            <View style={{backgroundColor: 'white'}}>
                <Header
                    leftIcon='angle-left'
                    leftIconAction={()=>this.props.navigator.pop()}
                    title='对比详情'
                />
                <CompareHeader
                    navigator={this.props.navigator}
                    leftFood={FoodCompare.leftFood}
                    rightFood={FoodCompare.rightFood}
                    dispatch={this.props.dispatch}
                />
                <View style={styles.header}>
                    <Text>营养元素</Text>
                </View>

                <ListView
                    dataSource={this.state.dataSource.cloneWithRows(this.state.compareResult)}
                    renderRow={this.renderRow}
                    enableEmptySections={true}
                    bounces={false}
                    showsVerticalScrollIndicator={false}
                    style={{height: Common.window.height - 64 - 150 - 40, paddingHorizontal: 10}}
                />
            </View>
        )
    }

    renderRow(data) {
        return (
            <View style={styles.nutritionCell}>
                <Text style={styles.leftNutrition}>{data.left}</Text>
                <Text style={{textAlign: 'center', fontSize:13}}>{data.name}</Text>
                <Text style={styles.rightNutrition}>{data.right}</Text>
            </View>
        )
    }
}


class CompareHeader extends React.Component {

    render() {
        const {leftFood, rightFood, dispatch} = this.props;

        return (
            <View style={styles.compareHeader}>
                {leftFood ?
                    <View style={styles.center}>
                        <Image source={{uri: leftFood.thumb_image_url}}
                               style={[styles.compareFoodDefault, {marginBottom: 0}]}/>
                        <Text numberOfLines={1} style={styles.foodTitle}>{leftFood.name}</Text>
                        <TouchableOpacity
                            activeOpacity={0.75}
                            onPress={()=>dispatch(clearCompareFood('Left'))}
                            style={styles.clearButton}
                        >
                            <Icon name="ios-close-circle" size={30}/>
                        </TouchableOpacity>
                    </View> :
                    <TouchableOpacity
                        activeOpacity={0.75}
                        onPress={this.handleSelectCompareFood.bind(this, 'Left')}
                    >
                        <Image style={styles.compareFoodDefault} source={{uri: 'img_analyze_bg'}}>
                            <Image style={styles.addIcon} source={{uri: 'ic_analyze_search_red'}}/>
                        </Image>
                    </TouchableOpacity>
                }
                <View style={styles.vsContainer}>
                    <Text style={styles.vsFont}>VS</Text>
                </View>
                {rightFood ?
                    <View style={styles.center}>
                        <Image source={{uri: rightFood.thumb_image_url}}
                               style={[styles.compareFoodDefault, {marginBottom: 0}]}/>
                        <Text numberOfLines={1} style={styles.foodTitle}>{rightFood.name}</Text>
                        <TouchableOpacity
                            activeOpacity={0.75}
                            onPress={()=>dispatch(clearCompareFood('Right'))}
                            style={styles.clearButton}
                        >
                            <Icon name="ios-close-circle" size={30}/>
                        </TouchableOpacity>
                    </View> :
                    <TouchableOpacity
                        activeOpacity={0.75}
                        onPress={this.handleSelectCompareFood.bind(this, 'Right')}
                    >
                        <Image style={styles.compareFoodDefault} source={{uri: 'img_analyze_bg'}}>
                            <Image style={styles.addIcon} source={{uri: 'ic_analyze_search_red'}}/>
                        </Image>
                    </TouchableOpacity>
                }
            </View>
        )
    }

    handleSelectCompareFood(type) {
        InteractionManager.runAfterInteractions(()=> {
            this.props.navigator.push({
                name: 'SearchContainer',
                component: SearchContainer,
                passProps: {
                    type: 'compare',
                    comparePosition: type,
                }
            })
        })
    }
}

const styles = StyleSheet.create({
    compareHeader: {
        flex: 1,
        flexDirection: 'row',
        height: 150,
        backgroundColor: 'rgb(241, 241, 241)',
        justifyContent: 'center',
        alignItems: 'center',
    },

    compareFoodDefault: {
        width: 75,
        height: 75,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 15,
    },

    addIcon: {
        width: 20,
        height: 20,
    },

    vsContainer: {
        width: 40,
        height: 40,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: Common.colors.themeColor,
        borderWidth: 1,
        marginLeft: 20,
        marginRight: 20,
    },

    vsFont: {
        color: Common.colors.themeColor,
        fontSize: 20,
    },

    header: {
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
    },

    center: {
        justifyContent: 'center',
        alignItems: 'center',
    },

    foodTitle: {
        width: 75,
        color: 'gray',
        marginTop: 5,
        textAlign: 'center'
    },

    clearButton: {
        position: 'absolute',
        top: -15,
        right: -15,
        backgroundColor: 'transparent',
    },

    nutritionCell: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        height: 40,
        borderTopColor: '#ccc',
        borderTopWidth: 0.5,
        paddingVertical: 12,
    },

    leftNutrition: {
        position: 'absolute',
        left: 0,
        fontSize: 13
    },

    rightNutrition: {
        position: 'absolute',
        right: 0,
        fontSize: 13
    }
})
