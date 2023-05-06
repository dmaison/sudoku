import Container from '@mui/material/Container'
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import EditIcon from '@mui/icons-material/Edit';
import ClearIcon from '@mui/icons-material/Clear';
import Avatar from '@mui/material/Avatar';
import { useTheme } from '@mui/material/styles';
import { useSelector } from 'react-redux';

const Controls = props => {

    const length = useSelector( state => state.playArea.limit ),
    theme = useTheme();

    return (
        <Container sx={{ mt: 3 }}>
            <BottomNavigation showLabels>
                {
                    Array.from({ length }).map(
                        ( _, index ) => (
                            <BottomNavigationAction 
                                icon={ 
                                    <Avatar sx={{ bgcolor: theme.palette.primary.main }}>
                                        { ( index + 1 ) }
                                    </Avatar> 
                                } 
                                key={ `input-${ index }` }
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