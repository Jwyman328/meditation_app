import React from 'react'



const SignUpUser = (userName, passWord) => {
    console.log('in sign up user')
    return async (dispatch) => {
    
    const usernamePassword = {username: userName, password: passWord}
    console.log(usernamePassword)
    let jsonUsername = JSON.stringify(usernamePassword)
    let loginResponse = await fetch('http://intense-gorge-29567.herokuapp.com/sign_up',{method:'POST', //mode: 'cors'
        body:jsonUsername, headers: {'Content-Type': 'application/json'}
    });
    let jsonResponse = await loginResponse.json()
    //add token to local storage and use for requests
    const token = jsonResponse.token
    //AsyncStorage.setItem('token', token)
    console.log(jsonResponse, token, 'tot')

    if (token){
        dispatch({type: 'signUp', username:userName, password: passWord, token:token})
    }else{
        //
    }
    }
}

export default SignUpUser


