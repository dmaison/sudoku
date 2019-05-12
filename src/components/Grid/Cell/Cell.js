import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { highlight } from '../../../actions/app';
import { GRID_MINIMUM, GRID_MAXIMUM } from '../../../constants/grid';
import Note from '../Note';
import './style.css';

class Cell extends React.PureComponent {

    constructor( props ){
        super( props );
        this.state = {
            error: false,
            notes: [],
            value: props.disabled ? props.value : ''
        }
    }

    static defaultProps = {
        noteMode: false
    }

    static propTypes = {
        active: PropTypes.shape({
            column: PropTypes.number,
            row: PropTypes.number,
            section: PropTypes.number
        }).isRequired,
        highlight: PropTypes.func.isRequired,
        noteMode: PropTypes.bool,
        value: PropTypes.number
    }

    componentDidUpdate( prevProps ){
        // handle when a new game has been started
        if( this.props.disabled && this.state.value !== this.props.value ){ 
            this.setState({ error: false, value: this.props.value });

        // clear cell when previous cell displayed the answer by default
        } else if( !this.props.disabled && prevProps.disabled ){
            this.setState({ error: false, value: '' });
        }
    }

    /**
     * @name isActive
     * @method
     * @description Determines if the current cell should be highlighted
     * @returns {boolean} `true` if the cell should be highlighted, `false` if it should not be
     */
    isActive(){
        return (
            this.props.column === this.props.active.column ||
            this.props.row === this.props.active.row ||
            this.props.section === this.props.active.section
        )
    }

    /**
     * @name setNote
     * @method
     * @description Adds or removes a note value
     * @param {EventListenerObject} e
     */
    setNote = e => {
        let value = Number( e.key ),
        notes = [ ...this.state.notes ],
        index = notes.indexOf( value );
        if( this.isInvalidNumber( value ) ) return e.preventDefault();
        if( index === -1 ){
            notes.push( value );
        } else {
            notes.splice( index, 1 );
        }
        this.setState({ notes });
    }

    isInvalidNumber( value ){
        return ( value < GRID_MINIMUM || value > GRID_MAXIMUM );
    }

    /**
     * _**Ignore the input prop type error:**_ This needs to occur for `onKeyDown`, otherwise we can't enforce values or let the user delete their last entry
     * @name validate
     * @method
     * @description Validates the user's input against the puzzle
     * @param {EventListenerObject} e
     */
    validate = e => {
        let value = Number( e.key ),
        error = false;
        if( e.key === 'Backspace' && this.state.value !== '' ) return this.setState({ error: false, value: '' });
        if( this.isInvalidNumber( value ) ) return e.preventDefault();
        error = ( !isNaN( value ) && value !== this.props.value );
        this.setState({ error, value, notes: [] });
    }

    render(){

        let classes = [ 'cell' ];

        if( this.state.error ) classes.push( 'error' );

        if( this.isActive() ) classes.push( 'active' );

        return (
            <div className={ classes.join( ' ' ) }>
                <Note values={ this.state.notes } />
                <input 
                    value={ this.state.value }
                    disabled={ this.props.disabled } 
                    onBlur={ () => this.props.highlight() }
                    onKeyDown={ this.props.noteMode ? this.setNote : this.validate }
                    onFocus={ () => this.props.highlight( this.props.column, this.props.row, this.props.section ) } />
            </div>
        );
    }

}

const mapStateToProps = state => ({
    active: state.app.active,
    noteMode: state.app.noteMode
});

const mapDispatchToProps = dispatch => bindActionCreators({ highlight }, dispatch );

export default connect( mapStateToProps, mapDispatchToProps )( Cell );