import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { usePrevious, useInterval } from '../../utilities/hooks'
import { connect } from 'react-redux'
import { LEVEL_EASY } from '../../constants/difficulties'
import './style.css'

/**
 * @name Details
 * @function
 * @returns {JSX}
 * @description Displays the menu controls for the game
 */
function Details( props ){ 

    const [ time, setTime ] = useState( 0 ),
    prevGame = usePrevious( props.game );

    useInterval(() => {
        if( props.timerOn ) setTime( time + 1 );
    }, 1000 );

    useEffect(()=>{
        if( prevGame !== props.game ) return timerReset();
    });

    /**
     * @name timerFormat
     * @method
     * @description Formats the time into minutes and seconds
     */
    function timerFormat(){

        let seconds = time, 
        minutes = Math.floor( seconds / 60);
        seconds = Math.round( ( seconds - ( minutes * 60 ) ) % 60 );
        
        if( minutes < 10 ) minutes = '0' + minutes.toString();
        if( seconds < 10 ) seconds = '0' + seconds.toString();

        return `${ minutes }:${ seconds }`;
    }

    /**
     * @name timerReset
     * @method
     * @desription Resets the game timer
     */
    function timerReset(){
        setTime( 0 );
    } 

    return (
        <aside className="details">
            <span data-value={ props.mistakes }>Mistakes</span>
            <span data-value={ timerFormat() }>Timer</span>
            <span data-value={ props.difficulty }>Difficulty</span>
        </aside>
    );
}

Details.defaultProps = {
    difficulty: LEVEL_EASY,
    game: 1,
    mistakes: 0,
    timerOn: false
}

Details.propTypes = {
    difficulty: PropTypes.string,
    game: PropTypes.number,
    mistakes: PropTypes.number,
    timerOn: PropTypes.bool
}

const mapStateToProps = state => ({
    difficulty: state.app.difficulty,
    game: state.app.game,
    mistakes: state.app.mistakes,    
    timerOn: state.app.timerOn
});

export default connect( mapStateToProps )( Details );