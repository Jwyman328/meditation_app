import React, {useState, useEffect} from 'react'

import {AsyncStorage, ScrollView,Text, StyleSheet, View, KeyboardAvoidingView, TextInput, Button, Dimensions} from 'react-native'
import SignUpUser from '../store/actions/signUpUser'

import {useDispatch, useSelector} from 'react-redux'
import MainButton from '../components/MainButton'
import colors from '../constants/colors';


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
    
    const handlePress = () => {
        console.log('submitted')
        loginUser()
        onChangeUserName('')
        onChangePassword('')
    }

    const handleLogin= () => {
        props.navigation.navigate('Auth')
    }



    return (
       <ScrollView contentContainerStyle={styles.outerJustify} style = {{...styles.outerContainer, ...styles.quickBorder}}>
            <View style={{ ...styles.logCard }}>
                <Text style={styles.title} > Meditation Sign Up !</Text>
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
                    <MainButton style={styles.button} title='Sign up' onPress={handlePress} />
                    <MainButton style={styles.signUpButton} title='Switch to Login' onPress={handleLogin} />
                </View>

            </View>
       </ScrollView>
    )
}

export default SignupScreen;

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