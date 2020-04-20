import React from 'react';
import {useSelector} from 'react-redux';

function useGetMyFeelingsScreenState(navigation) {
    const username = useSelector((state) => state.AuthData.username)
    const token = useSelector((state) => state.AuthData.token)
    const myFeelings = useSelector((state) => state.meditation.myFeelings)
    const healthData = useSelector((state) => state.ProfileData.userHealthData)

    // handle feelings screen
    const fetchFeelingsError = useSelector((state) => state.meditation.fetchFeelingsError)
    const firstTime = navigation.getParam('firstTime')

    return {username,token,myFeelings,healthData,fetchFeelingsError,firstTime }
}

export default useGetMyFeelingsScreenState;