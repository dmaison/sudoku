import React from 'react'
import PropTypes from 'prop-types'
import { INPUTS } from '../../constants/config'
import Button from '../../components/Controls/Button'
import './style.css'

const Controls = props => {

    return (
        <aside className="controls">
            { 
                INPUTS.map(
                    ( input, index ) => (
                        <Button key={ index }>
                            { input }
                        </Button>
                    )
                )
            }

        </aside>
    );

}

export default Controls;