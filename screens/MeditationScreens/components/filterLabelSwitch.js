import React, { useState, useEffect, useCallback } from 'react'
import { Modal, View, Text, Switch, StyleSheet, ScrollView, Dimensions } from 'react-native'
import colors from '../../../constants/colors'

import { useDispatch, useSelector } from 'react-redux'
import FilterMeditations from '../../../store/actions/meditation_actions/filterMeditations'
import PropTypes from 'prop-types'

/**
 * Row of Meditation filter catagory adn switch allowing ability to filter meditations based on catagory.
 * 
 */
function FilterLabelSwitch(props) {
    const dispatch = useDispatch()
    const setFilter = (filterName) => {
        dispatch(FilterMeditations(filterName))
    }
    return (
        <View style={styles.switchesContainer}>
            <Text testID={`label${props.title}`} style={styles.title}>{props.title}</Text>
            <Switch testID={`switch${props.title}`} trackColor={{ true: colors.strongPrimary }} thumbColor={colors.secondary} value={props.value} onValueChange={() => { setFilter(props.filterValue) }} />
        </View>
    )
}

export default FilterLabelSwitch;
FilterLabelSwitch.propTypes = {
    /**text title of the filter */
    title: PropTypes.string,
    //**value if the switch is on or off */
    value: PropTypes.bool,
    /**value to be filtered on or off */
    filterValue: PropTypes.string
}

const styles = StyleSheet.create({
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
})