import { useEffect, useRef } from 'react';

/**
 * This custom hook enables calling a provided function at a specified interval using the setInterval() function.
 * The hook takes in a callback function and an interval duration in milliseconds.
 * The provided callback function will be executed repeatedly at the specified interval.
 * This hook uses the useRef() and useEffect() hooks to manage the interval and maintain the latest callback function.
 *
 * @param {function} callback - The function to be called at the specified interval.
 * @param {number} interval - The interval duration in milliseconds.
 * @returns {void}
 * @usedIn App.js
*/
export default function UseInterval(callback, interval) {
    const savedCallback = useRef();

    // Remember the last callback.
    useEffect(() => {
        savedCallback.current = callback;
    }, [callback]);

    // Set up the interval.
    useEffect(() => {
        const tick = () => {
            savedCallback.current();
        };
        const intervalId = setInterval(tick, interval);

        // Clean up the interval when the component unmounts or the interval changes.
        return () => {
            clearInterval(intervalId);
        };
    }, [interval]);
}