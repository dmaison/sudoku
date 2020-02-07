import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { handleDialog, save } from '../../../actions/app';
import { GAME_LOAD } from '../../../constants/menu';
import Button from '../../../components/Menu/Button';
import Dialog from '../../../components/Dialog';
import Warning from '../../../components/Menu/Warning';
import './style.css';

/**
 * @name Load
 * @function
 * @returns {JSX}
 * @description Displays the menu controls for the game
 */
const Load = props => { 

    const handleLoad = () => {

    }

    return (
        props.saves.length > 0 ?
            <>
                <Button icon="folder-open" hoverText="Load (L)" onClick={ () => props.handleDialog( GAME_LOAD ) } />
                <Dialog id={ GAME_LOAD } onAccept={ handleLoad }>
                    <h1>
                        <i className="fas fa-save fa-2x" />
                        Load Game
                    </h1>
                    <Warning />
                </Dialog>
            </> :
            null
    );
}

Load.defaultProps = {
    saves: []
};

Load.propTypes = {
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

export default connect( mapStateToProps, mapDispatchToProps )( Load );