import React, { useState, useEffect, useCallback } from 'react'
import { Modal, View, Text, Switch, StyleSheet, ScrollView, Dimensions } from 'react-native'
import colors from '../../constants/colors'

import { useDispatch, useSelector } from 'react-redux'
import FilterMeditations from '../../store/actions/filterMeditations'

function FilterScreen(props) {

    const filters = useSelector((state) => state.meditation.filters)

    const dispatch = useDispatch()

    const setFilter = (filterName) => {
        dispatch(FilterMeditations(filterName))
    }

    return (
        <ScrollView contentContainerStyle={{...styles.mainContainer}}>


            <View styles={styles.mainContainer}>
                <View style={styles.switchesContainer}>
                    <Text style={styles.title}> Anxiety</Text>
                    <Switch trackColor={{ true: colors.strongPrimary }} thumbColor={colors.secondary} value={filters.testAnxietyFilter} onValueChange={() => { setFilter('testAnxietyFilter') }} />
                </View>

                <View style={styles.switchesContainer}>
                    <Text style={styles.title}> Depression </Text>
                    <Switch trackColor={{ true: colors.strongPrimary }} thumbColor={colors.secondary} value={filters.testDepressionFilter} onValueChange={() => { setFilter('testDepressionFilter') }} />
                </View>

                <View style={styles.switchesContainer}>
                    <Text style={styles.title}> Confidence </Text>
                    <Switch trackColor={{ true: colors.strongPrimary }} thumbColor={colors.secondary} value={filters.testConfidenceFilter} onValueChange={() => { setFilter('testConfidenceFilter') }} />
                </View>

                <View style={styles.switchesContainer}>
                    <Text style={styles.title}> Beginner </Text>
                    <Switch trackColor={{ true: colors.strongPrimary }} thumbColor={colors.secondary} value={filters.testBegginerFilter} onValueChange={() => { setFilter('testBegginerFilter') }} />
                </View>

                <View style={styles.switchesContainer}>
                    <Text style={styles.title}> Advanced </Text>
                    <Switch trackColor={{ true: colors.strongPrimary }} thumbColor={colors.secondary} value={filters.testAdvancedFilter} onValueChange={() => { setFilter('testAdvancedFilter') }} />
                </View>

                <View style={styles.switchesContainer}>
                    <Text style={styles.title}> Favorites </Text>
                    <Switch trackColor={{ true: colors.strongPrimary }} thumbColor={colors.secondary} value={filters.testFavoriteFilter} onValueChange={() => { setFilter('testFavoriteFilter') }} />
                </View>
            </View>
        </ScrollView>
    )
}

export default FilterScreen;

const styles = StyleSheet.create({
    mainContainer: {
        flex:1,
         backgroundColor: colors.primary,
        justifyContent:'center'
    },
    switchesContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: '4%',
        borderStyle: 'solid',
        borderColor: colors.base,
        borderWidth: 2,
        paddingVertical: Dimensions.get('window').height * .01,
        backgroundColor:colors.lightSecondary,
        borderRadius: Dimensions.get('window').height * .01,


    },
    title: {
        fontSize: 20,
        color: colors.strongPrimary,
        fontFamily:'Helvetica-LightOblique'
    },
    switch: {

    }
})