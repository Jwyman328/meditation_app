import React, { useState, useEffect } from 'react'

import { AsyncStorage, ScrollView, Text, StyleSheet, View, KeyboardAvoidingView, TextInput, Button, Dimensions, ImageBackground } from 'react-native'
import SignUpUser from '../../store/actions/signUpUser'

import { useDispatch, useSelector } from 'react-redux'
import MainButton from '../../components/MainButton'
import colors from '../../constants/colors';

import FetchMyFeelings from '../../store/actions/FetchMyFeelings'
import UpdateFeelings from '../../store/actions/UpdateFeeling'
import AuthInputBox from '../Auth/components/authInputBox'


/**
 * Screen for allowing an existing user to login with their username and password.
 * 
 */
function SignupScreen(props) {
    const [firstName, onChangeUserFirstName] = React.useState('');
    const [lastName, onChangeUserLastName] = React.useState('');
    const [userName, onChangeUserName] = React.useState('');
    const [passWord, onChangePassword] = React.useState('');
    const [passWordTwo, onChangePasswordTwo] = React.useState('');

    const dispatch = useDispatch()
    const token = useSelector((state) => state.AuthData.token)
    // handle bad singup http Requests 
    const signUpFetchError = useSelector((state) => state.AuthData.signUpFetchError)
    const signUpFetchLoading = useSelector((state) => state.AuthData.signUpFetchLoading)


    useEffect(() => {
        if (token) {
            // set up feelings 
            let feelings = {
                "anxious": 1,
                "depressed": 1,
                "excited": 1,
                "lost": 1,
                "stressed": 1,
            }
            dispatch(UpdateFeelings(feelings, token))
            props.navigation.navigate('introQuestionsStack')
            //props.navigation.navigate('Feelings',{firstTime:true})
            //props.navigation.navigate('Tabs')
        }
    }, [token])

    const loginUser = () => {
        if (passWord === passWordTwo) {
            dispatch(SignUpUser(userName, passWord, firstName, lastName))
        } else {
            console.log('passwords do not match')
        }
    }

    const handlePress = () => {
        loginUser()
        onChangeUserName('')
        onChangePassword('')
        onChangeUserFirstName('')
        onChangeUserLastName('')
        onChangePasswordTwo('')
    }

    const handleLogin = () => {
        props.navigation.navigate('Auth')

    }

    return (
        <View styles={styles.imageContainer}>

            <ImageBackground style={styles.backgroundImage}
                source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQc0HIJBdanX2M1YcbL03E0dAm3CyFOLPQxvBor7fpIOaLqf85Owg&s' }}>
                <ScrollView contentContainerStyle={styles.outerJustify} style={{ ...styles.outerContainer, ...styles.quickBorder }}>
                    {signUpFetchLoading ?
                      <Text>Loading</Text> :
                        <View style={{ ...styles.logCard }}>
                            <Text style={styles.title} > Meditation Sign Up !</Text>
                            {signUpFetchError? <Text>Please try a better username and password</Text>:null}
                            <AuthInputBox secureTextEntry={false} value={firstName} placeholder='First Name' setValue={onChangeUserFirstName} />
                            <AuthInputBox secureTextEntry={false} value={lastName} placeholder='Last Name' setValue={onChangeUserLastName} />
                            <AuthInputBox secureTextEntry={false} value={userName} placeholder='email' setValue={onChangeUserName} />
                            <AuthInputBox secureTextEntry={true} value={passWord} placeholder='password' setValue={onChangePassword} />
                            <AuthInputBox secureTextEntry={true} value={passWordTwo} placeholder='repeat password' setValue={onChangePasswordTwo} />
                            <View>
                                <MainButton style={styles.button} testID='signUp' title='Sign up' onPress={handlePress} />
                                <MainButton style={styles.signUpButton} title='Switch to Login' onPress={handleLogin} />
                            </View>

                        </View>}
                </ScrollView>
            </ImageBackground>

        </View>
    )
}

export default SignupScreen;

SignupScreen.navigationOptions = {
    header: null,
}

const styles = StyleSheet.create({
    backgroundImage: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
        resizeMode: 'contain',
    },
    imageContainer: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    outerContainer: {
        flex: 1,
        width: '100%',
        //backgroundColor:colors.primary,
    },
    outerJustify: {
        justifyContent: 'center',
        alignItems: 'center',

    },
    formPair: {
        width: '90%',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        height: Dimensions.get('window').height * .10,

    },

    formObj: {
        height: Dimensions.get('window').height * .08,

    },
    inputBox: {
        borderStyle: 'solid',
        borderColor: colors.strongPrimary,
        borderWidth: 1,
        flex: 1,
        fontSize: 18
    },
    quickBorder: {
        borderStyle: 'solid',
        borderColor: 'black',
        borderWidth: 2,
        flex: 1,
    },
    logCard: {
        height: Dimensions.get('window').height * .75,
        width: Dimensions.get('window').width * .85,
        justifyContent: 'center',
        alignItems: 'center',
        borderStyle: 'solid',
        borderColor: 'black',
        borderWidth: 0,
        opacity: .75,

        shadowColor: 'black',
        shadowOffset: { width: 5, height: 10 },
        shadowOpacity: .75,
        shadowRadius: 2,

        marginTop: Dimensions.get('window').height * .10,
        backgroundColor: colors.lightSecondary,

    },
    button: {
        marginBottom: 25,
    },
    signUpButton: {
        backgroundColor: colors.strongPrimary
    },
    title: {
        fontSize: 24,
        fontFamily: 'Helvetica-Oblique'
    },

})