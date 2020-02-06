import { useEffect, useRef } from 'react';

/**
 * @name usePrevious
 * @function
 * @description Custom hook to replace prevProps and/or prevState
 * @param {*} value The value to save as a state
 */
export const usePrevious = value => {
    const ref = useRef();
    useEffect( () => {
        ref.current = value;
    });
    return ref.current;
}