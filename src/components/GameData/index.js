import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useTheme, styled } from '@mui/material/styles';
import { withTheme  } from "@mui/styles";
import { useEffect, useState, useCallback } from "react";
import { useSelector } from "react-redux";
import { useInterval } from "../../utils/hooks";

const Data = styled( withTheme( Typography ) )( ({ theme }) => ({
    color: theme.palette.primary.main,
}));

const GameData = () => {

    const { errors, game, paused } = useSelector( state => state.playArea ),
    theme = useTheme(),
    [ time, setTime ] = useState( 0 );

    /**
     * Formats the time into minutes and seconds
     */
    const formatTime = () => {

        const oneSecond = 60;

        let minutes = Math.floor( time / oneSecond ),
        seconds = Math.round( ( time - ( minutes * oneSecond ) ) % oneSecond );
        
        if( minutes < 10 ) minutes = '0' + minutes.toString();
        if( seconds < 10 ) seconds = '0' + seconds.toString();

        return `${ minutes }:${ seconds }`;
    }

    /**
     * updates the current game time
     */
    const updateTime = useCallback( () => {
        if( !paused ) setTime( time + 1 );
    }, [ setTime, time, paused ]);

    useInterval( updateTime, 1000 );

    // restart the timer every time a new game starts
    useEffect(() => {
        setTime( 0 );
    }, [ game, setTime ] )

    return (
        <Container>
            <Stack direction="row" justifyContent="space-between" sx={{ mt: 1 }}>
                <div>
                    <Typography variant="overline">
                        <strong>Mistakes</strong>
                    </Typography>
                    <Typography sx={{ color: errors > 0 ? theme.palette.error.main : null }}>
                        { errors }
                    </Typography>
                </div>
                <div>
                    <Typography variant="overline">
                        <strong>Time</strong>
                    </Typography>
                    <Data>
                        { formatTime() }
                    </Data>
                </div>
                <div>
                    <Typography variant="overline">
                        <strong>Difficulty</strong>
                    </Typography>
                    <Data>
                        { errors }
                    </Data>
                </div>
            </Stack>
        </Container>
    )

}

export default GameData