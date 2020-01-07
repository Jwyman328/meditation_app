import React from 'react'


/**
 * Login an already existing user.
 * 
 * Logins will be successful if a jwt token is recieved from the request
 * @param {String} userName username entered of the existing user
 * @param {String} passWord password entered of the existing user
 */
const LogInUser = (userName, passWord) => {
    return async (dispatch) => {

        const usernamePassword = { username: userName, password: passWord }
        let jsonUsername = JSON.stringify(usernamePassword)
        let loginResponse = await fetch('http://intense-gorge-29567.herokuapp.com/sign_in', {
            method: 'POST', //mode: 'cors'
            body: jsonUsername, headers: { 'Content-Type': 'application/json' }
        });

        let jsonResponse = await loginResponse.json()
        const token = jsonResponse.token
        if (token) {
            dispatch({ type: 'signIn', username: userName, password: passWord, token: token })
        } else {
            return 'error'
        }
    }
}

export default LogInUser

