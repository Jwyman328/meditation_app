import React from 'react'
import LoadFetch from './fetchLoadErrorSucces/loadFetch'
import FetchSuccess from './fetchLoadErrorSucces/fetchSuccess'
import FetchError from './fetchLoadErrorSucces/fetchError'
import axios from 'axios'

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
        dispatch(LoadFetch('signUpFetchLoading'))
        const usernamePassword = { username: userName, password: passWord }
        let jsonUsername = JSON.stringify(usernamePassword)
        let loginResponse = await axios({url:'http://intense-gorge-29567.herokuapp.com/sign_up',
            method: 'POST', //mode: 'cors'
            data: jsonUsername, headers: { 'Content-Type': 'application/json' }
        }).then(async(loginResponse) => {
            let jsonResponse = await loginResponse.data
            // set additional data
            const token = jsonResponse.token
            const lastNameFirstName = {first_name:firstName, last_name:lastName}
            let jsonlastNameFirstName = JSON.stringify(lastNameFirstName)
            
            // if the user got a token add aditional user data
            if (token) {
                dispatch(FetchSuccess('signUpFetchSuccess'))
                let additionDataResponse = await axios({url:'https://intense-gorge-29567.herokuapp.com/sign_up_additional_data',
                    method: 'POST', //mode: 'cors'
                    data: jsonlastNameFirstName, headers: { 'Content-Type': 'application/json', Authorization: `JWT ${token}` }
                });
                dispatch({ type: 'signUp', username: userName, password: passWord, token: token })
            } else {
                //
                dispatch(FetchError('signUpFetchError'))

            }
        }).catch(async(response) => {
            dispatch(FetchError('signUpFetchError'))
        });

       
    }
}

export default SignUpUser


