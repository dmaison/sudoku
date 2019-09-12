import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { GRID_OPTIONS } from '../../constants/grid';
import { KEYS } from '../../constants/config';
import { reset } from '../../actions/app';
import Cell from '../../components/Grid/Cell';
import Section from '../../components/Grid/Section';
import './style.css';

document.addEventListener( 'keydown', bindKeys );

/**
 * @name Grid
 * @function
 * @returns {JSX}
 * @description Displays the menu controls for the game
 */
const Grid = props => {

    useEffect( () => {
        props.reset();
    }, []);
    
    return (
        <main className="grid">
            {
                GRID_OPTIONS.map(
                    section => (
                        <Section key={ 'section-' + section }>
                            {
                                props
                                    .grid
                                    .filter( cell => cell.section === ( section - 1 ) )
                                    .map( ( cell, index ) => <Cell { ...cell } key={ `section-${ section }cell-${ index }` } /> )
                            }
                        </Section>
                    )
                )
            }
        </main>
    );
}

Grid.propTypes = {
    grid: PropTypes.arrayOf(
        PropTypes.shape({
            column: PropTypes.number.isRequired,
            row: PropTypes.number.isRequired,
            section: PropTypes.number.isRequired
        })
    ),
    reset: PropTypes.func.isRequired
};

/**
 * @name bindKeys
 * @function
 * @description binds key events to arrow keys, to allow user to move around the grid with keys
 * @param {EventListenerObject} e 
 */
function bindKeys( e ){
    
    const activeInput = document.querySelector( 'input:focus' ),
    activeCell = activeInput ? activeInput.parentElement : null;

    let nextSelector = 'div[data-row="{row}"][data-column="{column}"] > input',
    nextCell;

    if( !activeCell ) return;

    switch( e.code ){
        case KEYS.DOWN:
            nextSelector = nextSelector.replace( '{row}', ( Number( activeCell.dataset.row ) + 1 ) );
            break;
        case KEYS.LEFT:
            nextSelector = nextSelector.replace( '{column}', ( Number( activeCell.dataset.column ) - 1 ) );
            break;
        case KEYS.RIGHT:
            nextSelector = nextSelector.replace( '{column}', ( Number( activeCell.dataset.column ) + 1 ) );
            break;
        case KEYS.UP:
            nextSelector = nextSelector.replace( '{row}', ( Number( activeCell.dataset.row ) - 1 ) );
            break;
        default:
            return;
    }

    nextSelector = nextSelector.replace( '{column}', activeCell.dataset.column ).replace( '{row}', activeCell.dataset.row );

    nextCell = document.querySelector( nextSelector );

    if( nextCell ) nextCell.focus();
}

const mapStateToProps = state => ({
    grid: state.app.grid
});

const mapDispatchToProps = dispatch => bindActionCreators({ reset }, dispatch );

export default connect( mapStateToProps, mapDispatchToProps )( Grid );