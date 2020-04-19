import React, {useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'

function useNavigateToLoginWhenEmailSent(navigation){

    const resetPasswordEmailSent = useSelector(state => state.AuthData.resetPasswordEmailSent)
    const dispatch = useDispatch()

    useEffect(() => {
        if (resetPasswordEmailSent) {
          navigation.navigate("Auth");
          dispatch({ type: "resetPasswordEmailSentToFalse" });
        } else {
          //
        }
      });

}

export default useNavigateToLoginWhenEmailSent;