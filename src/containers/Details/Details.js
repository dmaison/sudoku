import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { LEVEL_EASY } from '../../constants/difficulties'
import './style.css';

/**
 * @name Details
 * @function
 * @returns {JSX}
 * @description Displays the menu controls for the game
 */
class Details extends React.PureComponent { 

    constructor( props ){
        super( props );
        this.state = {
            time: 0
        };
        this.timer;
        this.timerStart();
    }

    static defaultProps = {
        difficulty: LEVEL_EASY
    }

    componentDidUpdate( prevProps ){
        if( prevProps.game !== this.props.game ) return this.timerReset();
        if( !prevProps.timerOn && this.props.timerOn ) this.timerStart();
        if( prevProps.timerOn && !this.props.timerOn ) this.timerPause();
    }

    /**
     * @name timerFormat
     * @method
     * @description Formats the time into minutes and seconds
     */
    timerFormat(){

        let seconds = this.state.time, 
        minutes = Math.floor( seconds / 60);
        seconds = Math.round( ( seconds - ( minutes * 60 ) ) % 60 );
        
        if( minutes < 10 ) minutes = '0' + minutes.toString();
        if( seconds < 10 ) seconds = '0' + seconds.toString();

        return `${ minutes }:${ seconds }`;
    }

    /**
     * @name timerPause
     * @method
     * @description Stops the timer
     */
    timerPause(){
        clearInterval( this.timer );
    }

    /**
     * @name timerReset
     * @method
     * @desription Resets the game timer
     */
    timerReset(){
        this.timerPause();
        this.setState({ time: 0 });
        this.timerStart();
    }

    /**
     * @name timerStart
     * @method
     * @desription Starts the game timer
     */
    timerStart(){
        this.timer = setInterval(() => {
            this.setState({ time: this.state.time + 1 });
        }, 1000 );
    }    

    render(){
        return (
            <aside className="details">
                <span data-value={ this.props.mistakes }>Mistakes</span>
                <span data-value={ this.timerFormat() }>Timer</span>
                <span data-value={ this.props.difficulty }>Difficulty</span>
            </aside>
        );
    }
}

const mapStateToProps = state => ({
    difficulty: state.app.difficulty,
    mistakes: state.app.mistakes,
    game: state.app.game,
    timerOn: state.app.timerOn
});

export default connect( mapStateToProps )( Details );