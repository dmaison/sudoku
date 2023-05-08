import Button from '@mui/material/Button';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import { useDispatch, useSelector } from 'react-redux';
import { NEW_GAME } from '../../redux/actions/playArea';
import { DIFFICULTIES } from '../../utils/playArea'
import { useState } from 'react';

const NewGame = ({ open, onClose }) => {

    const dispatch = useDispatch(),
    currentDifficulty = useSelector( state => state.playArea.difficulty ),
    [ selectedDifficulty, setSelectedDifficulty ] = useState( currentDifficulty.label );

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
    const select = ( difficulty ) => {
        setSelectedDifficulty( difficulty )
    }

    return (
        
        <Dialog open={ open } onClose={ onClose }>
            <DialogTitle>New Game</DialogTitle>
            <DialogContent>
                <DialogContentText sx={{ mb: 2 }}>
                    This will start a new sudoku game. All unsaved progress will be lost.
                </DialogContentText>
                <TextField 
                    fullWidth
                    label="Select a Difficulty" 
                    onChange={ select }
                    defaultValue={ currentDifficulty.label }
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
                <Button onClick={ onClose }>Cancel</Button>
                <Button onClick={ newGame }>Start Game</Button>
            </DialogActions>
        </Dialog>
        
    )
}

export default NewGame;