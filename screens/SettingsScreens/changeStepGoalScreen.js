import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, Button, TextInput, Dimensions, TouchableWithoutFeedback, Keyboard } from 'react-native';

import { useDispatch, useSelector } from 'react-redux'
import LogOutUser from '../../store/actions/logOut'
import MainButton from '../../components/MainButton'
import colors from '../../constants/colors'

import changeDailyStepGoal from '../../store/actions/changeDailyStepGoal'


/**
 * Allow user to change current daily step goal.
 * 
 */
function ChangeStepGoalScreen(props) {
    // get the data whenever it loads 

    const isLoggedIn = useSelector(state => state.AuthData.loggedIn)
    const token = useSelector(state => state.AuthData.token)

    let dailyStepGoal = useSelector((state) => state.Fitness.dailyStepGoal)
    const [dailyGoalLocal, setdailyGoalLocal] = useState(dailyStepGoal)

    /**
     * Change daily step goal input on inputText
     * @param {number} value 
     */
    const handleChangeStepGoal = (value) => {
        setdailyGoalLocal(value)
    }

    const dispatch = useDispatch()

    /**
     * Navigate to ProfileDataScreen.
     */
    const goToProfileDataScreen = () => {
        props.navigation.navigate('ProfileDataScreen')
    }


    /**
     * Set new daily step goal.
     * Then, navigate to profileDataScreen.
     */
    const handleSubmitChangeStepGoal = () => {
        dispatch(changeDailyStepGoal(parseInt(dailyGoalLocal), token))
        goToProfileDataScreen()
    }





    const handleTouch = () => {
        Keyboard.dismiss()
    }

    return (

        <View >
            <View style={styles.dataContainer}>
                <Text style={styles.textData}>Daily Steps</Text>
                {dailyStepGoal ? <TextInput
                    style={styles.inputcontainer}
                    onChangeText={value => handleChangeStepGoal(value)}
                    required
                    value={dailyGoalLocal.toString()} keyboardType='number-pad' autoCapitalize="none" /> : null}
            </View>


            <View style={styles.button}>
                <MainButton title='set Daily step goal' onPress={handleSubmitChangeStepGoal} />
            </View>

        </View>
    )
}

export default ChangeStepGoalScreen;

const styles = StyleSheet.create({



    boxContainer: {
        // marginTop: 100,
        marginLeft: 50,
        width: 200,
        height: 100,
        borderStyle: 'solid',
        borderColor: colors.strongPrimary,
        borderWidth: 1,
        fontSize: 18
    },
    dataContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: Dimensions.get('window').width * .9,
        height: Dimensions.get('window').height * .05,
        marginTop: Dimensions.get('window').height * .01,
    },
    textData: {
        fontSize: 20,
        fontFamily: 'Helvetica-LightOblique',
        textAlign: 'center',
        width: Dimensions.get('window').width * .45,
    },
    inputcontainer: {
        //marginLeft: 50,
        width: 150,
        height: 30,
        borderStyle: 'solid',
        borderColor: colors.strongPrimary,
        borderWidth: 1,
        fontSize: 20,
        textAlign: 'center',
    },
    button: {
        width: Dimensions.get('window').width,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: Dimensions.get('window').height * .05
    },

});