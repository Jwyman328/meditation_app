import React from 'react'

const initialState = {
    "AuthData": {
        "logInfetchError": false,
        "logInfetchLoading": false,
        "loggedIn": true,
        "password": "MDJmdj19",
        "resetPasswordEmailSent": false,
        "resetPasswordFetchError": false,
        "resetPasswordLoading": false,
        "signUpFetchError": false,
        "signUpFetchLoading": false,
        "token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxLCJ1c2VybmFtZSI6Imp3eW1hbjMyOCIsImV4cCI6MTU4MDU4MDk3NiwiZW1haWwiOiIiLCJvcmlnX2lhdCI6MTU3OTk3NjE3Nn0.Jy4IMen1VYnUQHME82n0CmNti-ZhKd49qPEFcAjrDlI",
        "username": "jwyman328",
    },
    "Fitness": {
        "currentStepCount": undefined,
        "dailyStepGoal": 3005,
        "fetchDailyStepsError": false,
        "fetchDailyStepsLoading": false,
    },
    "FriendsAndMsgs": {
        "allUsers": [],
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
                "first_name": "",
                "last_name": "",
                "user_photo": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQMKQhvK67b_VSrblE3Kf_tZEjdSCxcrZS86s-dd858LnPy4LZGfw&s",
                "username": "jwyman328",
            },
            {
                "first_name": "",
                "last_name": "",
                "user_photo": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQMKQhvK67b_VSrblE3Kf_tZEjdSCxcrZS86s-dd858LnPy4LZGfw&s",
                "username": "jwyman123",
            },
        ],
        "pendingFriendRequests": [],
        "singleMessages": undefined,
    },
    "Mood": {
        "fetchMoodDataError": false,
        "fetchMoodDataLoading": true,
        "moodDates": [
            "2020-01-25T18:16:17.302642",
            "2020-01-18T18:16:17.302642",
            "2019-12-26T18:16:17.302642",
        ],
        "moodPastMonth": [
            4,
            2,
            2,
            1,
            2,
            2,
            2,
            2,
            2,
        ],
        "moodPastWeek": [
            2,
        ],
    },
    "ProfileData": {
        "fetchUserDataError": false,
        "fetchUserDataLoading": false,
        "generalUserData": {
            "first_name": "fdasfadsfsa",
            "last_name": "fdasfadsfdsafd",
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
    },
    "meditation": {
        "audioState": {
            "currentIndex": 0,
            "isBuffering": true,
            "isPlaying": false,
            "isReady": false,
            "playbackInstance": null,
            "volume": 1,
        },
        "courseData": [
            {
                "audio_uri": "'../audio/CapableChange.mp3'",
                "author": "Richard Burr",
                "course": 2,
                "id": 19,
                "image_source": "None",
                "meditation_course_photo": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQMKQhvK67b_VSrblE3Kf_tZEjdSCxcrZS86s-dd858LnPy4LZGfw&s",
                "orderNumber": 6,
                "time": 411,
                "title": "Capable Shift 2",
            },
            {
                "audio_uri": "../audio/restfulSleep.mp3",
                "author": "Richard Burr",
                "course": 2,
                "id": 15,
                "image_source": "None",
                "meditation_course_photo": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQMKQhvK67b_VSrblE3Kf_tZEjdSCxcrZS86s-dd858LnPy4LZGfw&s",
                "orderNumber": 7,
                "time": 831,
                "title": "Restful Sleep 2",
            },
            {
                "audio_uri": "../audio/WorkInProgress.mp3",
                "author": "Richard Burr",
                "course": 2,
                "id": 12,
                "image_source": "None",
                "meditation_course_photo": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQMKQhvK67b_VSrblE3Kf_tZEjdSCxcrZS86s-dd858LnPy4LZGfw&s",
                "orderNumber": 8,
                "time": 581,
                "title": "Work in Progress 2",
            },
            {
                "audio_uri": "../audio/PositiveSelf.mp3",
                "author": "Richard Burr",
                "course": 2,
                "id": 9,
                "image_source": "None",
                "meditation_course_photo": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQMKQhvK67b_VSrblE3Kf_tZEjdSCxcrZS86s-dd858LnPy4LZGfw&s",
                "orderNumber": 9,
                "time": 877,
                "title": "Positive Self 2",
            },
            {
                "audio_uri": "../audio/AnxietyFree.mp3",
                "author": "Richard Burr",
                "course": 2,
                "id": 6,
                "image_source": "None",
                "meditation_course_photo": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQMKQhvK67b_VSrblE3Kf_tZEjdSCxcrZS86s-dd858LnPy4LZGfw&s",
                "orderNumber": 10,
                "time": 752,
                "title": "Anxiety Free 2",
            },
        ],
        "favoriteMeditations": [
            {
                "catagories": [
                    2,
                    3,
                ],
                "course_id": "B",
                "favorited_by": [
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
        "fetchCourseDataError": false,
        "fetchCourseDataLoading": false,
        "fetchCoursesError": false,
        "fetchCoursesLoading": false,
        "fetchFeelingsError": false,
        "fetchFeelingsLoading": false,
        "filteredMeditations": [
            {
                "catagories": [
                    2,
                    3,
                ],
                "course_id": "B",
                "favorited_by": [
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
            {
                "catagories": [
                    1,
                    2,
                ],
                "course_id": "A",
                "favorited_by": [],
                "id": 1,
                "image_uri": "meditationPhoto",
                "title": "First one",
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
                    2,
                    3,
                ],
                "course_id": "B",
                "favorited_by": [
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
            {
                "catagories": [
                    1,
                    2,
                ],
                "course_id": "A",
                "favorited_by": [],
                "id": 1,
                "image_uri": "meditationPhoto",
                "title": "First one",
            },
        ],
        "myFeelings": {
            "anxious": 4,
            "depressed": 5,
            "excited": 4,
            "id": 133,
            "lost": 5,
            "stressed": 5,
            "user": 1,
        },
    },
}


export default initialState