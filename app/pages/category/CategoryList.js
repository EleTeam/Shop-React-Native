/**
 * ShopReactNative
 *
 * @author Tony Wong
 * @date 2016-08-13
 * @email 908601756@qq.com
 * @copyright Copyright © 2016 EleTeam
 * @license The MIT License (MIT)
 */

'use strict';

import React from 'react';
import { StyleSheet, View, ListView, Text, TouchableOpacity, Alert } from 'react-native';

export default class CategoryList extends React.Component {

    constructor(props) {
        super(props);
        // Alert.alert(this.props.categories);

        this._renderRow = this._renderRow.bind(this);

        let dataSource = new ListView.DataSource({
            getRowData: (data, sectionId, rowId) => {
                return data[sectionId][rowId];
            },
            getSectionHeaderData: (data, sectionId) => {
                return data[sectionId];
            },
            rowHasChanged: (row1, row2) => row1 !== row2,
            sectionHeaderHasChanged: (section1, section2) => section1 !== section2,
        });

        this.state = {
            dataSource: dataSource.cloneWithRows(props.categories)
        }
    }

    render() {
        return (
            <TouchableOpacity onPress={(rowId) => this._pressRow(rowId)}>
                <View style={styles.container}>
                    <ListView
                        dataSource={this.state.dataSource}
                        renderRow={this._renderRow.bind(this)}
                        enableEmptySections={true}
                    />
                </View>
            </TouchableOpacity>
        )
    }

    _renderRow(category, sectionId, rowId) {
        return (
            <View>
                <Text>{category.name}</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#eef0f3',
        width: 80,
    },
    category:{
        justifyContent: 'center',
        alignItems: 'center',
        height:50,
    },
    category_bg_select:{
        backgroundColor:'#d7ead6',
    },
    category_bg_normal:{
        backgroundColor:'#ffffff',
    },
    line:{
        backgroundColor:'#eef0f3',
        height:1,
    },
})