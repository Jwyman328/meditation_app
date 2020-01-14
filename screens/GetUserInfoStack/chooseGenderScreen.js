import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, Dimensions, TouchableOpacity } from 'react-native';
import colors from '../../constants/colors'
import { Ionicons } from '@expo/vector-icons'
import { useDispatch, useSelector } from 'react-redux'
import SetUserHealthData from '../../store/actions/setUserHealthData'


function ChooseGenderScreen(props) {
    const [gender, setGender] = useState('Male')
    const firstTime = props.navigation.getParam('firstTime')
    const healthData = useSelector((state) => state.meditations.userHealthData)
    const token = useSelector((state) => state.meditations.token)
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
            <TouchableOpacity onPress={goToChooseGender} >
                <View style={styles.buttonContainer}>
                    <View style={styles.text}>
                        <Text style={{ color: 'black', opacity: 1, fontSize: 25 }}> Continue </Text>
                    </View>
                </View>
            </TouchableOpacity>
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