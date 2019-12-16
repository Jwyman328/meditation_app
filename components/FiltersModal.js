import React, { useState, useEffect, useCallback } from 'react'
import { Modal, View, Text, Switch, StyleSheet, ScrollView } from 'react-native'
import colors from '../constants/colors'

import {useDispatch,useSelector} from 'react-redux'
import FilterMeditations from '../store/actions/filterMeditations'

function FilterScreen(props) {

    const filters = useSelector((state)=> state.meditations.filters)

    const dispatch = useDispatch()

    const setFilter = (filterName) => {
        dispatch(FilterMeditations(filterName))
    }

    return (
        <ScrollView>



        <View style={styles.switchesContainer}>
            <Text> Anxiety</Text>
            <Switch trackColor={{true:colors.strongPrimary}} thumbColor={colors.secondary} value={filters.testAnxietyFilter} onValueChange={() => { setFilter('testAnxietyFilter') }} />
        </View>

        <View style={styles.switchesContainer}>
            <Text> Depression </Text>
            <Switch trackColor={{true:colors.strongPrimary}} thumbColor={colors.secondary} value={filters.testDepressionFilter} onValueChange={() => { setFilter('testDepressionFilter') }} />
        </View>

        <View style={styles.switchesContainer}>
            <Text> Confidence </Text>
            <Switch trackColor={{true:colors.strongPrimary}} thumbColor={colors.secondary} value={filters.testConfidenceFilter} onValueChange={() => { setFilter('testConfidenceFilter') }} />
        </View>

        <View style={styles.switchesContainer}>
            <Text> Beginner </Text>
            <Switch trackColor={{true:colors.strongPrimary}} thumbColor={colors.secondary} value={filters.testBegginerFilter} onValueChange={() => { setFilter('testBegginerFilter') }} />
        </View>

        <View style={styles.switchesContainer}>
            <Text> Advanced </Text>
            <Switch trackColor={{true:colors.strongPrimary}} thumbColor={colors.secondary} value={filters.testAdvancedFilter} onValueChange={() => { setFilter('testAdvancedFilter') }} />
        </View>

        <View style={styles.switchesContainer}>
            <Text> Favorites </Text>
            <Switch trackColor={{true:colors.strongPrimary}} thumbColor={colors.secondary} value={filters.testFavoriteFilter} onValueChange={() => { setFilter('testFavoriteFilter') }} />
        </View>

        </ScrollView>
    )
}

export default FilterScreen;

const styles = StyleSheet.create({
    switchesContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: '4%',
        borderStyle:'solid',
        borderColor: colors.base,
        borderWidth:2,
        paddingVertical: 20,
        

    },
    title: {
        fontSize: 30,
        color: colors.primary
    },
    switch: {

    }
})