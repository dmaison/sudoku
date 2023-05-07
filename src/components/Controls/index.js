import Container from '@mui/material/Container'
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import EditIcon from '@mui/icons-material/Edit';
import ClearIcon from '@mui/icons-material/Clear';
import HistoryIcon from '@mui/icons-material/History';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';
import { useDispatch, useSelector } from 'react-redux';
import KeyboardEventHandler from 'react-keyboard-event-handler';
import { useMemo } from 'react';
import { CLEAR_CELL, FILL_CELL, TOGGLE_NOTES, UNDO_MOVE } from '../../redux/actions/playArea';
import { CLEAR, NOTES, UNDO } from './config';

const Controls = () => {

    const dispatch = useDispatch(),
    { limit, takingNotes } = useSelector( state => state.playArea ),
    hasHistory = useSelector( state => ( state.playArea.gridHistory.length > 0 ) ),
    theme = useTheme(),
    inputAry = useMemo(() => Array.from({ length: limit }, ( _, i ) => ( i + 1 ).toString() ), [ limit ]);

    const fillCell = payload => {
        dispatch({ type: FILL_CELL, payload });
    }

    const onControlsClick = ( _, value )=> {
        switch( value ){
            case CLEAR:
                dispatch({ type: CLEAR_CELL, payload: value });
                break;
            case NOTES:
                dispatch({ type: TOGGLE_NOTES });
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
                handleKeys={ [ ...inputAry ] } 
                onKeyEvent={ fillCell } />
            <BottomNavigation showLabels onChange={ onControlsClick }>
                {
                    inputAry.map(
                        value => (
                            <BottomNavigationAction 
                                value={ value }
                                icon={ 
                                    <Typography variant="h3" component="span" sx={{ color: theme.palette.primary.main }}>
                                        { value }
                                    </Typography>
                                } 
                                key={ `input-${ value }` }
                                />
                        )
                    )   
                }
                <BottomNavigationAction value={ NOTES } label={ `Notes: ${ takingNotes ? 'On' : 'Off' }` } icon={ <EditIcon sx={{ color: theme.palette.primary.main }} /> } />
                <BottomNavigationAction value={ CLEAR } label="Clear Cell" icon={ <ClearIcon sx={{ color: theme.palette.primary.main }} /> } />
                <BottomNavigationAction disabled={ !hasHistory } value={ UNDO } label="Undo" icon={ <HistoryIcon sx={{ color: hasHistory ? theme.palette.primary.main : null }} /> } />
            </BottomNavigation>
        </Container>
    )

}

export default Controls