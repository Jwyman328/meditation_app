import React, {useEffect} from 'react'
import { useDispatch, useSelector } from "react-redux";
import UpdateFeelings from '../../store/actions/journal_emotions_actions/UpdateFeeling'

    /**
     * If signUp success user will recieve a token.
     * 
     * After token is recieved, set default feelings.
     * Then navigate to introQuestionsStack to set initial profileData.
     */
function useStartNewUserProcessOnToken(token, navigation){

 // set up default initial feelings 
 let feelings = {
    "anxious": 1,
    "depressed": 1,
    "excited": 1,
    "lost": 1,
    "stressed": 1,
}
    const dispatch = useDispatch();

    useEffect(() => {
        if (token) {
            dispatch(UpdateFeelings(feelings, token))
            navigation.navigate('introQuestionsStack')
        }
    }, [token])
}

export default useStartNewUserProcessOnToken;