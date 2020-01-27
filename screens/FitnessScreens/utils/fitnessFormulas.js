import React from 'react'

/**
 * Calculate the current total calories burned by the user for the day.
 * 
 * Use the formula .005 * steps * (weight/155)
 * 
 * An avg burning of calories for someone 155 pounds per step is 1 * .005 so
 * anyone larger will burn more weight per step so someone twice as big (310lbs)
 * will burn twice as many calories per step.
 * 
 * @param {Number} totalDailySteps total current daily steps.
 * @param {Number} userWeight register weight of user.
 */
const calculateCaloriesBurned = (totalDailySteps, userWeight) => {
    const caloriesBurned = 0.05 * totalDailySteps * (userWeight / 155) //
    return caloriesBurned
} 

/**
 * Calculate the distance walked in miles by the user today by their total daily steps.
 * 
 * An average person walks a mile in 2200 steps
 * 
 * @param {Number} totalDailySteps total current daily steps.
 */
const calculateDistanceWalked = (totalDailySteps) => {
    const distanceWalked = totalDailySteps / 2200
    return distanceWalked

}

export  {calculateCaloriesBurned, calculateDistanceWalked}