import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { clearNote, highlight, trackMistake } from '../../../actions/app';
import { GRID_MINIMUM, GRID_MAXIMUM } from '../../../constants/grid';
import Note from '../Note';
import './style.css';

/**
 * @name Cell
 * @class
 * @extends React.PureComponent
 * @description Displays the cell input and note for the grid
 * @param {Object} active
 * @param {number} active.column
 * @param {number} active.row
 * @param {number} active.section
 * @param {number} column
 * @param {function} highlight
 * @param {boolean} noteMode
 * @param {number} row
 * @param {number} section
 * @param {number} value
 */
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
        clear: PropTypes.shape({
            column: PropTypes.number,
            row: PropTypes.number,
            section: PropTypes.number,
            value: PropTypes.number
        }).isRequired,
        clearNote: PropTypes.func.isRequired,
        column: PropTypes.number.isRequired,
        highlight: PropTypes.func.isRequired,
        noteMode: PropTypes.bool,
        row: PropTypes.number.isRequired,
        section: PropTypes.number.isRequired,
        trackMistake: PropTypes.func.isRequired,
        value: PropTypes.number
    }

    componentDidUpdate( prevProps ){
        // handle when a new game has been started
        if( this.props.disabled && this.state.value !== this.props.value ){ 
            this.setState({ error: false, value: this.props.value, notes: [] });

        // clear cell when previous cell displayed the answer by default
        } else if( ( !this.props.disabled && prevProps.disabled ) || prevProps.value !== this.props.value ){
            this.setState({ error: false, value: '', notes: [] });

        }

        if( this.shouldClearNote( prevProps ) ) this.setNote({ key: this.props.clear.value }, true );
    }

    /**
     * @name shouldClearNote
     * @method
     * @description Determines if the note should be cleared from the cell
     * @returns {boolean} `true` if the note should be cleared, `false` if no action should be taken
     */
    shouldClearNote( prevProps ){

        if( 
            prevProps.clear.column === this.props.clear.column &&
            prevProps.clear.row === this.props.clear.row &&
            prevProps.clear.section === this.props.clear.section &&
            prevProps.clear.value === this.props.clear.value
        ) return false;

        return (
            this.props.clear.column === this.props.column ||
            this.props.clear.row === this.props.row ||
            this.props.clear.section === this.props.section
        );
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
    setNote = ( e, forceClear=false ) => {
        
        // don't add/remove notes when there's already a value set
        if( this.state.value !== '' ) return;

        let value = Number( e.key ),
        notes = [ ...this.state.notes ],
        index = notes.indexOf( value );
        if( this.isInvalidNumber( value ) ) return ( e.preventDefault && e.preventDefault() );

        if( index === -1 && !forceClear ){
            notes.push( value );
        } else {
            if( index !== -1 ) notes.splice( index, 1 );
        }
        this.setState({ notes });
    }

    /**
     * @name isInvalidNumber
     * @method
     * @description Determines if the provided value is outside the accepted range for the grid
     * @returns {boolean} `true` if the number is invalid (i.e. less than 1 or greater than 9), `false` if the number is value
     * @param {number} value Number to be evaluated
     */
    isInvalidNumber( value ){
        return ( value < GRID_MINIMUM || value > GRID_MAXIMUM );
    }

    /**
     * _**Ignore the input prop type onChange console error!**_ This needs to occur for `onKeyDown`, otherwise we 
     * can't enforce values or let the user delete their last entry
     * @name validate
     * @method
     * @description Validates the user's input against the puzzle
     * @param {EventListenerObject} e
     */
    validate = e => {

        if( this.state.value !== '' && !this.state.error ) return;

        let value = Number( e.key ),
        error = false;
        if( e.key === 'Backspace' && this.state.value !== '' ) return this.setState({ error: false, value: '' });
        if( isNaN( value ) ) return;        
        if( this.isInvalidNumber( value ) ) return e.preventDefault();
        error = ( !isNaN( value ) && value !== this.props.value );
        if( error ) this.props.trackMistake();
        this.setState({ error, value, notes: [] });
        if( !error ) this.props.clearNote( this.props.column, this.props.row, this.props.section, value );
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
    clear: state.app.clear,
    noteMode: state.app.noteMode
});

const mapDispatchToProps = dispatch => bindActionCreators({ clearNote, highlight, trackMistake }, dispatch );

export default connect( mapStateToProps, mapDispatchToProps )( Cell );