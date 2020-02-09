import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import KeyboardEventHandler from 'react-keyboard-event-handler'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { GRID_OPTIONS } from '../../constants/grid'
import { KEYS } from '../../constants/config'
import { reset, highlight } from '../../actions/app'
import Cell from '../../components/Grid/Cell'
import Section from '../../components/Grid/Section'
import './style.css'

/**
 * @name Grid
 * @function
 * @returns {JSX}
 * @description Displays the menu controls for the game
 */
const Grid = props => {

    const [ init, setInit ] = useState( false )

    useEffect( () => {
        if( !init ){
            props.reset();
            setInit( true );
        }
    }, [ init, props ]);
    
    /**
     * @name bindKeys
     * @function
     * @description binds key events to arrow keys, to allow user to move around the grid with keys
     * @param {string} key 
     */
    function handleKeys( key ){

        let column = props.active.column,
        row = props.active.row,
        section = props.active.section;

        switch( key ){
            case KEYS.DOWN:
                if( row !== 9 ) row += 1;
                if( row % 3 === 1 ) section += 3;
                break;
            case KEYS.LEFT:
                if( column !== 1 ) column -= 1;
                if( column % 3 === 0 ) section -= 1;
                break;
            case KEYS.RIGHT:
                if( column !== 9 ) column += 1;
                if( column % 3 === 1 ) section += 1;
                break;
            case KEYS.UP:
                if( row !== 1 ) row -= 1;
                if( row % 3 === 0 ) section -= 3;
                break;
            default:
                return;
        }

        props.highlight( column, row, section );
    }

    return (
        <>
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
            <KeyboardEventHandler
                handleKeys={[ KEYS.DOWN, KEYS.LEFT, KEYS.RIGHT, KEYS.UP ]}
                onKeyEvent={ handleKeys } />
        </>
    );
}

Grid.propTypes = {
    active: PropTypes.shape({
        column: PropTypes.number,
        row: PropTypes.number,
        section: PropTypes.number
    }),
    grid: PropTypes.arrayOf(
        PropTypes.shape({
            column: PropTypes.number.isRequired,
            row: PropTypes.number.isRequired,
            section: PropTypes.number.isRequired
        })
    ),
    highlight: PropTypes.func.isRequired,
    reset: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    active: state.app.active,
    grid: state.app.grid
});

const mapDispatchToProps = dispatch => bindActionCreators({ highlight, reset }, dispatch );

export default connect( mapStateToProps, mapDispatchToProps )( Grid );