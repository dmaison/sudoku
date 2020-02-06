import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { handleDialog } from '../../../actions/app';
import { GAME_SAVE } from '../../../constants/menu';
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
        <Dialog id={ GAME_SAVE } onAccept={ () => {} }>
            <h1>
                <i className="fas fa-save fa-2x" />
                Save Game
            </h1>
            {
                props.saves.length > 0 ?
                    <p>show dropdown</p>:
                    null
            }
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
    )
};

const mapStateToProps = state => ({
    saves: state.saves
});

const mapDispatchToProps = dispatch => bindActionCreators({ handleDialog }, dispatch );

export default connect( mapStateToProps, mapDispatchToProps )( Save );