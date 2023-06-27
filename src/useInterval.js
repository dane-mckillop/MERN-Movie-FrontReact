import { useEffect, useRef } from 'react';

/**
Calls a provided function at a specified interval using setInterval() hook.
@param {function} callback - The function to be called at the specified interval.
@param {number} interval - The interval duration in milliseconds.
@returns {void}
@usedIn App.js
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