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

/**
 * @name useInterval
 * @function
 * @description Allows for intervals to be used and manipulate the state
 * @param {function} callback function that executes for each interval
 * @param {number} delay interval increment
 */
export const useInterval = ( callback, delay ) =>{
    const savedCallback = useRef();
  
    // Remember the latest callback.
    useEffect(() => {
        savedCallback.current = callback;
    }, [ callback ]);
  
    // Set up the interval.
    useEffect(() => {
        function tick() {
            savedCallback.current();
        }
        if( delay !== null ){
            let id = setInterval( tick, delay );
            return () => clearInterval( id );
        }
    }, [ delay ]);
    
    return savedCallback.current;
  }