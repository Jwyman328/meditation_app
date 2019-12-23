import React, { useState, useEffect } from 'react'

import { AsyncStorage, ScrollView, Text, StyleSheet, View, KeyboardAvoidingView, TextInput, Button, Dimensions } from 'react-native'
import LogInUser from '../store/actions/logInUser'

import { useDispatch, useSelector } from 'react-redux'
import colors from '../constants/colors';

import MainButton from '../components/MainButton'

function LoginScreen(props) {
    const [userName, onChangeUserName] = React.useState('');
    const [passWord, onChangePassword] = React.useState('');

    const dispatch = useDispatch()

    const token = useSelector((state) => state.meditations.token)
    const username = useSelector((state) => state.meditations.username)


    useEffect(() => {
        console.log(token, 'tooklin')
        if (token) {
            console.log(username, 'username')
            props.navigation.navigate('Tabs')
        }
    }, [token])
    const loginUser = () => {
        dispatch(LogInUser(userName, passWord))
    }
    const fetchLogin = async () => {
        const usernamePassword = { username: userName, password: passWord }
        let jsonUsername = JSON.stringify(usernamePassword)
        let loginResponse = await fetch('http://intense-gorge-29567.herokuapp.com/sign_in', {
            method: 'POST', //mode: 'cors'
            body: jsonUsername, headers: { 'Content-Type': 'application/json' }
        });
        let jsonResponse = await loginResponse.json()
        //add token to local storage and use for requests
        const token = jsonResponse.token
        AsyncStorage.setItem('token', token)
        console.log(jsonResponse, token)
        //if (token){
        //props.logIn();
        //}
    }

    const handlePress = () => {
        console.log('submitted')
        //fetchLogin()
        loginUser()
        onChangeUserName('')
        onChangePassword('')
    }

    const handleSignUp = () => {
        props.navigation.navigate('Signup')
    }


    return (
        <ScrollView contentContainerStyle={styles.outerJustify} style={{ ...styles.outerContainer, }}>
            <View style={{ ...styles.logCard }}>
                <Text style={styles.title} > Meditation Login !</Text>
                <View style={{ ...styles.formPair }}>
                    <TextInput style={{ ...styles.formObj, ...styles.inputBox }}
                        onChangeText={text => onChangeUserName(text)} required errorMessage='enter a correct username'
                        value={userName} placeholder='username' autoCapitalize="none" />
                </View>
                <View style={{ ...styles.formPair }}>
                    <TextInput style={{ ...styles.formObj, ...styles.inputBox }}
                        onChangeText={text => onChangePassword(text)}
                        value={passWord} required errorMessage='enter a correct password' secureTextEntry={true} placeholder='password' autoCapitalize="none" />
                </View>
                <View>
                    <MainButton style={styles.button} title='Login' onPress={handlePress} />
                    <MainButton style={styles.signUpButton} title='Switch to Sign Up' onPress={handleSignUp} />
                </View>

            </View>
        
        </ScrollView>
    )
}

export default LoginScreen;

const styles = StyleSheet.create({
    outerContainer: {
        flex: 1,
        width: '100%',
        backgroundColor:colors.primary,
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
        //margin: 5,
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
        height:Dimensions.get('window').height * .65, 
        width: Dimensions.get('window').width * .85,
        justifyContent:'center',
        alignItems:'center',
        borderStyle: 'solid',
        borderColor: 'black',
        borderWidth: 0,

        shadowColor:'black',
        shadowOffset: {width: 5, height: 10 },
        shadowOpacity: .75,
        shadowRadius: 2,

        marginTop: Dimensions.get('window').height * .06,
        backgroundColor:colors.lightSecondary,

    },
    button :{
        marginBottom: 25,
    },
    signUpButton: {
        backgroundColor:colors.strongPrimary
    },
    title:{
        fontSize:20,
        fontFamily:'AppleSDGothicNeo-Bold'
    },
    
})