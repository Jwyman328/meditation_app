import React from 'react'


/**
 * Sent a request to the signup link to create a new user and recieve a jwt token.
 * 
 * store the username, password and token data.
 * If the user has a token or not will decide if request was successful
 * @param {string} userName choosen username for the new user
 * @param {string} passWord choosen password for the new user
 */
const SignUpUser = (userName, passWord) => {
    return async (dispatch) => {
        const usernamePassword = { username: userName, password: passWord }
        let jsonUsername = JSON.stringify(usernamePassword)
        let loginResponse = await fetch('http://intense-gorge-29567.herokuapp.com/sign_up', {
            method: 'POST', //mode: 'cors'
            body: jsonUsername, headers: { 'Content-Type': 'application/json' }
        });

        let jsonResponse = await loginResponse.json()
        const token = jsonResponse.token
        if (token) {
            dispatch({ type: 'signUp', username: userName, password: passWord, token: token })
        } else {
            //
        }
    }
}

export default SignUpUser


