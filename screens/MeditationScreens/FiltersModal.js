import React, { useState, useEffect, useCallback } from 'react'
import { Modal, View, Text, Switch, StyleSheet, ScrollView, Dimensions } from 'react-native'
import colors from '../../constants/colors'

import { useDispatch, useSelector } from 'react-redux'
import FilterMeditations from '../../store/actions/filterMeditations'

import FilterLabelSwitch from './components/filterLabelSwitch'

function FilterScreen(props) {

    const filters = useSelector((state) => state.meditation.filters)
    const dispatch = useDispatch()

    const setFilter = (filterName) => {
        dispatch(FilterMeditations(filterName))
    }

    return (
        <ScrollView contentContainerStyle={{ ...styles.mainContainer }}>
            <View styles={styles.mainContainer}>
                <FilterLabelSwitch value={filters.testAnxietyFilter} title='Anxiety' filterValue='testAnxietyFilter' />
                <FilterLabelSwitch value={filters.testDepressionFilter} title='Depression' filterValue='testDepressionFilter' />
                <FilterLabelSwitch value={filters.testConfidenceFilter} title='Confidence' filterValue='testConfidenceFilter' />
                <FilterLabelSwitch value={filters.testBegginerFilter} title='Beginner' filterValue='testBegginerFilter' />
                <FilterLabelSwitch value={filters.testAdvancedFilter} title='Advanced' filterValue='testAdvancedFilter' />
                <FilterLabelSwitch value={filters.testFavoriteFilter} title='Favorites' filterValue='testFavoriteFilter' />
            </View>
        </ScrollView>
    )
}

export default FilterScreen;

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: colors.primary,
        justifyContent: 'center'
    },
})