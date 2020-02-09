import React from 'react'
import PropTypes from 'prop-types'
import './style.css'

const Save = props => (
    <article className={ `save${ props.active ? ' active' : '' }` } onClick={ () => props.onClick( props.index ) }>
        <h1>{ ( props.index + 1 ) }</h1>
        <dl>
            <dt>Difficulty</dt>
            <dd>{ props.difficulty }</dd>
            <dt>Time</dt>
            <dd>{ props.time }</dd>
            <dt>Mistakes</dt>
            <dd>{ props.mistakes }</dd>
        </dl>
    </article>
)

Save.defaultProps = {
    active: false
}

Save.propTypes = {
    active: PropTypes.bool,
    difficulty: PropTypes.string.isRequired,
    index: PropTypes.number.isRequired,
    mistakes: PropTypes.number.isRequired,
    onClick: PropTypes.func.isRequired,
    time: PropTypes.string.isRequired
}

export default Save