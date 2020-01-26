import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, Dimensions, TouchableOpacity } from 'react-native';
import colors from '../../constants/colors'
import { Ionicons } from '@expo/vector-icons'
import { useDispatch, useSelector } from 'react-redux'
import SetUserHealthData from '../../store/actions/setUserHealthData'
import ContinueButton from './components/continueButton'


function ChooseGenderScreen(props) {
    const firstTime = props.navigation.getParam('firstTime')
    const healthData = useSelector((state) => state.ProfileData.userHealthData)
    const [gender, setGender] = firstTime? useState("Male") :useState(healthData.gender)
    const token = useSelector((state) => state.AuthData.token)
    const dispatch = useDispatch()

    const changeGender = (gender) => {
        setGender(gender)
        healthData.gender = gender
    }
    const goToChooseGender = () => {
        firstTime?  dispatch(SetUserHealthData('gender',gender, false))
            : dispatch(SetUserHealthData('gender',gender, true, healthData, token))
        firstTime?props.navigation.navigate('ChooseWeight', {firstTime:true}) : props.navigation.navigate('ProfileDataScreen')
    }

    return (
        <View style={styles.container}>
            <View style={styles.textContainer}>
                <Text style={styles.textIntro}>What's Your Sex?</Text>
                <View style={styles.IconContainer}>
                    <TouchableOpacity onPress={() => changeGender('Male')}>
                        <Ionicons name='ios-man' size={135} color={gender==='Male'? colors.primary: 'grey'} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => changeGender('Female')}>
                        <Ionicons name='ios-woman' size={135} color={gender==='Female'? colors.primary: 'grey'} />
                    </TouchableOpacity>
                </View>
            </View>
            <ContinueButton goToScreen={goToChooseGender} textValue={'Continue'} />
        </View>
    )
}

export default ChooseGenderScreen;

const styles = StyleSheet.create({
    IconContainer:{
        flexDirection: 'row',
        justifyContent:'space-evenly',
        alignItems:'center',
        marginTop:Dimensions.get('window').height * .1 , 

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
        marginTop: Dimensions.get('window').height * .15,
        width: Dimensions.get('window').width * .83,
        //height: Dimensions.get('window').height,
    },
    textIntro: {
        fontSize: 24,
        fontFamily: 'Helvetica-Oblique',
        textAlign: 'center'
    },
    buttonContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: Dimensions.get('window').height * .23,
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height * .1,
        borderStyle: 'solid',
        borderColor: colors.strongPrimary,
        borderWidth: 0,
        backgroundColor: 'white',
        opacity: .3,
    },
})