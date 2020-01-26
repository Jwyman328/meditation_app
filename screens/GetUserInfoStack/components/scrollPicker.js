import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, Button, Dimensions, TouchableOpacity } from 'react-native';
import colors from '../../../constants/colors'
import ScrollPicker from 'react-native-wheel-scroll-picker';
import { useDispatch, useSelector } from 'react-redux'
import SetUserHealthData from '../../../store/actions/setUserHealthData'


function MyScrollPicker(props){



    return(
        <View style={styles.pickerContainer}>
        <ScrollPicker
            dataSource={
                props.dataSource
            }
            selectedIndex={props.selectedIndex()}
            renderItem={(data, index, isSelected) => {
                //
            }}
            onValueChange={(data, selectedIndex) => {
                //
                const valueAdjusted = props.valueChange(selectedIndex)
                props.setValue(valueAdjusted)
            }}

            wrapperHeight={250}
            wrapperWidth={70}
            wrapperBackground={'white'}
            itemHeight={70}
            highlightColor={colors.base}
            highlightBorderWidth={5}
            activeItemColor={'#222121'}
            itemColor={colors.strongPrimary}
        /></View>
    )
}

export default MyScrollPicker;

const styles = StyleSheet.create({
    pickerContainer: {
        width: Dimensions.get('window').width * .8,
        height: Dimensions.get('window').height * .6,
    },
    text: {
        opacity: 1,

    },
})
