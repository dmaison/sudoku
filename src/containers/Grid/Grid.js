import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { GRID_OPTIONS } from '../../constants/grid';
import { reset } from '../../actions/app';
import Cell from '../../components/Grid/Cell';
import Section from '../../components/Grid/Section';
import './style.css';

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

const mapStateToProps = state => ({
    grid: state.app.grid
});

const mapDispatchToProps = dispatch => bindActionCreators({ reset }, dispatch );

export default connect( mapStateToProps, mapDispatchToProps )( Grid );