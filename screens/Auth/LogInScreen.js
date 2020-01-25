import React, { useState, useEffect } from 'react'

import { AsyncStorage, ScrollView, Text, StyleSheet, View, KeyboardAvoidingView, TextInput, Button, Dimensions, ImageBackground } from 'react-native'
import LogInUser from '../../store/actions/logInUser'

import { useDispatch, useSelector } from 'react-redux'

import colors from '../../constants/colors';

import MainButton from '../../components/MainButton'
import AuthInputBox from './components/authInputBox'
/**
 * Login screen for existing users to login.
 * 
 */
function LoginScreen(props) {
    const [loginFail, setLoginFail] = React.useState(undefined);
    const [userName, onChangeUserName] = React.useState('');
    const [passWord, onChangePassword] = React.useState('');

    const dispatch = useDispatch()

    const token = useSelector((state) => state.AuthData.token)
    const username = useSelector((state) => state.AuthData.username)
    const fetchLoading = useSelector((state) => state.AuthData.logInfetchLoading)
    const fetchError = useSelector((state) => state.AuthData.logInfetchError)

    /**
     * Go to the app when the user has successfully recieved a token from signing in.
     */
    useEffect(() => {
        if (token) {
            props.navigation.navigate('Tabs')
        }
    }, [token])

    const loginUser = () => {
        dispatch(LogInUser(userName, passWord))
    }

    const handlePress = () => {
        //fetchLogin()
        loginUser()
        onChangeUserName('')
        onChangePassword('')
    }

    /**
     * Go to the signup screen.
     */
    const handleSignUp = () => {
        props.navigation.navigate('Signup')
    }

    const handleForgotPassword = () => {
        props.navigation.navigate('ForgotPassword')
    }


    return (
        <View styles={styles.imageContainer}>
            <ImageBackground style={styles.backgroundImage}
                source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQc0HIJBdanX2M1YcbL03E0dAm3CyFOLPQxvBor7fpIOaLqf85Owg&s' }}>
                <ScrollView contentContainerStyle={styles.outerJustify} style={{ ...styles.outerContainer, }}>
                    {fetchLoading ? <Text>loading</Text> : <View style={{ ...styles.logCard }}>
                        <Text style={styles.title} > Meditation Login!</Text>
                        <AuthInputBox secureTextEntry={false} value={userName} placeholder='email' setValue={onChangeUserName} />
                        {fetchError ? <Text testID='loginError' style={styles.loginFail}>Username or password is invalid</Text> : null}
                        <AuthInputBox secureTextEntry={true} value={passWord} placeholder='password' setValue={onChangePassword} />
                        <View>
                            <MainButton style={styles.button} testID='loginUser' title='Login' onPress={handlePress} />
                            <MainButton style={styles.signUpButton} title='Switch to Sign Up' onPress={handleSignUp} />
                            <Button title='Forgot Password?' onPress={handleForgotPassword} />
                        </View>
                    </View>}
                </ScrollView>
            </ImageBackground>
        </View>
    )
}


export default LoginScreen;

LoginScreen.navigationOptions = {
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
        //backgroundColor: colors.primary,
        //height:500,
    },
    outerJustify: {
        justifyContent: 'center',
        alignItems: 'center',

    },
    formPair: {
        width: '90%',
        flexDirection: 'row',
        //margin: 5,
        justifyContent: 'space-evenly',
        alignItems: 'center',
        height: Dimensions.get('window').height * .13,

    },

    formObj: {
        height: Dimensions.get('window').height * .09,

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
        height: Dimensions.get('window').height * .65,
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

        marginTop: Dimensions.get('window').height * .12,
        backgroundColor: colors.lightSecondary,

    },
    button: {
        marginBottom: 25,

    },
    signUpButton: {
        backgroundColor: colors.strongPrimary,
        marginBottom: 15,
    },
    title: {
        fontSize: 24,
        fontFamily: 'Helvetica-Oblique'
    },
    loginFail: {
        fontSize: 18,
        fontFamily: 'Helvetica-Oblique',
        color: 'red',
    }

})