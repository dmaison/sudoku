import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { INPUTS } from '../../constants/config'
import { handleInput, toggleNoteMode } from '../../actions/app'
import Button from '../../components/Controls/Button'
import './style.css'

/**
 * @name Controls
 * @function
 * @description Controls for non-keyboard devices inputs
 */
const Controls = props => {

    /**
     * @name handleInput
     * @function
     * @description Handles updating a cell value on clicking of a button
     * @param {*} value 
     */
    const handleInput = value => {
        props.handleInput( props.activeCell.column, props.activeCell.row, props.activeCell.section, value );
    }

    return (
        <aside className="controls">
            { 
                INPUTS.map(
                    ( input, index ) => (
                        <Button key={ index } onClick={ () => handleInput( input ) }>
                            { input }
                        </Button>
                    )
                )
            }
            <Button onClick={ () => handleInput( '' ) }>
                <i className="fas fa-eraser" />
            </Button>
            <Button active={ props.noteMode } onClick={ props.toggleNoteMode }>
                <i className="fas fa-edit" />
                <small>
                    <strong>{ props.noteMode ? 'ON' : 'OFF' }</strong>
                </small>
            </Button>
        </aside>
    );

}

Controls.propTypes = {
    activeCell: PropTypes.shape({
        column: PropTypes.number,
        row: PropTypes.number,
        section: PropTypes.number
    }).isRequired,
    handleInput: PropTypes.func.isRequired,
    noteMode: PropTypes.bool,
    toggleNoteMode: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
    activeCell: state.app.active,
    noteMode: state.app.noteMode
});

const mapDispatchToProps = dispatch => bindActionCreators({ handleInput, toggleNoteMode }, dispatch );

export default connect( mapStateToProps, mapDispatchToProps )( Controls )