import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import useFetchMessagesBetweenUsersWithToken from "./useFetchMessagesBetweenUsersWithToken";

function useGetMessageConversationScreenState(navigation) {
  const [keyboardVisible, setKeyboardVisible] = useState(false);

  let messages = undefined;
  const token = useSelector((state) => state.AuthData.token);
  const username = useSelector((state) => state.AuthData.username);

  messages = useSelector((state) => state.FriendsAndMsgs.singleMessages);
  //Handle loading and error for fetching messages
  const fetchMessagesLoading = useSelector(
    (state) => state.FriendsAndMsgs.fetchSingleMessagesLoading
  );
  const fetchMessagesError = useSelector(
    (state) => state.FriendsAndMsgs.fetchSingleMessagesError
  );
  const reciever_username = navigation.getParam("sendToUsername");

  useFetchMessagesBetweenUsersWithToken(reciever_username, token);

  return {
    keyboardVisible,
    setKeyboardVisible,
    messages,
    token,
    username,
    fetchMessagesLoading,
    fetchMessagesError,
    reciever_username,
  };
}

export default useGetMessageConversationScreenState;
