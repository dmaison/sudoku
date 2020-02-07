import React from 'react'
import PropTypes from 'prop-types'
import './style.css'

const Button = props => {

    return (
        <button className="control" onClick={ props.onClick }>
            { props.children }
        </button>
    )

}

Button.propTypes = {
    onClick: PropTypes.func
}

export default Button