import React from 'react'
import { BUG_URL } from '../../../constants/config'
import Button from '../../../components/Menu/Button'
import './style.css'

/**
 * @name ReportBug
 * @function
 * @returns {JSX}
 * @description Displays the menu controls for the game
 */
const ReportBug = () => (
    <Button icon="bug" hoverText="Report a Bug" onClick={ () => window.open( BUG_URL ) } />
)

export default ReportBug