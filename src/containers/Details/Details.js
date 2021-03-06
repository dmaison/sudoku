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
    prevGame = usePrevious( props.game ),
    prevNewTime = usePrevious( props.newTime ),
    SECOND = 60;

    useInterval(() => {
        if( props.timerOn ) setTime( time + 1 );
    }, 1000 );

    useEffect(()=>{
        if( prevGame !== props.game ) return setTime( ( props.newTime && prevNewTime !== props.newTime ) ? parseTime( props.newTime ) : 0 );
    }, [ prevGame, props.game, props.newTime, prevNewTime ]);

    /**
     * @name parseTime
     * @function
     * @description Parses standard time format of `mm:ss` to `ssss`
     * @param {string} string Old string time
     */
    function parseTime( string ){
        let ary = string.split( ':' ).map( int => Number( int ) ),
        minutes = ary[ 0 ],
        seconds = ary[ 1 ];
        return ( minutes * SECOND ) + seconds;
    }

    /**
     * @name timerFormat
     * @method
     * @description Formats the time into minutes and seconds
     */
    function timerFormat(){

        let seconds = time, 
        minutes = Math.floor( seconds / SECOND );
        seconds = Math.round( ( seconds - ( minutes * SECOND ) ) % SECOND );
        
        if( minutes < 10 ) minutes = '0' + minutes.toString();
        if( seconds < 10 ) seconds = '0' + seconds.toString();

        return `${ minutes }:${ seconds }`;
    }

    return (
        <aside className="details">
            <span data-value={ props.mistakes }>Mistakes</span>
            <span data-value={ timerFormat() } id="time">Timer</span>
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
    newTime: state.app.newTime,
    timerOn: state.app.timerOn
});

export default connect( mapStateToProps )( Details );