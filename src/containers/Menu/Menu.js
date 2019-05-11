import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { reset, handleDialog, setDifficulty } from '../../actions/app';
import { GAME_DIFFICULTY, GAME_NEW } from '../../constants/menu';
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
 */
const handleDifficulty = props => {
    let select = document.querySelector( `dialog[data-id=${ GAME_DIFFICULTY }] select` );
    props.setDifficulty( select.value );
};

/**
 * @name Menu
 * @function
 * @returns {JSX}
 * @description Displays the menu controls for the game
 */
const Menu = props => (
    <React.Fragment>
        <nav>
            <Button icon="edit" hoverText="Toggle Note Mode (N)" />
            <Button icon="sync" hoverText="New Game" onClick={ () => props.handleDialog( GAME_NEW ) } />
            <Button icon="cog" hoverText="Change Difficulty" onClick={ () => props.handleDialog( GAME_DIFFICULTY ) } />
            <Button icon="save" hoverText="Save (S)" />
        </nav>
        <Dialog id={ GAME_NEW } onAccept={ props.reset }>
            <h1>
                <i className="fas fa-sync fa-2x" />
                New Game
            </h1>
            { WARNING }
        </Dialog>
        <Dialog id={ GAME_DIFFICULTY } onAccept={ () => handleDifficulty( props ) }>
            <h1>
                <i className="fas fa-cog fa-2x" />
                Change Difficulty
            </h1>
            { WARNING }
            <select id="difficulty" defaultValue={ props.difficulty }>
                {
                    DIFFICULTIES.map(
                        ( difficulty, index ) => (
                            <option key={ `difficulty-${ index }` } value={ difficulty.level }>
                                { difficulty.level }
                            </option>
                        )
                    )
                }
            </select>
        </Dialog>
    </React.Fragment>
);


Menu.defaultProps = {
    difficulty: LEVEL_EASY
};

Menu.propTypes = {
    difficulty: PropTypes.string,
    handleDialog: PropTypes.func.isRequired,
    reset: PropTypes.func.isRequired,
    setDifficulty: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    difficulty: state.difficulty
});

const mapDispatchToProps = dispatch => bindActionCreators({ handleDialog, reset, setDifficulty }, dispatch );

export default connect( mapStateToProps, mapDispatchToProps )( Menu );