import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

function useGetUserFriendsScreenState(props) {
  const username = useSelector((state) => state.AuthData.username);
  const token = useSelector((state) => state.AuthData.token);
  const friends = useSelector((state) => state.FriendsAndMsgs.friendsList);
  const fetchFriendsLoading = useSelector(
    (state) => state.FriendsAndMsgs.fetchFriendsLoading
  );
  const fetchFriendsError = useSelector(
    (state) => state.FriendsAndMsgs.fetchFriendsError
  );

  return { username, token, friends, fetchFriendsLoading, fetchFriendsError };
}

export default useGetUserFriendsScreenState;
