import React from 'react'

const InitialState = {
    "AuthData": {
      "logInfetchError": false,
      "logInfetchLoading": false,
      "loggedIn": true,
      "password": "testword",
      "resetPasswordEmailSent": false,
      "resetPasswordFetchError": false,
      "resetPasswordLoading": false,
      "signUpFetchError": false,
      "signUpFetchLoading": false,
      "token": "myToken",
      "username": "testUser",
  },
  "Fitness": {
    "currentStepCount": 1000,
    "dailyStepGoal": 3005,
    "fetchDailyStepsError": false,
    "fetchDailyStepsLoading": false,
  },
  "FriendsAndMsgs": {
    "allUsers": [
        {
            "first_name": "",
            "last_name": "",
            "user_photo": "userPhoto",
            "username": "test1",
        },
        {
            "first_name": "",
            "last_name": "",
            "user_photo": "userPhoto",
            "username": "test2",
        },
        {
            "first_name": "Joseph",
            "last_name": "Wyman",
            "user_photo": "userPhoto",
            "username": "test3",
        },
        {
            "first_name": "",
            "last_name": "",
            "user_photo": "userPhoto",
            "username": "test4",
        },
    ],
    "fetchFriendsError": false,
    "fetchFriendsLoading": false,
    "fetchPendingFriendRequestsError": false,
    "fetchPendingFriendRequestsLoading": false,
    "fetchSingleMessagesError": false,
    "fetchSingleMessagesLoading": false,
    "fetchUsersError": false,
    "fetchUsersLoading": false,
    "friendsList": [
        {
            "first_name": "test_second_first",
            "last_name": "test_second_last",
            "user_photo": "photo1",
            "username": "test1",
        },
        {
            "first_name": "test_first_name",
            "last_name": "test_last_name",
            "user_photo": "photo2",
            "username": "test2",
        },
    ],
    "pendingFriendRequests": [
        {
            "id": 21,
            "reciever": 1,
            "sender": 3,
            "sender_profile_picture": "senderProfilePic",
            "sender_username": "test3",
            "status": false,
        },
    ],
    "singleMessages": undefined,
  },   
   "Mood": {
    "fetchMoodDataError": true,
    "fetchMoodDataLoading": false,
  },
  "ProfileData": {
    "fetchUserDataError": false,
    "fetchUserDataLoading": false,
    "generalUserData": {
        "first_name": "testUserFirstName",
        "last_name": "testUserLastName",
    },
    "userHealthData": {
        "DOB": {
            "month": 10,
            "year": 1996,
        },
        "gender": "Female",
        "height": {
            "feet": 8,
            "inch": 7,
        },
        "weight": 197,
    },
  },"meditation": {
    "audioState": {
        "currentIndex": 0,
        "isBuffering": true,
        "isPlaying": false,
        "isReady": false,
        "playbackInstance": null,
        "volume": 1,
    },
    "courseData": [],
    "favoriteMeditations": [
        {
            "catagories": [
                2,
                3,
            ],
            "course_id": "B",
            "favorited_by": [
                3,
                1,
            ],
            "id": 2,
            "image_uri": "meditationPhoto1",
            "title": "second one",
        },
        {
            "catagories": [
                4,
            ],
            "course_id": "C",
            "favorited_by": [
                1,
            ],
            "id": 3,
            "image_uri": "meditationPhoto2",
            "title": "Third one",
        },
        {
            "catagories": [
                5,
            ],
            "course_id": "D",
            "favorited_by": [
                1,
            ],
            "id": 4,
            "image_uri": "meditationPhoto3",
            "title": "Fourth one",
        },
    ],
    "fetchCourseDataError": false,
    "fetchCourseDataLoading": false,
    "fetchCoursesError": false,
    "fetchCoursesLoading": false,
    "fetchFeelingsError": false,
    "fetchFeelingsLoading": false,
    "filteredMeditations": [
        {
            "catagories": [
                1,
                2,
            ],
            "course_id": "A",
            "favorited_by": [
                3,
            ],
            "id": 1,
            "image_uri": "meditationPhoto",
            "title": "First one",
        },
        {
            "catagories": [
                2,
                3,
            ],
            "course_id": "B",
            "favorited_by": [
                3,
                1,
            ],
            "id": 2,
            "image_uri": "meditationPhoto",
            "title": "second one",
        },
        {
            "catagories": [
                4,
            ],
            "course_id": "C",
            "favorited_by": [
                1,
            ],
            "id": 3,
            "image_uri": "meditationPhoto",
            "title": "Third one",
        },
        {
            "catagories": [
                5,
            ],
            "course_id": "D",
            "favorited_by": [
                1,
            ],
            "id": 4,
            "image_uri": "meditationPhoto",
            "title": "Fourth one",
        },
    ],
    "filters": {
        "testAdvancedFilter": false,
        "testAnxietyFilter": false,
        "testBegginerFilter": false,
        "testConfidenceFilter": false,
        "testDepressionFilter": false,
        "testFavoriteFilter": false,
    },
    "meditations": [
        {
            "catagories": [
                1,
                2,
            ],
            "course_id": "A",
            "favorited_by": [
                3,
            ],
            "id": 1,
            "image_uri": "meditationPhoto",
            "title": "First one",
        },
        {
            "catagories": [
                2,
                3,
            ],
            "course_id": "B",
            "favorited_by": [
                3,
                1,
            ],
            "id": 2,
            "image_uri": "meditationPhoto",
            "title": "second one",
        },
        {
            "catagories": [
                4,
            ],
            "course_id": "C",
            "favorited_by": [
                1,
            ],
            "id": 3,
            "image_uri": "meditationPhoto",
            "title": "Third one",
        },
        {
            "catagories": [
                5,
            ],
            "course_id": "D",
            "favorited_by": [
                1,
            ],
            "id": 4,
            "image_uri": "meditationPhoto",
            "title": "Fourth one",
        },
    ],
    "myFeelings": {
        "anxious": 4,
        "depressed": 5,
        "excited": 4,
        "id": 132,
        "lost": 5,
        "stressed": 5,
        "user": 1,
    },
  },
  
  }

export default InitialState;