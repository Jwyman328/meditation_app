import React, { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import FetchMessages from "../../store/actions/friendsAndMsgs_actions/FetchMessages";

/**
 * Fetch all messages between user and selected friend.
 */
function useFetchMessagesBetweenUsersWithToken(reciever_username, token) {
    const dispatch = useDispatch()

  useEffect(() => {
    dispatch(FetchMessages(reciever_username, token));
  },[]);
}

export default useFetchMessagesBetweenUsersWithToken;
