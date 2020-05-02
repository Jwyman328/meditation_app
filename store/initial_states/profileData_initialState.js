const profileData_initialState = {
    userHealthData: {
        weight: undefined,
        height: undefined,
        DOB: { month: undefined, year: undefined },
        gender: undefined,
    },
    generalUserData: {
        first_name: undefined,
        last_name: undefined
    },
    fetchUserDataLoading: false,
    fetchUserDataError: false,

}

export default profileData_initialState;