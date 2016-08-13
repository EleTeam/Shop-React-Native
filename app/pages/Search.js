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
    TextInput,
    Image,
    ListView,
    ScrollView,
    Animated,
    TouchableOpacity,
    InteractionManager
} from 'react-native';

import {
    fetchKeywords,
    selectKeyword,
    resetState,
    setupSearchText,
    clearHistory,
    fetchSearchResults,
    changeSortViewStatus,
    changeOrderAscStatus,
    changeHealthLight,
    selectSortType,
    selectFoodTag,
    fetchSortTypes,
    selectCompareFood,
} from '../actions/searchActions';

import Icon from 'react-native-vector-icons/FontAwesome';
import Common from '../common/constants';
import SearchInputBar from '../components/SearchInputBar';
import Loading from '../components/Loading';
import LoadMoreFooter from '../components/LoadMoreFooter';
import FoodInfoContainer from '../containers/FoodInfoContainer';

let page = 1;
let canLoadMore = false;
let isLoading = true;

export default class Search extends React.Component {

    constructor(props) {
        super(props);

        this.renderRow = this.renderRow.bind(this);
        this.renderResultRow = this.renderResultRow.bind(this);

        this.state = {
            dataSource: new ListView.DataSource({
                getRowData: (data, sectionID, rowID) => {
                    if (rowID === 'clear') return '清空历史记录';
                    return data[sectionID][rowID];
                },
                getSectionHeaderData: (data, sectionID) => {
                    return sectionID === 'history' ? '最近搜过' : '大家都在搜';
                },
                rowHasChanged: (row1, row2) => row1 !== row2,
                sectionHeaderHasChanged: (section1, section2) => section1 !== section2,
            }),

            resultDataSource: new ListView.DataSource({
                rowHasChanged: (row1, row2) => row1 !== row2,
            }),

            // 排序视图Y值
            sortTypeViewY: new Animated.Value(0),
            // 排序三角角度
            angleRotation: new Animated.Value(0),
            // 遮盖层透明度
            coverViewOpacity: new Animated.Value(0),
        }
    }

    componentDidMount() {
        const {dispatch} = this.props;
        InteractionManager.runAfterInteractions(()=> {
            dispatch(fetchKeywords());
            dispatch(fetchSortTypes());
        })
    }

    componentWillUnmount() {
        const { dispatch } = this.props;
        dispatch(resetState());
    }

    render() {

        const {Search, dispatch} = this.props;

        // 将数据进行分组
        let sectionIDs = [];
        let rowIdentifiers = [];
        let sourceData = null;

        if (Search.history && Search.history.length) {
            sectionIDs.push('history');

            let rowID = [];
            for (let i = 0; i < Search.history.length; i++) {
                rowID.push(i);
            }

            rowID.push('clear');
            rowIdentifiers.push(rowID);
        }

        if (Search.keywordsList && Search.keywordsList.length) {
            sectionIDs.push('keywordsList');
            rowIdentifiers.push([0]);
        }

        if (Search.history && Search.history.length) {
            sourceData = {'history': Search.history, 'keywordsList': [Search.keywordsList]};
        } else {
            sourceData = {'keywordsList': [Search.keywordsList]};
        }
        return (
            <View style={{flex: 1, backgroundColor: 'white'}}>
                <View style={{position: 'absolute', top: 44, height: Common.window.height-44-20}}>
                    {Search.searchText ?
                        this.renderResultView() :
                        <ListView
                            dataSource={this.state.dataSource.cloneWithRowsAndSections(sourceData, sectionIDs, rowIdentifiers)}
                            renderRow={this.renderRow}
                            renderSectionHeader={this.renderSectionHeader}
                            enableEmptySections={true}
                            bounces={false}
                            style={{height: Common.window.height-64, width: Common.window.width}}
                        />
                    }
                </View>
                <SearchInputBar
                    backAction={()=>this.props.navigator.pop()}
                    searchAction={this.handleSearchText.bind(this, Search.searchText)}
                    value={Search.searchText}
                    onChangeText={(text)=>{
                        dispatch(setupSearchText(text))
                    }}
                />
            </View>
        )
    }

