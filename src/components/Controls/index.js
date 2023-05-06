import Container from '@mui/material/Container'
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import EditIcon from '@mui/icons-material/Edit';
import ClearIcon from '@mui/icons-material/Clear';
import Avatar from '@mui/material/Avatar';
import { useTheme } from '@mui/material/styles';
import { useDispatch, useSelector } from 'react-redux';
import KeyboardEventHandler from 'react-keyboard-event-handler';
import { useMemo } from 'react';
import { FILL_CELL } from '../../redux/actions/playArea';

const Controls = () => {

    const dispatch = useDispatch(),
    length = useSelector( state => state.playArea.limit ),
    theme = useTheme(),
    inputAry = useMemo(() => Array.from({ length }, ( _, i ) => ( i + 1 ).toString() ), [ length ]);

    const onKeyEvent = payload => {
        dispatch({ type: FILL_CELL, payload });
    }

    return (
        <Container sx={{ mt: 3 }}>
            <KeyboardEventHandler
                handleFocusableElements
                handleKeys={ [ ...inputAry ] } 
                onKeyEvent={ onKeyEvent } />
            <BottomNavigation showLabels>
                {
                    inputAry.map(
                        value => (
                            <BottomNavigationAction 
                                icon={ 
                                    <Avatar sx={{ bgcolor: theme.palette.primary.main }}>
                                        { value }
                                    </Avatar> 
                                } 
                                key={ `input-${ value }` }
                                />
                        )
                    )   
                }
                <BottomNavigationAction label={ `Notes: Off` } icon={ <EditIcon sx={{ color: theme.palette.primary.main }} /> } />
                <BottomNavigationAction label="Clear Cell" icon={ <ClearIcon sx={{ color: theme.palette.primary.main }} /> } />
            </BottomNavigation>
        </Container>
    )

}

export default Controls