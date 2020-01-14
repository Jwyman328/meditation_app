import React from 'react'


/**
 * Sent a request to the signup link to create a new user and recieve a jwt token.
 * 
 * store the username, password and token data.
 * If the user has a token or not will decide if request was successful
 * @param {string} userName choosen username for the new user
 * @param {string} passWord choosen password for the new user
 */
const SignUpUser = (userName, passWord, firstName, lastName) => {
    return async (dispatch) => {
        // create sign up data
        const usernamePassword = { username: userName, password: passWord }
        let jsonUsername = JSON.stringify(usernamePassword)
        let loginResponse = await fetch('http://intense-gorge-29567.herokuapp.com/sign_up', {
            method: 'POST', //mode: 'cors'
            body: jsonUsername, headers: { 'Content-Type': 'application/json' }
        });

        let jsonResponse = await loginResponse.json()
        
        // set additional data
        const token = jsonResponse.token
        const lastNameFirstName = {first_name:firstName, last_name:lastName}
        let jsonlastNameFirstName = JSON.stringify(lastNameFirstName)

        // if the user got a token add aditional user data
        if (token) {
            let additionDataResponse = await fetch('https://intense-gorge-29567.herokuapp.com/sign_up_additional_data', {
                method: 'POST', //mode: 'cors'
                body: jsonlastNameFirstName, headers: { 'Content-Type': 'application/json', Authorization: `JWT ${token}` }
            });
            dispatch({ type: 'signUp', username: userName, password: passWord, token: token })
        } else {
            //
        }
    }
}

export default SignUpUser


