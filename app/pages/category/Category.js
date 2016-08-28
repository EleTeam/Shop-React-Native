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
import {
    StyleSheet,
    View,
    ListView,
    InteractionManager,
} from 'react-native';
import CategoryList from './CategoryList';
import ProductList from './ProductList';
import {categoryListWithProduct} from '../../actions/productActions';
import Loading from '../../components/Loading';

let isLoading = true;

export default class Category extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        //交互管理器在任意交互/动画完成之后，允许安排长期的运行工作. 在所有交互都完成之后安排一个函数来运行。
        InteractionManager.runAfterInteractions(() => {
             const {dispatch} = this.props;
             dispatch(categoryListWithProduct(isLoading));
        });

        // const {dispatch} = this.props;
        // dispatch(categoryListWithProduct(isLoading));
    }

    render() {
        const {productReducer} = this.props;
        let categories = productReducer.categories;
        // alert(productReducer.isLoading);
        return (
            <View style={styles.container}>
                {productReducer.isLoading ?
                    <Loading /> :
                    <View>
                        <CategoryList categories={categories}/>
                        <ProductList categories={categories}/>
                    </View>
                }
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection:'row',
    },
})