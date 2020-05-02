import React from 'react'
import LoadFetch from '../fetchLoadErrorSucces/loadFetch'
import FetchSuccess from '../fetchLoadErrorSucces/fetchSuccess'
import FetchError from '../fetchLoadErrorSucces/fetchError'
import axios from 'axios'
/**
 * Login an already existing user.
 * 
 * Logins will be successful if a jwt token is recieved from the request
 * @param {String} userName username entered of the existing user
 * @param {String} passWord password entered of the existing user
 */
const LogInUser = (userName, passWord) => {
    return async (dispatch) => {
        dispatch(LoadFetch('logInloadFetch'))
        const usernamePassword = { username: userName, password: passWord }
        let jsonUsername = JSON.stringify(usernamePassword)
        let loginResponse = await axios({url:'http://intense-gorge-29567.herokuapp.com/sign_in',
            method: 'POST', //mode: 'cors'
            data: jsonUsername, headers: { 'Content-Type': 'application/json' }
        }).then(async(loginResponse) => {
            let jsonResponse = await loginResponse.data
            const token = jsonResponse.token
            if (token) {
                dispatch(FetchSuccess('logInfetchSuccess'))
                dispatch({ type: 'signIn', username: userName, password: passWord, token: token })
            } else {
                dispatch(FetchError('logInfetchError'))
            }
        }).catch(async(response) =>
            {
                dispatch(FetchError('logInfetchError'))
            }
        )
        
        

       
    }
}

export default LogInUser

