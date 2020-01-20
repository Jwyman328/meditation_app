import FilterMeditations from '../actions/filterMeditations'
import dummyData from '../../Data/dummyData'


const initialState = {
    friendsList: [],
    allUsers: [],
    pendingFriendRequests: [],
    singleMessages: undefined,
    fetchUsersLoading: false,
    fetchUsersError: false,
    fetchFriendsLoading: false,
    fetchFriendsError: false,

}

const FriendsAndMsgsReducer = (state = initialState, action) => {
    switch (action.type) {


        case 'FetchUserFriends':
            const newFriendsList = action.friendsList
            return { ...state, friendsList: newFriendsList }

        case 'FetchAllUsers':
            const newAllUsersList = action.allUsers
            return { ...state, allUsers: newAllUsersList }

        case 'AddFriend':
            const newfriendsList = action.addFriendsList
            return { ...state, friendsList: newfriendsList }
            break

        case 'PendingFriendRequests':
            const newPendingRequests = action.pendingFriendRequests
            return { ...state, pendingFriendRequests: newPendingRequests }
        case 'FetchSingleUserMessages':
            const singleMessages = action.SingleMessages
            return { ...state, singleMessages: singleMessages }

        case 'logOut':
            return {
                ...state, friendsList: [],
                allUsers: [],
                pendingFriendRequests: [],
                singleMessages: undefined,
                fetchUsersLoading: false,
                fetchUsersError: false,
                fetchFriendsLoading: false,
                fetchFriendsError: false,
            }
        case 'fetchUsersLoading':
            return {
                ...state, fetchUsersLoading: true, fetchUsersError: false,
            }
        case 'fetchUsersError':
            return {
                ...state, fetchUsersLoading: false, fetchUsersError: true,
            }
        case 'fetchUsersSuccess':
            return {
                ...state, fetchUsersLoading: false, fetchUsersError: false,
            }

        case 'fetchFriendsLoading':
            return {
                ...state, fetchFriendsLoading: true, fetchFriendsError: false,
            }
        case 'fetchFriendsError':
            return {
                ...state, fetchFriendsLoading: false, fetchFriendsError: true,
            }
        case 'fetchFriendsSuccess':
            return {
                ...state, fetchFriendsLoading: false, fetchFriendsError: false,
            }

    }


    return state
}

export default FriendsAndMsgsReducer