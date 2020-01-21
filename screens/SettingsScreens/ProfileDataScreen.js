import React, { useEffect } from 'react'
import { StyleSheet, Text, View, Dimensions, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux'
import { Ionicons } from '@expo/vector-icons'
import colors from '../../constants/colors'
import MainButton from '../../components/MainButton'
import LogOutUser from '../../store/actions/logOut'


function ProfileDataScreen(props) {

    const healthData = useSelector((state) => state.ProfileData.userHealthData)
    const weight = healthData.weight
    const heightFeet = healthData.height.feet
    const heightInch = healthData.height.inch

    const DOBMonth = healthData.DOB.month
    const DOBYear = healthData.DOB.year
    const gender = healthData.gender

    const generalUserData = useSelector((state) => state.ProfileData.generalUserData)
    let dailyStepGoal = useSelector((state) => state.Fitness.dailyStepGoal)
    let fetchDailyStepsLoading = useSelector((state) => state.Fitness.fetchDailyStepsLoading)
    let fetchDailyStepsError = useSelector((state) => state.Fitness.fetchDailyStepsError)


    const firstName = generalUserData.first_name
    const lastName = generalUserData.last_name

    const isLoggedIn = useSelector(state => state.AuthData.loggedIn)
    const token = useSelector(state => state.AuthData.token)
    const dispatch = useDispatch()

    const logOutUser = () => {
        props.navigation.navigate('Auth')
        dispatch(LogOutUser())
    }

    const changeGender = () => {
        props.navigation.navigate('chooseGender', { firstTime: false })
    }
    const changeWeight = () => {
        props.navigation.navigate('ChooseWeight', { firstTime: false })
    }
    const changeHeight = () => {
        props.navigation.navigate('ChooseHeight', { firstTime: false })
    }
    const changeDOB = () => {
        props.navigation.navigate('ChooseDOB', { firstTime: false })
    }
    const changeStepGoal = () => {
        props.navigation.navigate('ChangeStepGoalScreen')
    }
    useEffect(() => {
        if (isLoggedIn) {
            //
        } else {
            props.navigation.navigate('Auth')
        }
    }, [isLoggedIn])

    return (
        isLoggedIn ? <View style={{ justifyContent: 'center', alignItems: 'center' }}>
            <View style={styles.titleContainer}>
                <Text style={styles.TitleText}>Profile Data</Text>
            </View>
            <TouchableOpacity >
                <View style={styles.dataContainer}>
                    <Text style={styles.textData}>FirstName</Text>
                    <Text style={styles.textData}>{firstName}</Text>
                    <Ionicons name='ios-arrow-forward' size={25} color={colors.base} />

                </View>
            </TouchableOpacity>


            <TouchableOpacity >
                <View style={styles.dataContainer}>
                    <Text style={styles.textData}>Last Name</Text>
                    <Text style={styles.textData}>{lastName}</Text>
                    <Ionicons name='ios-arrow-forward' size={25} color={colors.base} />

                </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={changeWeight}>
                <View style={styles.dataContainer}>
                    <Text style={styles.textData}>Weight</Text>
                    <Text style={styles.textData}>{weight}lbs</Text>
                    <Ionicons name='ios-arrow-forward' size={25} color={colors.base} />
                </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={changeHeight}>
                <View style={styles.dataContainer}>
                    <Text style={styles.textData}>Height</Text>
                    <Text style={styles.textData}>{heightFeet}ft {heightInch}in </Text>
                    <Ionicons name='ios-arrow-forward' size={25} color={colors.base} />
                </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={changeDOB}>
                <View style={styles.dataContainer}>
                    <Text style={styles.textData}>D.O.B</Text>
                    <Text style={styles.textData}>{DOBMonth}/{DOBYear}</Text>
                    <Ionicons name='ios-arrow-forward' size={25} color={colors.base} />
                </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={changeGender}>
                <View style={styles.dataContainer}>
                    <Text style={styles.textData}>Sex</Text>
                    <Text style={styles.textData}>{gender}</Text>
                    <Ionicons name='ios-arrow-forward' size={25} color={colors.base} />
                </View>
            </TouchableOpacity>

            <View style={styles.titleContainer}>
                <Text style={styles.TitleText}>Goals</Text>
            </View>
            <TouchableOpacity onPress={changeStepGoal}>
                {fetchDailyStepsLoading ? <Text>Loading step data</Text> :

                    fetchDailyStepsError ? <Text>Error getting daily steps data</Text> :
                        <View style={styles.dataContainer}>
                            <Text style={styles.textData}>Daily Steps</Text>
                            <Text style={styles.textData}>{dailyStepGoal}</Text>
                            <Ionicons name='ios-arrow-forward' size={25} color={colors.base} />
                        </View>}
            </TouchableOpacity>

            <View style={styles.logoutButtonContainer}>
                <MainButton onPress={logOutUser} title='logout' />
            </View>


        </View> : null
    )
}

export default ProfileDataScreen;

const styles = StyleSheet.create({
    dataContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: Dimensions.get('window').width * .9,
        height: Dimensions.get('window').height * .05,
    },
    textData: {
        fontSize: 20,
        fontFamily: 'Helvetica-LightOblique',
        textAlign: 'justify',
        width: Dimensions.get('window').width * .45,
    },
    TitleText: {
        fontSize: 30,
        fontFamily: 'Helvetica-LightOblique',

    },
    titleContainer: {
        marginVertical: Dimensions.get('window').height * .03,
    },
    logoutButtonContainer: {
        marginTop: Dimensions.get('window').height * .05
    }

})