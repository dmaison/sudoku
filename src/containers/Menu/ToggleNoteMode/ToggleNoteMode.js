import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import KeyboardEventHandler from 'react-keyboard-event-handler'
import { KEYS } from '../../../constants/config'
import { toggleNoteMode } from '../../../actions/app'
import Button from '../../../components/Menu/Button'
import './style.css'

/**
 * @name ToggleNoteMode
 * @function
 * @returns {JSX}
 * @description Displays the menu controls for the game
 */
const ToggleNoteMode = props => {

    const [ active, setActive ] = useState( false );

    useEffect(() => {
        if( props.noteMode !== active ) setActive( props.noteMode );
    }, [ props.noteMode, active ]);

    /**
     * @name handleNoteMode
     * @constant
     * @function
     */
    const handleNoteMode = () => props.toggleNoteMode();

    return (
        <>
            <Button 
                icon="edit" 
                hoverText="Toggle Note Mode (N)" 
                active={ active } 
                onClick={ handleNoteMode } />
            <KeyboardEventHandler
                handleKeys={[ KEYS.NOTES ]}
                onKeyEvent={ handleNoteMode } />
        </>
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
    noteMode: state.app.noteMode
});

const mapDispatchToProps = dispatch => bindActionCreators({ toggleNoteMode }, dispatch );

export default connect( mapStateToProps, mapDispatchToProps )( ToggleNoteMode );