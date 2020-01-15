import FilterMeditations from '../actions/filterMeditations'
import dummyData from '../../Data/dummyData'

const initialState = {
    userHealthData: {
        weight: undefined,
        height: undefined,
        DOB: {month:undefined, year:undefined},
        gender: undefined,
    },
    generalUserData:{
        first_name: undefined,
        last_name:undefined
    }

}

const ProfileDataReducer = (state=initialState, action) => {
    switch(action.type){
        case 'setUserHealthData':
            console.log('new')
            const newHealthDataType = action.healthDataType
            const newHealthDataValue = action.healthDataValue
            //duplicate old object
            const newUserHealthData = {...state.userHealthData }
            newUserHealthData[newHealthDataType] = newHealthDataValue
            return {...state, userHealthData: newUserHealthData }
        
        case 'FetchProfileData':
                const profileData = action.ProfileData[0]

                const newgeneralUserData = {...state.generalUserData }
                
                newgeneralUserData.first_name = profileData.first_name
                newgeneralUserData.last_name = profileData.last_name
                
                const newUserHealthData2 = {...state.userHealthData }
                newUserHealthData2.weight = profileData.weight
                newUserHealthData2.height = {feet:profileData.height_feet,
                                            inch:profileData.height_inches}
                newUserHealthData2.DOB = {month:profileData.birth_month, year:profileData.birth_year}
                newUserHealthData2.gender = profileData.gender
                return {...state, userHealthData: newUserHealthData2, generalUserData:newgeneralUserData  }
    
    }
    return state

}

    export default ProfileDataReducer;