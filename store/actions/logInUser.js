import React from 'react'



const LogInUser = (userName, passWord) => {
    return async (dispatch) => {

    const usernamePassword = {username: userName, password: passWord}
    let jsonUsername = JSON.stringify(usernamePassword)
    let loginResponse = await fetch('http://intense-gorge-29567.herokuapp.com/sign_in',{method:'POST', //mode: 'cors'
        body:jsonUsername, headers: {'Content-Type': 'application/json'}
    });
    let jsonResponse = await loginResponse.json()
    //add token to local storage and use for requests
    const token = jsonResponse.token
    //AsyncStorage.setItem('token', token)
    console.log(jsonResponse, token)
    //console.log(userName, 'users')
    if (token){
        dispatch({type: 'signIn', username:userName, password: passWord, token:token})
    }else{
        //
    }
    }
}

export default LogInUser