    renderRow(keywords, sectionID, rowID) {

        const {dispatch} = this.props;

        if (sectionID == 'history') {
            if (rowID == 'clear') {
                return (
                    <TouchableOpacity
                        style={styles.clearHistoryRow}
                        onPress={()=>dispatch(clearHistory())}
                    >
                        <Image source={{uri: 'ic_trash'}} style={{height: 20, width: 20, marginRight: 10}}/>
                        <Text style={{color: 'gray'}}>{keywords}</Text>
                    </TouchableOpacity>
                )
            }

            // 搜索历史记录
            return (
                <TouchableOpacity
                    style={{flexDirection: 'row', alignItems: 'center'}}
                    activeOpacity={0.75}
                    onPress={this.handleSearchText.bind(this, keywords)}
                >
                    <Image source={{uri: 'ic_search_history'}} style={styles.historyIcon}/>
                    <View style={styles.historyTitle}>
                        <Text>{keywords}</Text>
                    </View>
                </TouchableOpacity>
            )
        }

        return (
            <View style={styles.keywordsContainer}>
                {
                    keywords.map((keyword, i) => {
                        let keywordStyle = [styles.keyword]
                        let left = i % 2 === 0 ? 0 : Common.window.width / 2;
                        let top = Math.floor(i / 2) * 44;
                        keywordStyle.push({
                            position: 'absolute',
                            left: left,
                            top: top
                        });
                        return (
                            <TouchableOpacity
                                key={keyword}
                                style={keywordStyle}
                                activeOpacity={0.75}
                                onPress={this.handleSearchText.bind(this, keyword)}
                            >
                                <Text>{keyword}</Text>
                            </TouchableOpacity>
                        )
                    })
                }
            </View>
        )
    }

    handleSearchText(keyword) {

        if (!keyword || !keyword.trim().length) {
            alert('食物名称不能为空!');
            return;
        }

        const {dispatch} = this.props;
        dispatch(selectKeyword(keyword));
        this.fetchData(keyword, page, canLoadMore, isLoading);
    }

    renderSectionHeader(sectionHeader) {
        return (
            <View style={styles.sectionHeader}>
                <Text style={{fontSize: 13, color: 'gray'}}>{sectionHeader}</Text>
            </View>
        )
    }

    renderResultView() {
        const {Search, dispatch} = this.props;
        let topPosition = Search.tags.length > 0 ? 40 : 0;

        return (
            <View style={{backgroundColor: 'white'}}>
                {Search.isLoading ? <Loading /> :
                    <ListView
                        dataSource={this.state.resultDataSource.cloneWithRows(Search.searchResultList)}
                        renderRow={this.renderResultRow}
                        enableEmptySections={true}
                        onScroll={this.onScroll}
                        onEndReached={this.onEndReach.bind(this)}
                        onEndReachedThreshold={10}
                        renderFooter={this.renderFooter.bind(this)}
                        style={{
                      position: 'absolute',
                      top: 40 + topPosition,
                      height: Common.window.height-64-40-topPosition,
                      width: Common.window.width
                    }}
                    />}

                {Search.showSortTypeView ? this.renderCoverView() : null}
                {this.renderSortTypesView()}
                <ScrollView
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    bounces={false}
                    contentContainerStyle={{height: topPosition, alignItems: 'center'}}
                    style={{width: Common.window.width, backgroundColor: 'white'}}
                >
                    {Search.tags.map((tag, i)=> {

                        let tagStyle = [styles.tag];

                        if (Search.currentTag && Search.currentTag.name == tag.name) {
                            tagStyle.push({
                                borderColor: 'red',
                                color: 'red'
                            });
                        }
                        return (
                            <TouchableOpacity
                                key={i}
                                onPress={()=>{
                                    dispatch(selectFoodTag(tag));
                                    InteractionManager.runAfterInteractions(()=>{
                                        page = 1;
                                        canLoadMore = false;
                                        isLoading = true;
                                        this.fetchData(Search.searchText, page, canLoadMore, isLoading);
                                    })
                                }}
                            >
                                <Text style={tagStyle}>{tag.name}</Text>
                            </TouchableOpacity>
                        )
                    })}
                </ScrollView>
                {this.renderSortTypeCell()}
            </View>
        )
    }

    onScroll() {
        if (!canLoadMore) canLoadMore = true;
    }

    // 上拉加载
    onEndReach() {
        const {Search} = this.props;
        if (canLoadMore) {
            page++;
            isLoading = false;
            this.fetchData(Search.searchText, page, canLoadMore, isLoading);
            canLoadMore = false;
        }
    }

    renderFooter() {
        const {Search} = this.props;
        if (Search.isLoadMore) {
            return <LoadMoreFooter />
        }
    }

