import Button from '@mui/material/Button';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import { useDispatch, useSelector } from 'react-redux';
import { NEW_GAME } from '../../redux/actions/playArea';
import { DIFFICULTIES } from '../../utils/playArea'
import { useMemo, useState } from 'react';
import Confetti from "react-confetti";
import SettingsIcon from '@mui/icons-material/Settings';
import ErrorIcon from '@mui/icons-material/Error';
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';

const YouWin = ({ open, onClose }) => {

    const dispatch = useDispatch(),
    { difficulty, errors, game, endGame } = useSelector( state => state.playArea ),
    [ selectedDifficulty, setSelectedDifficulty ] = useState( difficulty.label ),
    time = useMemo(() => {
        const totalSeconds = ( ( endGame - game ) / 1000 ),
        minutes = Math.floor( totalSeconds / 60 ),
        seconds = Math.floor( totalSeconds % 60 ).toLocaleString( 'en-US', {
            minimumIntegerDigits: 2,
            useGrouping: false
        });

        return `${ minutes }:${ seconds }`;
    }, [ endGame, game ]);

    /**
     * Starts a new game
     */
    const newGame = () => {
        dispatch({ type: NEW_GAME, payload: selectedDifficulty });
        onClose();
    }

    /**
     * Overrides the current difficulty value
     * @param {string} difficulty 
     */
    const select = ({ target }) => {
        setSelectedDifficulty( target.value );
    }

    return (
        <>
            {
                open ? 
                    <Confetti /> : 
                    null
            }
            <Dialog open={ open }>
                <DialogTitle>You Won!</DialogTitle>
                <DialogContent>
                    <List sx={{ mb: 3 }}>
                        <ListItem disablePadding>
                            <ListItemIcon>
                                <SettingsIcon />
                            </ListItemIcon>
                            <ListItemText primary="Difficulty" secondary={ difficulty.label } />
                        </ListItem>
                        <ListItem disablePadding>
                            <ListItemIcon>
                                <AccessTimeFilledIcon />
                            </ListItemIcon>
                            <ListItemText primary="Time" secondary={ time } />
                        </ListItem>
                        <ListItem disablePadding>
                            <ListItemIcon>
                                <ErrorIcon color="error" />
                            </ListItemIcon>
                            <ListItemText primary="Mistakes" secondary={ errors } />
                        </ListItem>
                    </List>
                    <TextField 
                        fullWidth
                        label="Start a New Game" 
                        onChange={ select }
                        value={ selectedDifficulty }
                        select>
                        {
                            DIFFICULTIES.map(
                                ({ label }) => (
                                    <MenuItem key={ label } value={ label }>
                                        { label }
                                    </MenuItem>
                                )
                            )
                        }
                    </TextField>
                </DialogContent>
                <DialogActions>
                    <Button onClick={ onClose }>Close</Button>
                    <Button onClick={ newGame }>Start a New Game</Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default YouWin;