import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Drawer from '@mui/material/Drawer';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { useEffect, useState } from 'react';
import AddIcon from '@mui/icons-material/Add';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import SettingsIcon from '@mui/icons-material/Settings';
import DownloadIcon from '@mui/icons-material/Download';
import UploadIcon from '@mui/icons-material/Upload';
import BugReportIcon from '@mui/icons-material/BugReport';
import { useDispatch } from 'react-redux';
import { NEW_GAME, PAUSE } from '../../redux/actions/playArea';

const Masthead = () => {

    const dispatch = useDispatch(),
    [ open, setOpen ] = useState( false );

    /**
     * Starts a new game
     */
    const newGame = () => {
        dispatch({ type: NEW_GAME });
    }

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
            <Drawer
                anchor="left"
                open={ open }
                onClose={ toggleMenu( false ) }>
                <Box
                    role="presentation"
                    onClick={ toggleMenu( false ) }
                    onKeyDown={ toggleMenu( false ) }
                    sx={{ 
                        width:  250,
                    }}>
                    <List>
                        
                        <ListItem disablePadding>
                            <ListItemButton onClick={ newGame }>
                                <ListItemIcon>
                                    <AddIcon />
                                </ListItemIcon>
                                <ListItemText primary="New Game" />
                            </ListItemButton>
                        </ListItem>
                        <ListItem disablePadding>
                            <ListItemButton>
                                <ListItemIcon>
                                    <RestartAltIcon />
                                </ListItemIcon>
                                <ListItemText primary="Restart" />
                            </ListItemButton>
                        </ListItem>
                        <Divider />
                        <ListItem disablePadding>
                            <ListItemButton>
                                <ListItemIcon>
                                    <DownloadIcon />
                                </ListItemIcon>
                                <ListItemText primary="Save Game" />
                            </ListItemButton>
                        </ListItem>
                        <ListItem disablePadding>
                            <ListItemButton>
                                <ListItemIcon>
                                    <UploadIcon />
                                </ListItemIcon>
                                <ListItemText primary="Load Game" />
                            </ListItemButton>
                        </ListItem>
                        <Divider />
                        <ListItem disablePadding>
                            <ListItemButton>
                                <ListItemIcon>
                                    <BugReportIcon />
                                </ListItemIcon>
                                <ListItemText primary="Report a Bug" />
                            </ListItemButton>
                        </ListItem>
                    </List>
                </Box>
            </Drawer>
        </>
        
    )
}

export default Masthead;