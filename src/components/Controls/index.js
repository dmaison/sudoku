import Container from '@mui/material/Container'
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { styled } from "@mui/material/styles";
import EditIcon from '@mui/icons-material/Edit';
import ClearIcon from '@mui/icons-material/Clear';
import HistoryIcon from '@mui/icons-material/History';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';
import { useDispatch, useSelector } from 'react-redux';
import KeyboardEventHandler from 'react-keyboard-event-handler';
import { useMemo } from 'react';
import { CLEAR_CELL, FILL_CELL, MOVE_ACTIVE_CELL, TOGGLE_NOTES, UNDO_MOVE } from '../../redux/actions/playArea';
import { CLEAR, NOTES, UNDO } from './config';
import { grey } from "@mui/material/colors";

const IconButton = styled( Button )`
    flex-direction: column;
    min-width: initial;
    && .MuiButton-startIcon {
        margin-right: 0
    }
`;

const Controls = () => {

    const dispatch = useDispatch(),
    { limit, takingNotes, paused } = useSelector( state => state.playArea ),
    hasHistory = useSelector( state => ( state.playArea.gridHistory.length > 0 ) ),
    theme = useTheme(),
    inputAry = useMemo(() => Array.from({ length: limit }, ( _, i ) => ( i + 1 ).toString() ), [ limit ]);

    /**
     * Clears the current active cell
     */
    const clearCell = () => {
        if( !paused ) dispatch({ type: CLEAR_CELL });
    }

    /**
     * Sets the input value of the active cell to the value of the payload parameter
     * @param {number|string} payload
     */
    const fillCell = payload => {
        if( !isNaN( payload ) && !paused ){
            dispatch({ type: FILL_CELL, payload });
        }
    }

    /**
     * Allows for keyboard to control movement of the active cell instead of having to use the mouse
     * @param {string} key the key that was pressed to trigger this event
     */
    const moveCell = key => {
        let column = 0,
        row = 0;
        switch( key ){
            case 'w':
            case 'up':
                row -= 1;
                break;
            case 's':
            case 'down':
                row += 1;
                break;
            case 'a':
            case 'left':
                column -= 1;
                break;
            case 'd':
            case 'right':
                column += 1;
                break;
        }

        if( !paused ) dispatch({ type: MOVE_ACTIVE_CELL, payload: { column, row }});
    }

    /**
     * Toggles the note state on and off
     */
    const toggleNotes = () => {
        if( !paused ) dispatch({ type: TOGGLE_NOTES });
    }

    /**
     * Allows for mobile input and control of the game
     * @param {*} _ 
     * @param {string} value Which button was pressed
     */
    const onControlsClick = value => ()=> {
        switch( value ){
            case CLEAR:
                clearCell();
                break;
            case NOTES:
                toggleNotes();
                break;
            case UNDO:
                dispatch({ type: UNDO_MOVE });
                break;
            default:
                fillCell( value );
                break;
        }
    }

    return (
        <Container sx={{ mt: 3 }}>
            <KeyboardEventHandler
                handleFocusableElements
                handleKeys={ [ 'left', 'up', 'right', 'down', 'w', 'a', 's', 'd' ] } 
                onKeyEvent={ moveCell } />
            <KeyboardEventHandler
                handleFocusableElements
                handleKeys={ [ 'backspace', 'delete' ] } 
                onKeyEvent={ clearCell } />
            <KeyboardEventHandler
                handleFocusableElements
                handleKeys={ [ 'n' ] } 
                onKeyEvent={ toggleNotes } />
            <KeyboardEventHandler
                handleFocusableElements
                handleKeys={ [ ...inputAry ] } 
                onKeyEvent={ fillCell } />
            <Stack direction="row" justifyContent="space-between" sx={{ mb: 2 }}>
                {
                    inputAry.map(
                        value => (
                            <Button key={ `input-${ value }` } onClick={ onControlsClick( value ) } sx={{  minWidth: 'initial' }}>
                                <Typography variant="h3" component="span" sx={{ color: theme.palette.primary.main }}>
                                    { value }
                                </Typography>
                            </Button>
                        )
                    )   
                }
            </Stack>
            <Stack direction="row" justifyContent="space-evenly">
                <IconButton  onClick={ onControlsClick( NOTES ) } startIcon={ <EditIcon /> } sx={{ color: !takingNotes ? grey[ 400 ] : null, minWidth: '100px' }}>
                    { `Notes ${ takingNotes ? 'On' : 'Off' } ` }
                </IconButton>
                <IconButton onClick={ onControlsClick( CLEAR ) } startIcon={ <ClearIcon /> }>
                    Clear Cell
                </IconButton>
                <IconButton onClick={ onControlsClick( UNDO ) } disabled={ !hasHistory } startIcon={ <HistoryIcon /> }>
                    Undo
                </IconButton>
            </Stack>
        </Container>
    )

}

export default Controls