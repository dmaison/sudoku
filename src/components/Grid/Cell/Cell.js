import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { handleInput, highlight } from '../../../actions/app';
import Note from '../Note';
import './style.css';

/**
 * @name Cell
 * @class
 * @extends React.PureComponent
 * @description Displays the cell input and note for the grid
 * @param {Object} active
 * @param {number} active.column
 * @param {number} active.row
 * @param {number} active.section
 * @param {number} column
 * @param {function} highlight
 * @param {boolean} noteMode
 * @param {number} row
 * @param {number} section
 * @param {number} value
 */
function Cell( props ){

    const [ error, setError ] = useState( false ),
    [ value, setValue ] = useState( '' ),
    [ active, setActive ] = useState( false ),
    [ notes, setNotes ] = useState( [] ),
    [ update, setUpdate ] = useState( false );

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

    });
    
    if( error ) classes.push( 'error' );

    if( active ) classes.push( 'active' );

    return (
        <div className={ classes.join( ' ' ) }>
            <Note values={ props.notes } />
            <input 
                value={ value }
                disabled={ props.disabled } 
                onBlur={ () => props.highlight() }
                onChange={ () => setUpdate( !update ) }
                onKeyDown={ e => props.handleInput( props.column, props.row, props.section, e.key ) }
                onFocus={ () => props.highlight( props.column, props.row, props.section ) } />
        </div>
    );

}

Cell.defaultProps = {
    noteMode: false
};

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
};

const mapStateToProps = state => ({
    active: state.app.active
});

const mapDispatchToProps = dispatch => bindActionCreators({ handleInput, highlight }, dispatch );

export default connect( mapStateToProps, mapDispatchToProps )( Cell );