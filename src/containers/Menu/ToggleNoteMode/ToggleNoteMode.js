import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { toggleNoteMode } from '../../../actions/app';
import Button from '../../../components/Menu/Button';
import './style.css';

/**
 * @name handleNoteMode
 * @constant
 * @function
 * @param {Object} props 
 * @param {function} setState 
 * @param {boolean} active Current state of the Note Mode
 */
const handleNoteMode = ( props, setState, active ) => {
    setState( !active );
    props.toggleNoteMode();
};

/**
 * @name ToggleNoteMode
 * @function
 * @returns {JSX}
 * @description Displays the menu controls for the game
 */
const ToggleNoteMode = props => {
    const [ noteMode, setNoteMode ] = useState( props.noteMode );
    return (
        <Button 
            icon="edit" 
            hoverText="Toggle Note Mode (N)" 
            active={ noteMode } 
            onClick={ () => handleNoteMode( props, setNoteMode, noteMode ) } />       
    );
}

ToggleNoteMode.defaultProps = {
    noteMode: false
};

ToggleNoteMode.propTypes = {
    noteMode: PropTypes.bool,
    toggleNoteMode: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    noteMode: state.noteMode
});

const mapDispatchToProps = dispatch => bindActionCreators({ toggleNoteMode }, dispatch );

export default connect( mapStateToProps, mapDispatchToProps )( ToggleNoteMode );