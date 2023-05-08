import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { PAUSE } from '../../redux/actions/playArea';
import Menu from '../Menu';

const Masthead = () => {

    const dispatch = useDispatch(),
    [ open, setOpen ] = useState( false );

    /**
     * Toggle the open/closed state of the menu drawer
     * @param {boolean} state determines the open state. `true` if open, `false` if closed
     * @returns {function}
     */
    const toggleMenu = state => () => {
        setOpen( state );
    }

    // pause the game when the menu is open
    useEffect(() => {
        dispatch({ type: PAUSE, payload: open });
    }, [ open ]);

    return (
        <>
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static">
                    <Toolbar>
                        <IconButton
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            sx={{ mr: 2 }} 
                            onClick={ toggleMenu( true ) }>
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                            Sudoku
                        </Typography>
                    </Toolbar>
                </AppBar>
            </Box>
            <Menu 
                open={ open } 
                onClose={ toggleMenu( false ) } />
        </>
        
    )
}

export default Masthead;