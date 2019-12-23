import React, {useState, useEffect} from 'react'

import {AsyncStorage, ScrollView,Text, StyleSheet, View, KeyboardAvoidingView, TextInput, Button} from 'react-native'
import SignUpUser from '../store/actions/signUpUser'

import {useDispatch, useSelector} from 'react-redux'

function SignupScreen(props){
    const [userName, onChangeUserName] = React.useState('');
    const [passWord, onChangePassword] = React.useState('');
    const dispatch = useDispatch()
    const token = useSelector((state) => state.meditations.token)

    useEffect(() => {
        console.log(token, 'tooklin sign up')
        if (token){
            props.navigation.navigate('Tabs')
        }
    }, [token])
    const loginUser = () => {
        console.log('in login user')
       dispatch(SignUpUser(userName,passWord )) 
    }
    const fetchLogin = async() => {
        const usernamePassword = {username: userName, password: passWord}
        let jsonUsername = JSON.stringify(usernamePassword)
        let loginResponse = await fetch('http://intense-gorge-29567.herokuapp.com/sign_in',{method:'POST', //mode: 'cors'
            body:jsonUsername, headers: {'Content-Type': 'application/json'}
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

    const handleLogin= () => {
        props.navigation.navigate('Auth')
    }



    return (
       <ScrollView contentContainerStyle={styles.outerJustify} style = {{...styles.outerContainer, ...styles.quickBorder}}>
           <Text style={{margin:20}}> Sign up !</Text>
           <View style={{...styles.formPair, ...styles.quickBorder}}>
               <Text style={styles.formObj}>Username</Text>
               <TextInput style={{...styles.formObj, ...styles.inputBox}}
                onChangeText={text => onChangeUserName(text)} required errorMessage='enter a correct username'
                value={userName} placeholder='username' autoCapitalize="none" />
           </View>
           <View style={{...styles.formPair, ...styles.quickBorder}}>
               <Text style={styles.formObj}>password</Text>
               <TextInput style={{...styles.formObj, ...styles.inputBox}}
                onChangeText={text => onChangePassword(text)}
                value={passWord} required errorMessage='enter a correct password' secureTextEntry={true} placeholder='password' autoCapitalize="none" />
           </View>
           <View>
                <Text>{userName}</Text>
                <Button onPress={handlePress} title={'Sign up'} />
                <Button onPress={handleLogin} title={'Switch to Login'} />
           </View>
       </ScrollView>
    )
}

export default SignupScreen;

const styles = StyleSheet.create({
    outerContainer: {
        flex:1,
        width:'100%',
        //height:500,
    },
    outerJustify: {
        justifyContent:'center',
         alignItems:'center'
    },
    formPair: {
        height:100,
        width: '90%',
        flexDirection:'row',
        margin: 30,
        justifyContent:'space-evenly',
        alignItems:'center',
    },
    formObj: {
        margin: 10
    },
    inputBox: {
        borderStyle:'solid',
        borderColor:'black',
        borderWidth:2,
        flex:1,
    },
    quickBorder:{
        borderStyle:'solid',
        borderColor:'black',
        borderWidth:2,
        flex:1,
    }
})