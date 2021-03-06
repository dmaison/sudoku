import React from 'react'
import { GRID_OPTIONS } from '../../../constants/grid'
import PropTypes from 'prop-types'
import './style.css'

const Note = props => (
    <mark className="notes">
        {
            GRID_OPTIONS.map(
                option => <span 
                            className={ props.values.includes( option ) ? 'active' : null }
                            data-value={ option }
                            key={ option } />
            )
        }
    </mark>
)

Note.defaultProps = {
    values: []
}

Note.propTypes = {
    values: PropTypes.arrayOf( PropTypes.number )
}

export default Note