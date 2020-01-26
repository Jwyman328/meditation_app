import React from 'react'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'

const CreateJournal = (date, text, mood, token) => { 
        return async (dispatch) => {
            let [month,day,year] = date.split('/')
            let newDate = `${year}-${month}-${day}`
            
            const data = { text: text, mood:mood, date : newDate }
            let journalData = JSON.stringify(data)
            const response = await axios({url:`http://intense-gorge-29567.herokuapp.com/Journal/all_user_entries`,
                method:'POST',data:journalData, headers:{ Authorization: `JWT ${token}`,'Content-Type': 'application/json'}})
            const responseData = await response.data
            //dispatch({type: 'AddFriend', addFriendsList:responseData})
            //dispatch(FetchUserFriends(token))
        }
}
export default CreateJournal