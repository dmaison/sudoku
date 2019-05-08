import React from 'react';
import PropTypes from 'prop-types';
import Note from '../Note';
import './style.css';

class Cell extends React.PureComponent {

    constructor( props ){
        super( props );
        this.state = {
            error: false
        }
    }

    static propTypes = {
        value: PropTypes.number
    }

    render(){

        let classes = [ 'cell' ];

        if( this.state.error ) classes.push( 'error' );

        return (
            <div className={ classes.join( ' ' ) }>
                <Note />
                <input />
            </div>
        );
    }

}

export default Cell;