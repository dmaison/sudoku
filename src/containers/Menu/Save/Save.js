import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { handleDialog, save } from '../../../actions/app';
import { GAME_SAVE, GAME_SAVED } from '../../../constants/menu';
import Button from '../../../components/Menu/Button';
import Dialog from '../../../components/Dialog';
import './style.css';

/**
 * @name Save
 * @function
 * @returns {JSX}
 * @description Displays the menu controls for the game
 */
const Save = props => (
    <>
        <Button icon="save" hoverText="Save (S)" onClick={ () => props.handleDialog( GAME_SAVE ) } />
        <Dialog id={ GAME_SAVE } onAccept={ props.save }>
            <h1>
                <i className="fas fa-save fa-2x" />
                Save Game
            </h1>
        </Dialog>
        <Dialog id={ GAME_SAVED } acknowledge>
            <h1>
                <i className="fas fa-save fa-2x" />
                Game Saved Successfully!
            </h1>
        </Dialog>
    </>
);

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