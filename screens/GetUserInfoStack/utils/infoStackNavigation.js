import React from 'react'


const navigateTo = (isInSignUpProcess) => {
    healthData.DOB = {month:monthChoosen, year:yearChoosen}
    // if it is the first time setting the user profile data, post it to the database.
    !firstTime?   dispatch(SetUserHealthData('DOB',{month:monthChoosen, year:yearChoosen}))
    : dispatch(SetUserHealthData('DOB',{month:monthChoosen, year:yearChoosen},true, healthData, token))    

    firstTime? props.navigation.navigate('Feelings',{firstTime:true}): props.navigation.navigate('ProfileDataScreen')
}

export default navigateTo