    renderResultRow(food) {
        // type: normal or compare
        // comparePosition: Left or Right
        let { dispatch, type, comparePosition } = this.props;

        let lightStyle = [styles.healthLight];
        if (food.health_light === 2) {
            lightStyle.push({backgroundColor: 'orange'})
        } else if (food.health_light === 3) {
            lightStyle.push({backgroundColor: 'red'})
        }

        let foodNameStyle = type === 'normal' ? {width: Common.window.width - 100} : {};

        return (
            <TouchableOpacity
                style={styles.foodsCell}
                activeOpacity={0.75}
                onPress={()=>{
                    if (type === 'normal') {
                        this.props.navigator.push({
                            name: 'FoodInfoContainer',
                            component: FoodInfoContainer,
                            passProps: {
                                food: food
                            }
                        })
                    } else {
                        dispatch(selectCompareFood(food, comparePosition));
                        this.props.navigator.pop();
                    }
                }}
            >
                <View style={{flexDirection: 'row'}}>
                    <Image style={styles.foodIcon} source={{uri: food.thumb_image_url}}/>
                    <View style={styles.titleContainer}>
                        <Text style={foodNameStyle} numberOfLines={1}>{food.name}</Text>
                        <Text style={styles.calory}>
                            {food.calory}
                            <Text style={styles.unit}> 千卡/{food.weight}克</Text>
                        </Text>
                    </View>
                </View>
                {type === 'normal' ?
                    <View style={lightStyle}/> :
                    <View style={styles.addCompare}>
                        <Text style={{color: 'red'}}> + 加入对比</Text>
                    </View>
                }
            </TouchableOpacity>
        )
    }

    renderSortTypeCell() {

        const {Search, dispatch} = this.props;
        let sortTypeName = Search.currentSortType ? Search.currentSortType.name : '营养素排序';

        // 升降序/是否推荐
        let orderByName;
        if (Search.currentSortType && Search.currentSortType.name !== '常见') {
            orderByName = Search.orderByAsc ? '由低到高' : '由高到低';
        } else {
            orderByName = '推荐食物';
        }
        let orderByAscIconSource= Search.orderByAsc ? {uri: 'ic_food_ordering_up'} : {uri: 'ic_food_ordering_down'};
        let healthIconName = Search.isHealthLight ? 'check-square' : 'square-o';

        return (
            <View style={styles.sortTypeCell}>
                <TouchableOpacity
                    style={{flexDirection: 'row'}}
                    activeOpacity={0.75}
                    onPress={()=>{this.handleSortTypesViewAnimation();}}
                >
                    <Text>{sortTypeName}</Text>
                    <Animated.Image
                        style={{
                            width: 16,
                            height: 16,
                            transform: [{
                                rotate: this.state.angleRotation.interpolate({
                                    inputRange: [0, 1],
                                    outputRange: ['0deg', '180deg']
                                })
                            }]
                        }}
                        source={{uri: 'ic_food_ordering'}}
                    />
                </TouchableOpacity>

                <TouchableOpacity
                    activeOpacity={0.75}
                    onPress={()=>{
                        orderByName === '推荐食物' ? dispatch(changeHealthLight())
                              : dispatch(changeOrderAscStatus());

                        InteractionManager.runAfterInteractions(()=>{
                                page = 1;
                                canLoadMore = false;
                                isLoading = true;
                                this.fetchData(Search.searchText, page, canLoadMore, isLoading);
                            })
                        }}
                >
                    {orderByName === '推荐食物' ?
                        <View style={{flexDirection: 'row'}}>
                            <Icon name={healthIconName} size={16} color="red" />
                            <Text style={{color: 'red', marginLeft: 5}}>{orderByName}</Text>
                        </View> :
                        <View style={{flexDirection: 'row'}}>
                            <Text style={{color: 'red'}}>{orderByName}</Text>
                            <Image style={{width: 16, height: 16}} source={orderByAscIconSource}/>
                        </View>}
                </TouchableOpacity>
            </View>
        )
    }

    // 排序View动画
    handleSortTypesViewAnimation() {
        const {Search, dispatch} = this.props;
        Animated.sequence([
            Animated.parallel([

                Animated.timing(this.state.sortTypeViewY, {
                    toValue: Search.showSortTypeView ? 0 : 1,
                    duration: 500,
                }),
                Animated.timing(this.state.angleRotation, {
                    toValue: Search.showSortTypeView ? 0 : 1,
                    duration: 500,
                })
            ]),
            Animated.timing(this.state.coverViewOpacity, {
                toValue: Search.showSortTypeView ? 0 : 1,
                duration: 100,
            })
        ]).start();
        // 改变排序视图状态
        dispatch(changeSortViewStatus());
    }

    // 遮盖层
    renderCoverView() {
        return (
            <TouchableOpacity
                style={{position: 'absolute',top: 80}}
                activeOpacity={1}
                onPress={()=>this.handleSortTypesViewAnimation()}
            >
                <Animated.View
                    style={{
                        width: Common.window.width,
                        height: Common.window.height - 84,
                        backgroundColor: 'rgba(131, 131, 131, 0.3)',
                        opacity: this.state.coverViewOpacity,
                    }}
                />
            </TouchableOpacity>
        )
    }

