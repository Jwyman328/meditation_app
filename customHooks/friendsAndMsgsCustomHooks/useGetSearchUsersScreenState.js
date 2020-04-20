import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import FetchAllUsers from "../../store/actions/FetchAllUsers";

function useGetSearchUsersScreenState(props) {
  const [friendsUsernames, setFriendsUsernames] = useState([]);
  const dispatch = useDispatch();
  const username = useSelector((state) => state.AuthData.username);
  const token = useSelector((state) => state.AuthData.token);
  const allUsers = useSelector((state) => state.FriendsAndMsgs.allUsers);
  const friends = useSelector((state) => state.FriendsAndMsgs.friendsList);
  const fetchUsersLoading = useSelector(
    (state) => state.FriendsAndMsgs.fetchUsersLoading
  );
  const fetchUsersError = useSelector(
    (state) => state.FriendsAndMsgs.fetchUsersError
  );

  /**
   * Fetch all users and create array of friends' usernames.
   */
  useEffect(() => {
    dispatch(FetchAllUsers(token));
    if (allUsers && friends) {
      const friendsUsernames = friends.map((friend) => friend.username);
      setFriendsUsernames(friendsUsernames);
    } else {
    }
  }, [friends, dispatch]); //[dispatch]

  return {
    friendsUsernames,
    setFriendsUsernames,
    username,
    token,
    allUsers,
    friends,
    fetchUsersLoading,
    fetchUsersError,
  };
}

export default useGetSearchUsersScreenState;
