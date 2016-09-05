/**
 * ShopReactNative
 *
 * @author Tony Wong
 * @date 2016-08-13
 * @email 908601756@qq.com
 * @copyright Copyright © 2016 EleTeam
 * @license The MIT License (MIT)
 */

import React, {Component} from 'react';
import {
    StyleSheet,
    TouchableOpacity,
    Text,
    View,
    ListView,
    RefreshControl,
    Image,
    InteractionManager,
} from 'react-native';
import Swiper from 'react-native-swiper';
import {bannerList, fetchFeeds} from '../actions/homeActions';
import Common from '../common/constants';
import SearchHeader from '../components/SearchHeader';
import LoadMoreFooter from '../components/LoadMoreFooter';
import FeedDetail from '../pages/FeedDetail';
import Loading from '../components/Loading';
import SearchContainer from '../containers/SearchContainer';

let page = 1;
let canLoadMore = false;
let isRefreshing = false;
let isLoading = true;

export default class HomePage extends Component {

    constructor(props) {
        super(props);

        this._renderRow = this._renderRow.bind(this);

        this.state = {
            dataSource: new ListView.DataSource({
                getRowData: (data, sectionID, rowID) => {
                    return data[sectionID][rowID];
                },
                getSectionHeaderData: (data, sectionID) => {
                    return data[sectionID];
                },
                rowHasChanged: (row1, row2) => row1 !== row2,
                sectionHeaderHasChanged: (section1, section2) => section1 !== section2,
            })
        }
    }

    componentDidMount() {
        // 交互管理器在任意交互/动画完成之后，允许安排长期的运行工作. 在所有交互都完成之后安排一个函数来运行。
        InteractionManager.runAfterInteractions(() => {
            const {dispatch} = this.props;
            dispatch(bannerList());
            dispatch(fetchFeeds(page, canLoadMore, isRefreshing, isLoading));
        });

        // const {dispatch} = this.props;
        // dispatch(bannerList());
        // dispatch(fetchFeeds(page, canLoadMore, isRefreshing, isLoading));
    }

    render() {
        const {homeReducer} = this.props;
        let bannerList = homeReducer.bannerList;
        let feedList = homeReducer.feedList;
        let sourceData = {'banner': [bannerList], 'feed': feedList};

        let sectionIDs = ['banner', 'feed'];
        let rowIDs = [[0]];

        let row = [];
        for (let i = 0; i < feedList.length; i++) {
            row.push(i);
        }
        rowIDs.push(row);

        return (
            <View>
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
                {homeReducer.isLoading ?
                    <Loading /> :
                    <ListView
                        dataSource={this.state.dataSource.cloneWithRowsAndSections(sourceData, sectionIDs, rowIDs)}
                        renderRow={this._renderRow}
                        initialListSize={1}
                        enableEmptySections={true}
                        onScroll={this._onScroll}
                        onEndReached={this._onEndReach.bind(this)}
                        onEndReachedThreshold={10}
                        renderFooter={this._renderFooter.bind(this)}
                        style={{height: Common.window.height - 64}}
                        refreshControl={
                            <RefreshControl
                                refreshing={homeReducer.isRefreshing}
                                onRefresh={this._onRefresh.bind(this)}
                                title="正在加载中……"
                                color="#ccc"
                            />
                        }
                    />
                }
            </View>
        )
    }

