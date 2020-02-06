import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { handleDialog, setDifficulty } from '../../../actions/app';
import { GAME_DIFFICULTY } from '../../../constants/menu';
import { DIFFICULTIES, LEVEL_EASY } from '../../../constants/difficulties';
import Button from '../../../components/Menu/Button';
import Dialog from '../../../components/Dialog';
import Warning from '../../../components/Menu/Warning';
import './style.css';

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
 * @name Menu
 * @function
 * @returns {JSX}
 * @description Displays the menu controls for the game
 */
const ChangeDifficulty = props => {

    const [ difficulty, setDifficulty ] = useState( props.difficulty );

    return (
        <>
            <Button icon="cog" hoverText="Change Difficulty" onClick={ () => props.handleDialog( GAME_DIFFICULTY ) } />
            <Dialog id={ GAME_DIFFICULTY } onAccept={ () => handleDifficulty( props, setDifficulty ) }>
                <h1>
                    <i className="fas fa-cog fa-2x" />
                    Change Difficulty
                </h1>
                <Warning />
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
            </Dialog>
        </>
    );
}

ChangeDifficulty.defaultProps = {
    difficulty: LEVEL_EASY
};

ChangeDifficulty.propTypes = {
    difficulty: PropTypes.string,
    handleDialog: PropTypes.func.isRequired,
    setDifficulty: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    difficulty: state.difficulty
});

const mapDispatchToProps = dispatch => bindActionCreators({ handleDialog, setDifficulty }, dispatch );

export default connect( mapStateToProps, mapDispatchToProps )( ChangeDifficulty );