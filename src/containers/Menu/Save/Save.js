import React from 'react'
import PropTypes from 'prop-types'
import KeyboardEventHandler from 'react-keyboard-event-handler'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { handleDialog, save } from '../../../actions/app'
import { MAX_SAVES, KEYS } from '../../../constants/config'
import { GAME_SAVE, GAME_SAVED } from '../../../constants/menu'
import Button from '../../../components/Menu/Button'
import Dialog from '../../../components/Dialog'
import './style.css'

/**
 * @name Save
 * @function
 * @returns {JSX}
 * @description Displays the menu controls for the game
 */
const Save = props => {

    const handleSave = () => props.handleDialog( GAME_SAVE )

    return (
        <>
            <Button icon="save" hoverText="Save (S)" onClick={ handleSave } />
            <Dialog id={ GAME_SAVE } onAccept={ props.save }>
                <h1>
                    <i className="fas fa-save fa-2x" />
                    Save Game
                </h1>
                {
                    props.saves.length === MAX_SAVES ?
                        <p>
                            You are about to exceed your limit of { MAX_SAVES } saves. <br />
                            If you accept, your oldest save will be deleted to make room.
                        </p> : 
                        null
                }
            </Dialog>
            <Dialog id={ GAME_SAVED } acknowledge>
                <h1>
                    <i className="fas fa-save fa-2x" />
                    Game Saved Successfully!
                </h1>
            </Dialog>
            <KeyboardEventHandler
                handleKeys={[ KEYS.SAVE ]}
                onKeyEvent={ handleSave } />
        </>
    );
}

Save.defaultProps = {
    saves: []
};

Save.propTypes = {
    handleDialog: PropTypes.func.isRequired,
    saves: PropTypes.arrayOf(
        PropTypes.shape({
            date: PropTypes.string
        })
    ),
    save: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    saves: state.app.saves
});

const mapDispatchToProps = dispatch => bindActionCreators({ handleDialog, save }, dispatch );

export default connect( mapStateToProps, mapDispatchToProps )( Save );