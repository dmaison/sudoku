import { useEffect, useRef } from 'react';

/**
 * Allows for intervals to be used and manipulate the state
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