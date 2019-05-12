import React from 'react';
import './style.css';

/**
 * @name Warning
 * @function 
 * @returns {JSX}
 * @description Menu control
 */
const Warning = () => (
    <p className="warning">
        Clicking accept will begin a new game and all unsaved progress will be lost.
    </p>
);

export default Warning;