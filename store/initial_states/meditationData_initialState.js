const meditationData_initialState = {
  meditations: [], //dummyData,
  filteredMeditations: [], //dummyData,
  favoriteMeditations: [],
  courseData: [],
  filters: {
    testAnxietyFilter: false,
    testDepressionFilter: false,
    testBegginerFilter: false,
    testAdvancedFilter: false,
    testConfidenceFilter: false,
    testFavoriteFilter: false,
  },
  audioState: {
    isPlaying: false,
    playbackInstance: null,
    currentIndex: 0,
    volume: 1.0,
    isBuffering: true,
    isReady: false,
  },
  myFeelings: {
    depressed: 1,
    anxious: 1,
    lost: 1,
    stressed: 1,
    excited: 1,
  },
  fetchFeelingsLoading: false,
  fetchFeelingsError: false,
  fetchCoursesLoading: false,
  fetchCoursesError: false,
  fetchCourseDataLoading: false,
  fetchCourseDataError: false,
};

export default meditationData_initialState;
