import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { KEYS } from '../../../constants/config';
import { toggleNoteMode } from '../../../actions/app';
import Button from '../../../components/Menu/Button';
import './style.css';

/**
 * @name ToggleNoteMode
 * @function
 * @returns {JSX}
 * @description Displays the menu controls for the game
 */
function ToggleNoteMode( props ){
    
    const [ noteMode, setNoteMode ] = useState( props.noteMode ),
    [ event, setEvent ] = useState( false ); 

    useEffect(() => {

        if( noteMode !== props.noteMode ) props.toggleNoteMode();

    });

    if( !event ){
        document.addEventListener( 'keydown', bindKeys );
        setEvent( true );
    }

    /**
     * @name bindKeys
     * @function
     * @description binds key events to N key, to allow user to toggle notemode without leaving the game
     * @param {EventListenerObject} e 
     */
    const bindKeys = e => {
        console.log( 'wtf' )
        switch( e.code ){
            case KEYS.NOTES:
                setNoteMode( !noteMode );
                break;
            default:
                return;
        }
    }

    /**
     * @name handleNoteMode
     * @constant
     * @function
     */
    const handleNoteMode = () => {
        setNoteMode( !noteMode );
        props.toggleNoteMode();
    };

    return (
        <Button 
            icon="edit" 
            hoverText="Toggle Note Mode (N)" 
            active={ noteMode } 
            onClick={ () => handleNoteMode() } />       
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