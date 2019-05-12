import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { reset, handleDialog } from '../../../actions/app';
import { GAME_NEW } from '../../../constants/menu';
import Button from '../../../components/Menu/Button';
import Dialog from '../../../components/Dialog';
import Warning from '../../../components/Menu/Warning';
import './style.css';

/**
 * @name NewGame
 * @function
 * @returns {JSX}
 * @description Displays the menu controls for the game
 */
const NewGame = props => (
    <React.Fragment>
        <Button icon="sync" hoverText="New Game" onClick={ () => props.handleDialog( GAME_NEW ) } />
        <Dialog id={ GAME_NEW } onAccept={ props.reset }>
            <h1>
                <i className="fas fa-sync fa-2x" />
                New Game
            </h1>
            <Warning />
        </Dialog>
    </React.Fragment>
);

NewGame.propTypes = {
    handleDialog: PropTypes.func.isRequired,
    reset: PropTypes.func.isRequired
};

const mapStateToProps = state => ({ });

const mapDispatchToProps = dispatch => bindActionCreators({ handleDialog, reset }, dispatch );

export default connect( mapStateToProps, mapDispatchToProps )( NewGame );