    renderSortTypesView() {
        const {Search, dispatch} = this.props;

        // 根据是否有tag来决定显示位置
        let topPosition = Search.tags.length > 0 ? 80 : 40;

        // 这里写死了8行数据
        let height = 8 * (30 + 10) + 10;

        let typesStyle = [styles.sortTypesView];
        typesStyle.push({
            top: this.state.sortTypeViewY.interpolate({
                inputRange: [0, 1],
                outputRange: [topPosition - height, topPosition]
            })
        })

        return (
            <Animated.View style={typesStyle}>
                {Search.sortTypesList.map((type, i) => {
                    let sortTypeStyle = [styles.sortType];
                    let titleStyle = [];

                    if ((Search.currentSortType && Search.currentSortType.index === type.index)
                        || (!Search.currentSortType && i === 0)) {
                        sortTypeStyle.push({
                            borderColor: 'red'
                        });
                        titleStyle.push({color: 'red'})
                    }

                    return (
                        <TouchableOpacity
                            key={i}
                            style={sortTypeStyle}
                            onPress={()=>{
                                this.handleSortTypesViewAnimation();
                                dispatch(selectSortType(type));

                                InteractionManager.runAfterInteractions(()=> {
                                    page = 1;
                                    isLoading = true;
                                    canLoadMore = false;
                                    this.fetchData(Search.searchText, page, canLoadMore, isLoading);
                                })
                            }}
                        >
                            <Text style={titleStyle}>{type.name}</Text>
                        </TouchableOpacity>
                    )
                })}
            </Animated.View>
        )
    }

    // const [page, order_by, order_asc, tags, health_light, isLoadMore, isLoading, health_mode] = params;
    fetchData(keyword, page, canLoadMore, isLoading) {
        const {dispatch, Search} = this.props;
        //  这两个参数默认不添加,设置null用于判断
        let order_by = Search.currentSortType ? Search.currentSortType.code : null;
        let health_light = Search.isHealthLight ? 1 : null;
        let order_asc = Search.orderByAsc ? 'asc' : 'desc';
        let tags = Search.currentTag ? Search.currentTag.name : '';
        dispatch(fetchSearchResults(keyword, page, order_by, order_asc, tags, health_light, canLoadMore, isLoading))
    }
}

const styles = StyleSheet.create({
    historyTitle: {
        borderBottomColor: '#ccc',
        borderBottomWidth: 0.5,
        width: Common.window.width - 15 - 10 - 16,
        marginLeft: 10,
        paddingTop: 15,
        paddingBottom: 15
    },

    historyIcon: {
        height: 16,
        width: 16,
        marginLeft: 15
    },

    clearHistoryRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
        borderBottomColor: '#ccc',
        borderBottomWidth: 0.5,
    },

    keywordsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },

    keyword: {
        width: Common.window.width / 2,
        borderBottomColor: '#ccc',
        borderBottomWidth: 0.5,
        padding: 15,
    },

    sectionHeader: {
        height: 44,
        borderBottomColor: '#ccc',
        borderBottomWidth: 0.5,
        paddingTop: 20,
        paddingLeft: 15,
        backgroundColor: 'rgb(245, 246, 247)'
    },

    tag: {
        borderRadius: 10,
        borderWidth: 0.5,
        borderColor: '#ccc',
        textAlign: 'center',
        padding: 6,
        marginLeft: 10,
    },

    sortTypeCell: {
        flexDirection: 'row',
        height: 40,
        width: Common.window.width,
        borderColor: '#ccc',
        borderBottomWidth: 0.5,
        borderTopWidth: 0.5,
        paddingLeft: 10,
        paddingRight: 10,
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: 'white'
    },


    foodsCell: {
        flexDirection: 'row',
        paddingLeft: 15,
        paddingRight: 15,
        paddingTop: 10,
        paddingBottom: 10,
        borderBottomColor: '#ccc',
        borderBottomWidth: 0.5,
        alignItems: 'center',
        justifyContent: 'space-between'
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

    sortType: {
        justifyContent: 'center',
        alignItems: 'center',
        width: (Common.window.width - 4 * 10) / 3,
        height: 30,
        borderWidth: 0.5,
        borderColor: '#ccc',
        borderRadius: 5,
        marginLeft: 10,
        marginBottom: 10,
    },

    sortTypesView: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        position: 'absolute',
        backgroundColor: 'white',
        borderBottomWidth: 0.5,
        borderBottomColor: '#ccc',
        width: Common.window.width,
        paddingTop: 10,
    },

    subcategoryContainer: {
        position: 'absolute',
        top: 30,
        right: 10,
        width: 150,
        backgroundColor: 'white',
        shadowColor: 'gray',
        shadowOffset: {x: 1.5, y: 1},
        shadowOpacity: 0.5,
    },

    subcategory: {
        borderBottomWidth: 0.5,
        borderBottomColor: '#ccc',
        height: 40,
        justifyContent: 'center',
        padding: 15,
    },

    addCompare: {
        borderWidth: 0.5,
        borderColor: 'red',
        padding: 5,
        paddingLeft: 0,
    }
})
