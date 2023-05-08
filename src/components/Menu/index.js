import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import AddIcon from '@mui/icons-material/Add';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import DownloadIcon from '@mui/icons-material/Download';
import UploadIcon from '@mui/icons-material/Upload';
import BugReportIcon from '@mui/icons-material/BugReport';
import NewGame from '../NewGame';
import { useState } from 'react';

const Menu = ({ open, onClose }) => {

    const [ dialog, setDialog ] = useState( null ),
    idNewGame = 'newGame';

    /**
     * Opens a dialog
     */
    const openDialog = id => () => {
        setDialog( id );
    }

    return (
        <>
            <NewGame open={ ( dialog === idNewGame ) } onClose={ openDialog( null ) } />
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

export default Menu;