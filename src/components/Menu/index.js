import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Link from '@mui/material/Link';
import AddIcon from '@mui/icons-material/Add';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import DownloadIcon from '@mui/icons-material/Download';
import UploadIcon from '@mui/icons-material/Upload';
import BugReportIcon from '@mui/icons-material/BugReport';
import NewGame from '../NewGame';
import Restart from '../Restart';
import { useEffect, useState } from 'react';
import { REPORT_BUG_URL } from './config';
import { useDispatch } from 'react-redux';
import { TOAST_ADD } from '../../redux/actions/app';
import { LOAD, SAVE } from '../../redux/actions/playArea';

const Menu = ({ open, onClose }) => {

    const dispatch = useDispatch(),
    [ dialog, setDialog ] = useState( null ),
    [ date, setDate ] = useState( null ),
    idNewGame = 'new',
    idRestartGame = 'restart';

    /**
     * Opens a dialog
     */
    const openDialog = id => () => {
        setDialog( id );
    }

    /**
     * Saves the game
     */
    const saveGame = () => {
        dispatch({ type: SAVE, payload: date });
        dispatch({ 
            type: TOAST_ADD, 
            payload: {
                message: 'Game saved to local storage',
                severity: 'success'
            } 
        })
    }

    /**
     * Load the game
     */
    const loadGame = () => {
        dispatch({ type: LOAD });
        dispatch({ 
            type: TOAST_ADD, 
            payload: {
                message: 'Game loaded from local storage',
                severity: 'info'
            } 
        })
    }

    useEffect(() => {
        if( open ) setDate( new Date() );
    }, [ open, setDate ])

    return (
        <>
            <NewGame open={ ( dialog === idNewGame ) } onClose={ openDialog( null ) } />
            <Restart open={ ( dialog === idRestartGame ) } onClose={ openDialog( null ) } />
            <Drawer
                anchor="left"
                open={ open }
                onClose={ onClose }>
                <Box
                    role="presentation"
                    onClick={ onClose }
                    onKeyDown={ onClose }
                    sx={{ 
                        width:  250,
                    }}>
                    <List>
                        
                        <ListItem disablePadding>
                            <ListItemButton onClick={ openDialog( idNewGame ) }>
                                <ListItemIcon>
                                    <AddIcon />
                                </ListItemIcon>
                                <ListItemText primary="New Game" />
                            </ListItemButton>
                        </ListItem>
                        <ListItem disablePadding>
                            <ListItemButton onClick={ openDialog( idRestartGame ) }>
                                <ListItemIcon>
                                    <RestartAltIcon />
                                </ListItemIcon>
                                <ListItemText primary="Restart" />
                            </ListItemButton>
                        </ListItem>
                        <Divider />
                        <ListItem disablePadding>
                            <ListItemButton onClick={ saveGame }>
                                <ListItemIcon>
                                    <DownloadIcon />
                                </ListItemIcon>
                                <ListItemText primary="Save Game" />
                            </ListItemButton>
                        </ListItem>
                        <ListItem disablePadding>
                            <ListItemButton onClick={ loadGame }>
                                <ListItemIcon>
                                    <UploadIcon />
                                </ListItemIcon>
                                <ListItemText primary="Load Game" />
                            </ListItemButton>
                        </ListItem>
                        <Divider />
                        <ListItem disablePadding>
                            <ListItemButton component={ Link } href={ REPORT_BUG_URL } target="_blank">
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

export default Menu;