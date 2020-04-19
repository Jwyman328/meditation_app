import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import FetchPendingFriendRequests from '../../store/actions/fetchPendingFriendRequests'

/**
 * Fetch all pending friend requests to the user.
 *
 * These are friend requests that other users have sent this user, but he has
 * not yet accepted or rejected.
 */
function useFetchPendingFriendRequestsWithToken(token) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(FetchPendingFriendRequests(token));
  }, [dispatch]);
}

export default useFetchPendingFriendRequestsWithToken;
