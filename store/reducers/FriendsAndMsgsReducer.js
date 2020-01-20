import FilterMeditations from '../actions/filterMeditations'
import dummyData from '../../Data/dummyData'


const initialState = {
    friendsList: [],
    allUsers:[],
    pendingFriendRequests: [],
    singleMessages:undefined,
    fetchUsersLoading: false,
    fetchUsersError: false,
   
}

const FriendsAndMsgsReducer = (state=initialState, action) => {
    switch(action.type){
       
            
        case 'FetchUserFriends':
            const newFriendsList = action.friendsList
            return {...state, friendsList : newFriendsList}
        
        case 'FetchAllUsers':
            const newAllUsersList = action.allUsers
            return {...state, allUsers : newAllUsersList}

        case 'AddFriend':
            const newfriendsList = action.addFriendsList
            return {...state, friendsList : newfriendsList}
            break

        case 'PendingFriendRequests':
            const newPendingRequests = action.pendingFriendRequests
            return {...state, pendingFriendRequests:newPendingRequests }
        case 'FetchSingleUserMessages':
            const singleMessages = action.SingleMessages
            return {...state, singleMessages:singleMessages }

        case 'logOut':
            return {...state,  friendsList: [],
                allUsers:[],
                pendingFriendRequests: [],
                singleMessages:undefined,
                fetchUsersLoading: false,
                fetchUsersError: false,
            }
        case 'fetchUsersLoading':
            return {
                ...state, fetchUsersLoading:true, fetchUsersError:false,
            }
        case 'fetchUsersError':
            return {
                ...state, fetchUsersLoading:false, fetchUsersError:true,
            }
        case 'fetchUsersSuccess':
            return{
                ...state, fetchUsersLoading:false, fetchUsersError:false,
            }
        
    }
  

    return state
}

export default FriendsAndMsgsReducer