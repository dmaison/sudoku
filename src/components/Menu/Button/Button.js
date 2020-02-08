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
function Button( props ){

    let classes = [ 'menu', 'item' ];

    if( props.active ) classes.push( 'active' );

    return (
        <button 
            className={ classes.join( ' ' ) }
            data-label={ props.hoverText }
            onClick={ props.onClick }>
                <i className={ `fas fa-${ props.icon }` } />
        </button>
    );
}

Button.propTypes = {
    hoverText: PropTypes.string,
    icon: PropTypes.oneOf([ 'bars', 'cog', 'edit', 'save', 'sync', 'folder-open' ]).isRequired,
    onClick: PropTypes.func
}

export default Button;