import React from 'react';
import PropTypes from 'prop-types';
import './style.css';

/**
 * @name Button
 * @function 
 * @returns {JSX}
 * @description Menu control
 * @param {string} hoverText Text to display on mouseover
 * @param {string} [icon="cog"|"edit"|"save"|"sync"] Icon to display inside the button
 * @param {function} onClick Function to execute on click
 */
const Button = props => (
    <button 
        className="menu item"
        data-label={ props.hoverText }
        onClick={ props.onClick }>
            <i className={ `fas fa-${ props.icon }` } />
    </button>
);

Button.propTypes = {
    hoverText: PropTypes.string.isRequired,
    icon: PropTypes.oneOf([ 'cog', 'edit', 'save', 'sync' ]).isRequired,
    onClick: PropTypes.func
}

export default Button;