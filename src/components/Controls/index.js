import Container from '@mui/material/Container'
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import EditIcon from '@mui/icons-material/Edit';
import ClearIcon from '@mui/icons-material/Clear';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';
import { useDispatch, useSelector } from 'react-redux';
import KeyboardEventHandler from 'react-keyboard-event-handler';
import { useMemo } from 'react';
import { CLEAR_CELL, FILL_CELL } from '../../redux/actions/playArea';

const CLEAR = 'clear';

const NOTES = 'notes';

const Controls = () => {

    const dispatch = useDispatch(),
    length = useSelector( state => state.playArea.limit ),
    theme = useTheme(),
    inputAry = useMemo(() => Array.from({ length }, ( _, i ) => ( i + 1 ).toString() ), [ length ]);

    const onKeyEvent = payload => {
        dispatch({ type: FILL_CELL, payload });
    }

    const onControlsClick = ( _, value )=> {
        switch( value ){
            case CLEAR:
                dispatch({ type: CLEAR_CELL, payload: value });
                break;
            case NOTES:
                break;
            default:
                dispatch({ type: FILL_CELL, payload: value });
                break;
        }
    }

    return (
        <Container sx={{ mt: 3 }}>
            <KeyboardEventHandler
                handleFocusableElements
                handleKeys={ [ ...inputAry ] } 
                onKeyEvent={ onKeyEvent } />
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
                <BottomNavigationAction value={ NOTES } label={ `Notes: Off` } icon={ <EditIcon sx={{ color: theme.palette.primary.main }} /> } />
                <BottomNavigationAction value={ CLEAR } label="Clear Cell" icon={ <ClearIcon sx={{ color: theme.palette.primary.main }} /> } />
            </BottomNavigation>
        </Container>
    )

}

export default Controls