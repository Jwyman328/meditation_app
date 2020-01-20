

const initialState = {
    moodPastWeek : undefined,
    moodPastMonth : undefined,
    moodDates : undefined,
    fetchMoodDataLoading: false,
    fetchMoodDataError:false,
    

}

const MoodReducer = (state=initialState, action) => {
    switch(action.type){
        case 'FetchMoodData':
            const newMoodData = action.MoodData
            const moodDataPastWeek = action.MoodData[0].moods_range[0]
            const moodDataPastMonth = action.MoodData[0].moods_range[1]
            const moodDataDates = action.MoodData[0].moods_range[2]   
            return{...state, moodPastWeek:moodDataPastWeek ,moodPastMonth:moodDataPastMonth, moodDates: moodDataDates}
        
        case 'logOut':
            return { ...state,moodPastWeek : undefined,
                moodPastMonth : undefined,
                moodDates : undefined,
                fetchMoodDataLoading: false,
                fetchMoodDataError:false,
             }
        case 'fetchMoodDataLoading':
            return {    
                fetchMoodDataLoading: true,
                fetchMoodDataError:false,
            }
        case 'fetchMoodDataError':
            return{
                fetchMoodDataLoading: false,
                fetchMoodDataError:true,
            }
        case 'fetchMoodDataSuccess':
            return{
                fetchMoodDataLoading: false,
                fetchMoodDataError:false,
            }
        }

    return state
}

export default MoodReducer