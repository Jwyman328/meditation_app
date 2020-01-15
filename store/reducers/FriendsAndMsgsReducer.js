import FilterMeditations from '../actions/filterMeditations'
import dummyData from '../../Data/dummyData'


const initialState = {
   
    friendsList: [],
    allUsers:[],
    pendingFriendRequests: [],
    singleMessages:undefined,
   
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

        
        
    }
  

    return state
}

export default FriendsAndMsgsReducer