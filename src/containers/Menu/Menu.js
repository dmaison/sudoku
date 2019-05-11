import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { reset, handleDialog, setDifficulty, toggleNoteMode } from '../../actions/app';
import { GAME_DIFFICULTY, GAME_NEW, GAME_SAVE } from '../../constants/menu';
import { DIFFICULTIES, LEVEL_EASY } from '../../constants/difficulties';
import Button from '../../components/Menu/Button';
import Dialog from '../../components/Dialog';
import './style.css';

/**
 * @name WARNING
 * @constant
 * @description JSX of the lost content warning message
 */
const WARNING = (
    <p className="warning">
        Clicking accept will begin a new game and all unsaved progress will be lost.
    </p>
);

/**
 * @name handleDifficulty
 * @constant
 * @function
 * @description Retrieves the selected difficulty value and applies it to the game
 * @param {Object} props Properties passed from the JSX component containing actions
 * @param {function} setState Sets the state of the component
 */
const handleDifficulty = ( props, setState ) => {
    let select = document.querySelector( `dialog[data-id=${ GAME_DIFFICULTY }] select` ),
    value = select.value;
    setState( value );
    props.setDifficulty( select.value );
};

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
 * @name Menu
 * @function
 * @returns {JSX}
 * @description Displays the menu controls for the game
 */
const Menu = props => {

    const [ noteMode, setNoteMode ] = useState( props.noteMode ),
    [ difficulty, setDifficulty ] = useState( props.difficulty );

    return (
        <React.Fragment>
            <nav>
                <Button icon="edit" hoverText="Toggle Note Mode (N)" active={ noteMode } onClick={ () => handleNoteMode( props, setNoteMode, noteMode ) } />
                <Button icon="sync" hoverText="New Game" onClick={ () => props.handleDialog( GAME_NEW ) } />
                <Button icon="cog" hoverText="Change Difficulty" onClick={ () => props.handleDialog( GAME_DIFFICULTY ) } />
                <Button icon="save" hoverText="Save (S)" onClick={ () => props.handleDialog( GAME_SAVE ) } />
            </nav>
            <Dialog id={ GAME_NEW } onAccept={ props.reset }>
                <h1>
                    <i className="fas fa-sync fa-2x" />
                    New Game
                </h1>
                { WARNING }
            </Dialog>
            <Dialog id={ GAME_DIFFICULTY } onAccept={ () => handleDifficulty( props, setDifficulty ) }>
                <h1>
                    <i className="fas fa-cog fa-2x" />
                    Change Difficulty
                </h1>
                { WARNING }
                <form>
                    <select id="difficulty" defaultValue={ difficulty }>
                        {
                            DIFFICULTIES.map(
                                ( option, index ) => (
                                    <option key={ `difficulty-${ index }` } disabled={ difficulty === option.level } value={ option.level }>
                                        { option.level }
                                    </option>
                                )
                            )
                        }
                    </select>
                </form>
            </Dialog>
            <Dialog id={ GAME_SAVE } onAccept={ () => handleDifficulty( props, setDifficulty ) }>
                <h1>
                    <i className="fas fa-save fa-2x" />
                    Save Game
                </h1>
                <form>
                    {
                        props.saves.length > 0 ?
                            <select id="difficulty" defaultValue={ difficulty }>
                                {
                                    props.saves.map(
                                        ( option, index ) => (
                                            <option key={ `difficulty-${ index }` } disabled={ difficulty === option.level } value={ option.level }>
                                                { option.level }
                                            </option>
                                        )
                                    )
                                }
                            </select>:
                            null
                    }
                </form>
            </Dialog>
        </React.Fragment>
    );
}

Menu.defaultProps = {
    difficulty: LEVEL_EASY,
    noteMode: false,
    saves: []
};

Menu.propTypes = {
    difficulty: PropTypes.string,
    handleDialog: PropTypes.func.isRequired,
    reset: PropTypes.func.isRequired,
    saves: PropTypes.arrayOf(
        PropTypes.shape({
            date: PropTypes.string
        })
    ),
    setDifficulty: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    difficulty: state.difficulty,
    noteMode: state.noteMode,
    saves: state.saves
});

const mapDispatchToProps = dispatch => bindActionCreators({ handleDialog, reset, setDifficulty, toggleNoteMode }, dispatch );

export default connect( mapStateToProps, mapDispatchToProps )( Menu );