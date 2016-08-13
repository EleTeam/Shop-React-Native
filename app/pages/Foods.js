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
    ListView,
    Image,
    InteractionManager,
    TouchableOpacity,
} from 'react-native';

import {fetchCategories} from '../actions/foodsActions';
import Common from '../common/constants';
import SearchHeader from '../components/SearchHeader';
import Loading from '../components/Loading';
import FoodsListContainer from '../containers/FoodsListContainer';
import FoodCompareContainer from '../containers/FoodCompareContainer';
import SearchContainer from '../containers/SearchContainer';

export default class Foods extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            dataSource: new ListView.DataSource({
                rowHasChanged: (row1, row2) => row1 !== row2,
            })
        }
    }

    componentDidMount() {
        InteractionManager.runAfterInteractions(() => {
            const {dispatch} = this.props;
            dispatch(fetchCategories());
        })
    }

    render() {

        const {Foods} = this.props;
        let categoryData = Foods.categoryList;

        return (
            <View style={{flex: 1}}>
                <SearchHeader
                    searchAction={()=>{
                        InteractionManager.runAfterInteractions(()=>{
                            this.props.navigator.push({
                                name: 'Search',
                                component: SearchContainer,
                                passProps: {
                                    type: 'normal'
                                }
                            })
                        })
                    }}
                    scanAction={()=>alert('scan')}
                />

                <CompareCell onPress={()=>{
                    InteractionManager.runAfterInteractions(()=>{
                        this.props.navigator.push({
                            name: 'FoodCompare',
                            component: FoodCompareContainer,
                        })
                    })
                }}/>
                {Foods.isLoading ?
                    <Loading /> :
                    <ListView
                        dataSource={this.state.dataSource.cloneWithRows(categoryData)}
                        renderRow={this._renderRow.bind(this)}
                        enableEmptySections={true}
                        bounces={false}
                        showsVerticalScrollIndicator={false}
                        style={styles.listView}
                    />
                }
            </View>
        )
    }

    _renderRow(group) {

        let title = '食物分类'
        if (group.kind == 'brand') {
            title = '热门品牌';
        } else if (group.kind == 'restaurant') {
            title = '连锁餐饮';
        }

        return (
            <View style={styles.groupCell}>
                <View style={styles.sectionHeader}>
                    <Text>{title}</Text>
                    <View style={styles.line}/>
                </View>
                <View style={styles.categoryContainer}>
                    {
                        group.categories.map((category) => {
                            return (
                                <TouchableOpacity
                                    key={category.id}
                                    style={styles.category}
                                    onPress={()=>{
                                        InteractionManager.runAfterInteractions(() => {
                                            this.props.navigator.push({
                                                name: 'FoodsListContainer',
                                                component: FoodsListContainer,
                                                passProps: {
                                                    kind: group.kind,
                                                    category: category,
                                                }
                                            })
                                        })
                                    }}
                                >
                                    <Image
                                        style={styles.categoryIcon}
                                        source={{uri: category.image_url}}
                                    />
                                    <Text style={styles.categoryTitle}>{category.name}</Text>
                                </TouchableOpacity>
                            )
                        })
                    }
                </View>
            </View>
        )
    }

}

class CompareCell extends React.Component {
    render() {
        return (
            <TouchableOpacity
                activeOpacity={0.75}
                style={styles.compareCell}
                {...this.props}
            >
                <View style={styles.leftContainer}>
                    <View style={styles.vsIcon}>
                        <Text style={{color: 'white', fontSize: 10, fontWeight: 'bold'}}>VS</Text>
                    </View>
                    <View style={styles.compareTitleContainer}>
                        <Text>食物对比</Text>
                        <Text style={styles.compareSubTitle}>食物数据大PK</Text>
                    </View>
                </View>
                <Image style={styles.goIcon} source={{uri: 'ic_my_right'}}/>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({

    listView: {
        flex: 1,
        marginBottom: 49,
    },

    compareCell: {
        flexDirection: 'row',
        padding: 10,
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottomColor: '#ccc',
        borderBottomWidth: 0.5
    },

    leftContainer: {
        flexDirection: 'row',
        alignItems: 'center'
    },

    vsIcon: {
        width: 20,
        height: 20,
        borderRadius: 10,
        backgroundColor: 'orange',
        justifyContent: 'center',
        alignItems: 'center',
    },

    compareTitleContainer: {
        marginLeft: 10,
    },

    compareSubTitle: {
        color: 'gray',
        marginTop: 4,
        fontSize: 12,
    },

    goIcon: {
        width: 20,
        height: 20,
    },

    groupCell: {
        borderTopColor: 'rgb(241, 241, 241)',
        borderTopWidth: 10,
        paddingTop: 10,
    },

    sectionHeader: {
        alignItems: 'center'
    },

    line: {
        width: 30,
        height: 2,
        marginTop: 10,
        backgroundColor: 'red'
    },

    categoryContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: 25,
    },

    category: {
        width: Common.window.width / 3,
        alignItems: 'center',
        marginBottom: 25,
    },

    categoryIcon: {
        width: 40,
        height: 40,
    },

    categoryTitle: {
        color: 'gray',
        fontSize: 12,
        marginTop: 5,
    },
})