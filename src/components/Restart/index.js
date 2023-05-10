import Button from '@mui/material/Button';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import { useDispatch } from 'react-redux';
import { RESTART } from '../../redux/actions/playArea';

const NewGame = ({ open, onClose }) => {

    const dispatch = useDispatch();

    /**
     * Restarts the current game
     */
    const restart = () => {
        dispatch({ type: RESTART });
        onClose();
    }

    return (
        
        <Dialog open={ open } onClose={ onClose }>
            <DialogTitle>Restart</DialogTitle>
            <DialogContent>
                <DialogContentText sx={{ mb: 2 }}>
                    This will restart the current sudoku game. All unsaved progress will be lost.
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={ onClose }>Cancel</Button>
                <Button onClick={ restart }>Restart</Button>
            </DialogActions>
        </Dialog>
        
    )
}

export default NewGame;