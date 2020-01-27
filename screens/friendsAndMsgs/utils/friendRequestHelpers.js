
import React from 'react'

import SendFriendRequest from '../../../store/actions/sendFriendRequest'
import AddRemoveFriend from '../../../store/actions/addRemoveFriend'
import UserFriendCard from '../../friendsAndMsgs/components/userFriendCard'
import UserCard from '../../friendsAndMsgs/components/userCard'

/**
 * Send a friend request to a user.
 * @param {string} username username of the friend to be removed from friend list.
 * @param {function} dispatch dispatch function.
 * @param {string} token jwt token for http requests.
 */
const sendFriendRequest = (username, dispatch, token) => {
    dispatch(SendFriendRequest(username, token))
}

/**
 * Remove a current friend from user's friend list.
 * @param {string} username username of selected user to send friend request.
 * @param {string} username username of the friend to be removed from friend list.
 * @param {function} dispatch dispatch function.
 * @param {string} token jwt token for http requests.
 */
const removeFriend = (username, dispatch, token) => {
    dispatch(AddRemoveFriend(username, token))
}

/**
 * Create user card of each user.
 * 
 * if the user is a friend add ability to remove them as a friend.
 * if the user is not a friend add ability to send them friend request.
 * if the user is the current user do not show user card.
 * 
 * @param {object} user 
 * @param {string} username username of the current user.
 * @param {array} friendsUsernames array of all friend user objects
 * @param {function} dispatch dispatch function.
 * @param {string} token jwt token for http requests.
 */
const createUserCards = (user, username, friendsUsernames, dispatch, token) => {
    return (
        // check if this user is the current user 
        user.item.username === username ?
            // if is the same as the current user do nothing
            //dont want yourself in a search for other users?
            null :
            // check if this user is a friend
            friendsUsernames.includes(user.item.username) ?
                <UserFriendCard removeFriend={() => removeFriend(user.item.username, dispatch, token)} user_photo={user.item.user_photo} username={user.item.username} />
                :
                <UserCard sendFriendRequest={() => sendFriendRequest(user.item.username, dispatch, token)} user_photo={user.item.user_photo} username={user.item.username} />
    )
}

export { createUserCards }