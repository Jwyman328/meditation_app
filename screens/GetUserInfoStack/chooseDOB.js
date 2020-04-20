import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, Button, Dimensions, TouchableOpacity } from 'react-native';
import colors from '../../constants/colors'
import ScrollPicker from 'react-native-wheel-scroll-picker';
import { useDispatch, useSelector } from 'react-redux'
import SetUserHealthData from '../../store/actions/setUserHealthData'
import MyScrollPicker from './components/scrollPicker'
import ContinueButton from './components/continueButton'
import navigateTo from './utils/dobPostOrUpdate'
import createTickValues from './utils/scrollPickerArrayCreator'
import postAllUserHealthData from './utils/dobPostOrUpdate'

import useGetChooseDOBCustomHook from '../../customHooks/GetUserInfoStackCustomHooks/useGetChooseDOBCustomHook'
import useCreateRoladexTickValues from '../../customHooks/GetUserInfoStackCustomHooks/useCreateRoladexTickValues'

function ChooseDOB(props) {
    const {
        healthData,
        isInSignUpProcess,
        month,
        setmonth,
        year,
        setyeares,
        monthChoosen,
        setmonthChoosen,
        yearChoosen,
        setyearChoosen,
        token
      } = useGetChooseDOBCustomHook(props.navigation);

      const dispatch = useDispatch();

    const navigateToNextScreen = () => {
        healthData.DOB = {month:monthChoosen, year:yearChoosen}
        postAllUserHealthData(isInSignUpProcess, monthChoosen, yearChoosen, healthData, token,dispatch, props.navigation.navigate,'Feelings' )
        //navigateTo(isInSignUpProcess,monthChoosen,yearChoosen,healthData,token, props.navigation.navigate, dispatch )
    }


    useCreateRoladexTickValues(setmonth,setyeares)

    return (
        <View style={styles.container}>
            <View style={styles.textContainer}>
                <Text style={styles.textIntro}>Your Age</Text>
            </View>
            <View style={{ marginBottom: 10, width:200, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <Text style={styles.textIntro}>Month</Text>
                <Text style={styles.textIntro}>Year</Text>
            </View>
            {month ?
                <View style={{ width:200, flexDirection: 'row', justifyContent: 'space-evenly', alignItems:'center' }}>
                    <MyScrollPicker valueChange={(selectedValue) => selectedValue + 1} selectedIndex={() => monthChoosen -1} dataSource={month} setValue={setmonthChoosen}  />
                    <MyScrollPicker valueChange={(selectedValue) => selectedValue + 1935} selectedIndex={() => yearChoosen -1935} dataSource={year} setValue={setyearChoosen}  />
                </View> : null}
            <ContinueButton goToScreen={navigateToNextScreen} textValue={'Continue'} />
        </View>
    )
}

export default ChooseDOB;

const styles = StyleSheet.create({
    pickerContainer: {
        width: Dimensions.get('window').width * .8,
        height: Dimensions.get('window').height * .6,
    },
    text: {
        opacity: 1,

    },
    container: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
        backgroundColor: colors.lightSecondary,
        alignItems: 'center',

    },
    textContainer: {
        marginTop: Dimensions.get('window').height * .03,
        width: Dimensions.get('window').width * .83,
        //height: Dimensions.get('window').height,
        marginBottom: Dimensions.get('window').height * .05
    },
    textIntro: {
        fontSize: 24,
        fontFamily: 'Helvetica-Oblique',
        textAlign: 'center'
    },
    buttonContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        //marginTop: Dimensions.get('window').height * .05,
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height * .1,
        borderStyle: 'solid',
        borderColor: colors.strongPrimary,
        borderWidth: 0,
        backgroundColor: 'white',
        opacity: .3,
    },
})
