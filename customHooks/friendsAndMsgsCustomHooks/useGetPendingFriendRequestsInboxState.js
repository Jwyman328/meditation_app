import React from 'react';
import { useDispatch, useSelector } from 'react-redux'
import useFetchPendingFriendRequestsWithToken from './useFetchPendingFriendRequestsWithToken'

function useGetPendingFriendRequestsInboxState(props) {
    const pendingFriendRequests = useSelector((state) => state.FriendsAndMsgs.pendingFriendRequests)
    const fetchPendingFriendRequestsLoading = useSelector((state) => state.FriendsAndMsgs.fetchPendingFriendRequestsLoading)
    const fetchPendingFriendRequestsError = useSelector((state) => state.FriendsAndMsgs.fetchPendingFriendRequestsError)
    const username = useSelector((state) => state.AuthData.username)
    const token = useSelector((state) => state.AuthData.token)

    useFetchPendingFriendRequestsWithToken(token)

    return {pendingFriendRequests, fetchPendingFriendRequestsLoading,fetchPendingFriendRequestsError,username,token  }
}

export default useGetPendingFriendRequestsInboxState;