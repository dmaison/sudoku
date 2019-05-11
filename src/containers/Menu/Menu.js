import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { reset, handleDialog } from '../../actions/app';
import { NEW_GAME } from '../../constants/menu';
import Button from '../../components/Menu/Button';
import Dialog from '../../components/Dialog';
import './style.css';

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
            <Button icon="sync" hoverText="New Game" onClick={ () => props.handleDialog( NEW_GAME ) } />
            <Button icon="cog" hoverText="Change Difficulty" />
            <Button icon="save" hoverText="Save (S)" />
        </nav>
        <Dialog id={ NEW_GAME }>
            here!!
        </Dialog>
    </React.Fragment>
)


const mapStateToProps = state => ({ });

const mapDispatchToProps = dispatch => bindActionCreators({ handleDialog, reset }, dispatch );

export default connect( mapStateToProps, mapDispatchToProps )( Menu );