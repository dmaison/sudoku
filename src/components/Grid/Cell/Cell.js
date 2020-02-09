import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import KeyboardEventHandler from 'react-keyboard-event-handler'
import { KEYS } from '../../../constants/config'
import { handleInput, highlight } from '../../../actions/app'
import Note from '../Note'
import './style.css'

/**
 * @name Cell
 * @function
 * @returns {JSX}
 * @description Displays the cell input and note for the grid
 * @param {Object} active
 * @param {number} active.column
 * @param {number} active.row
 * @param {number} active.section
 * @param {number} column
 * @param {function} highlight
 * @param {number} input
 * @param {number} row
 * @param {number} section
 * @param {number} value
 */
function Cell( props ){

    const [ error, setError ] = useState( false ),
    [ value, setValue ] = useState( '' ),
    [ active, setActive ] = useState( false ),
    [ selected, setSelected ] = useState( false );;

    let classes = [ 'cell' ];

    useEffect( () => {
        
        if( !props.input ){
            if( props.disabled && value !== props.value ) setValue( props.value ); 
            if( !props.disabled && value !== '' ) setValue( '' );
        } else {
            setValue( props.input  );
        }

        // check for errors
        setError( ( !isNaN( props.input ) && props.input !== props.value ) );

        // check for active
        setActive( props.column === props.active.column || props.row === props.active.row || props.section === props.active.section );
        setSelected( props.column === props.active.column && props.row === props.active.row && props.section === props.active.section );

    }, [ props.input, props.value, props.column, props.active.column, props.active.row, props.active.section, props.row, props.section, props.disabled, value ]);

    /**
     * @name handleClick
     * @function
     * @description Handles selection of the cell
     */
    const handleClick = () => props.highlight( props.column, props.row, props.section );

    /**
     * @name handleInput
     * @function
     * @description Handles data entry to the cell
     * @param {*} key 
     */
    const handleInput = key => {
        if( selected && !props.disabled ) props.handleInput( props.column, props.row, props.section, ( key === KEYS.BACKSPACE ) ? '' : key );
    }

    if( error ) classes.push( 'error' );

    if( active ) classes.push( 'active' );

    if( selected ) classes.push( 'selected' );

    if( props.disabled ) classes.push( 'disabled' );

    return (
        <>
            <div 
                className={ classes.join( ' ' ) } 
                data-column={ props.column }
                data-row={ props.row } 
                onClick={ handleClick }>
                    <Note values={ props.notes } />
                    <span>{ value }</span>
            </div>
            <KeyboardEventHandler
                handleKeys={[ KEYS.BACKSPACE, KEYS.NUMERIC ]}
                onKeyEvent={ handleInput } />
        </>
    );

}

Cell.defaultProps = {
    notes: []
}

Cell.propTypes = {
    active: PropTypes.shape({
        column: PropTypes.number,
        row: PropTypes.number,
        section: PropTypes.number
    }).isRequired,
    column: PropTypes.number.isRequired,
    highlight: PropTypes.func.isRequired,
    input: PropTypes.number,
    notes: PropTypes.array,
    row: PropTypes.number.isRequired,
    section: PropTypes.number.isRequired,
    value: PropTypes.number
}

const mapStateToProps = state => ({
    active: state.app.active
})

const mapDispatchToProps = dispatch => bindActionCreators({ handleInput, highlight }, dispatch )

export default connect( mapStateToProps, mapDispatchToProps )( Cell )