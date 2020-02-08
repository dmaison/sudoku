import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { handleDialog, load } from '../../../actions/app';
import { GAME_LOAD } from '../../../constants/menu';
import Button from '../../../components/Menu/Button';
import Save from '../../../components/Menu/Save';
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

    const [ load, setLoad ] = useState( null )

    const handleLoad = () => {

    }

    /**
     * @name handleClick
     * @function
     * @description Sets the save game to be loaded or deselects the save
     * @param {number} index index of the save to be loaded
     */
    const handleClick = index => setLoad( load !== index ? index : null );

    return (
        props.saves.length > 0 ?
            <>
                <Button icon="folder-open" hoverText="Load (L)" onClick={ () => props.handleDialog( GAME_LOAD ) } />
                <Dialog id={ GAME_LOAD } onAccept={ handleLoad }>
                    <h1>
                        <i className="fas fa-folder-open fa-2x" />
                        Load Game
                    </h1>
                    <Warning />
                    <section className="saves">
                        {
                            props.saves.map(
                                ( save, index ) => <Save active={ ( index === load ) } index={ index } key={ index } onClick={ handleClick } { ...save }  />
                            )
                        }
                    </section>
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
    load: PropTypes.func.isRequired,
    saves: PropTypes.arrayOf(
        PropTypes.shape({
            date: PropTypes.string
        })
    )
};

const mapStateToProps = state => ({
    saves: state.app.saves
});

const mapDispatchToProps = dispatch => bindActionCreators({ handleDialog, load }, dispatch );

export default connect( mapStateToProps, mapDispatchToProps )( Load );