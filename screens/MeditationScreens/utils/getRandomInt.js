import React from "react";
/**
 * Produce a random integer from the range given.
 *
 * Used to pick a motivational image from an array of images.
 * @param {number} min minimum value that can be returned
 * @param {number} max Maximum value that can be returned
 */
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export default getRandomInt;
