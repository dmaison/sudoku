import Container from '@mui/material/Container'
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import EditIcon from '@mui/icons-material/Edit';
import Avatar from '@mui/material/Avatar';
import { useSelector } from 'react-redux';

const Controls = props => {

    const length = useSelector( state => state.playArea.limit );

    return (
        <Container sx={{ mt: 3 }}>
            <BottomNavigation>
                {
                    Array.from({ length }).map(
                        ( _, index ) => (
                            <BottomNavigationAction 
                                icon={ <Avatar>{ ( index + 1 ) }</Avatar> } 
                                key={ `input-${ index }` } />
                        )
                    )   
                }
                <BottomNavigationAction label="Note Mode" icon={ <EditIcon /> } />
            </BottomNavigation>
        </Container>
    )

}

export default Controls