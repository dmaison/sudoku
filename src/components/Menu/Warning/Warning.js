import React from 'react'
import './style.css'

/**
 * @name Warning
 * @function 
 * @returns {JSX}
 * @description Displays warning message about starting a new game
 */
const Warning = () => (
    <p className="warning">
        Clicking accept will cause any unsaved progress to be lost.
    </p>
)

export default Warning