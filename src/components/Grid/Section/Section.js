import React from 'react'
import './style.css'

/**
 * @name Section
 * @function
 * @description Renders a section, a group of 3x3 cells, within the `<Grid />`
 * @param {*} props 
 */
const Section = props => (
    <section>
        { props.children }
    </section>
)

export default Section