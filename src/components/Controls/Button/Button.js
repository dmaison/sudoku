import React from 'react'
import PropTypes from 'prop-types'
import './style.css'

const Button = props => (
    <button className={ `control${ props.active ? ' active' : '' }` } onClick={ props.onClick }>
        { props.children }
    </button>
)

Button.propTypes = {
    active: PropTypes.bool,
    onClick: PropTypes.func
}

export default Button