    _renderRow(data, sectionID, rowID) {

        if (sectionID == 'banner') {
            let bannerList = data;
            return (
                <Swiper
                    height={200}
                    loop={true}
                    autoplay={true}
                    dot={<View style={styles.customDot} />}
                    activeDot={<View style={styles.customActiveDot} />}
                    paginationStyle={{
                        bottom: 10
                    }}
                >
                    {bannerList.map((banner) => {
                        return (
                            <TouchableOpacity key={banner.name} activeOpacity={0.75}>
                                <Image
                                    style={styles.bannerImage}
                                    source={{uri: banner.image}}
                                />
                            </TouchableOpacity>
                        )
                    })}
                </Swiper>
            )
        } else {
            let feedCellStyle = [styles.feedCell];
            let sourceFontStyle = [styles.sourceFont];
            let plainContentStyle = [styles.plainContent];
            let plainPVFontStyle = [styles.plainPVFont];
            if (data.background) {
                feedCellStyle.push({height: 200})
                sourceFontStyle.push({color: 'white'})
                plainContentStyle.push({color: 'white'})
                plainPVFontStyle.push({color: 'white'})
            }

            let imageSource = data.background ? data.background : 'img_default_home_cover';

            return (
                <TouchableOpacity
                    activeOpacity={0.75}
                    onPress={this._onPressFeedItem.bind(this, data)}
                >
                    <View style={feedCellStyle}>
                        {data.background ?
                            <Image
                                style={styles.feedImage}
                                source={{uri: imageSource}}
                            >
                                <View style={styles.plainTitleContainer}>
                                    <Text style={sourceFontStyle}>{data.source}</Text>
                                </View>
                                <Text style={plainContentStyle}>{data.title}</Text>
                                <Text style={plainPVFontStyle}>{data.tail}</Text>
                            </Image>
                            :
                            <View style={styles.plainFeed}>
                                <View style={styles.plainTitleContainer}>
                                    <Text style={sourceFontStyle}>{data.source}</Text>
                                </View>
                                <Text style={plainContentStyle}>{data.title}</Text>
                                <Text style={plainPVFontStyle}>{data.tail}</Text>
                            </View>
                        }
                    </View>
                </TouchableOpacity>
            )
        }
    }

    _onPressFeedItem(feedItem) {
        InteractionManager.runAfterInteractions(() => {
            this.props.navigator.push({
                name: 'FeedDetail',
                component: FeedDetail,
                passProps: {
                    feed: feedItem,
                }
            })
        });
    }

    _renderFooter() {
        const {homeReducer} = this.props;
        if (homeReducer.isLoadMore) {
            return <LoadMoreFooter />
        }
    }

    _onScroll() {
        if (!canLoadMore) canLoadMore = true;
    }

    // 下拉刷新
    _onRefresh() {
        page = 1;
        const {dispatch} = this.props;
        canLoadMore = false;
        isRefreshing = true;
        dispatch(fetchFeeds(page, canLoadMore, isRefreshing));
        dispatch(bannerList());
    }

    // 上拉加载
    _onEndReach() {
        if (canLoadMore) {
            page++;
            const {dispatch} = this.props;
            dispatch(fetchFeeds(page, canLoadMore, false));
            canLoadMore = false;
        }
    }
}

const styles = StyleSheet.create({
    bannerImage: {
        height: 200,
        width: Common.window.width,
    },

    customDot: {
        backgroundColor: '#ccc',
        height: 1.5,
        width: 15,
        marginLeft: 2,
        marginRight: 2,
        marginTop: 2,
    },

    customActiveDot: {
        backgroundColor: 'white',
        height: 1.5,
        width: 15,
        marginLeft: 2,
        marginRight: 2,
        marginTop: 2,
    },

    feedCell: {
        padding: 15,
        paddingBottom: 0,
        overflow: 'hidden',
    },

    feedImage: {
        height: 185,
        width: Common.window.width - 15 * 2,
        paddingLeft: 15,
        paddingTop: 30,
    },

    plainFeed: {
        paddingLeft: 15,
        shadowColor: 'gray',
        shadowOffset: {x: 1.5, y: 1},
        shadowOpacity: 0.5,
        backgroundColor: 'white',
        marginBottom: 3,
    },

    plainTitleContainer: {
        marginTop: 30,
        paddingLeft: 5,
        borderLeftColor: 'red',
        borderLeftWidth: 2,
    },

    sourceFont: {
        color: 'gray',
        fontSize: 13,
    },

    plainContent: {
        marginTop: 30,
        fontWeight: 'bold',
        fontSize: 15,
        marginRight: 15,
    },

    plainPVFont: {
        marginTop: 20,
        marginBottom: 20,
        color: 'gray',
        fontSize: 13,
    }
})