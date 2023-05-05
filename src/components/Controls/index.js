import Container from '@mui/material/Container'
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';

const Controls = props => {

    return (
        <Container>
            <BottomNavigation showLabels>
                <BottomNavigationAction label="1" />
            </BottomNavigation>
        </Container>
    )

}

export default Controls