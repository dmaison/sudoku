import { useDispatch, useSelector } from "react-redux";
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { TOAST_REMOVE } from "../../redux/actions/app";
import { useEffect, useState } from "react";
import useMediaQuery from '@mui/material/useMediaQuery';

const Notifications = () => {

    const dispatch = useDispatch(),
    isMobile = useMediaQuery( theme => theme.breakpoints.down('md') ),
    notification = useSelector( state => state.app.notifications[ 0 ] ),
    [ open, setOpen ] = useState( false );

    /**
     * Hides the toast
     */
    const onClose = ( e, reason ) => {
        if( reason !== 'clickaway' ){
            console.log( 'close' );
            setOpen( false );    
        }
    }

    /**
     * Removes the toast message from the stack
     */
    const removeNotification = () => {
        dispatch({ type: TOAST_REMOVE, payload: 0 });
    }
    
    useEffect(() => {
        if( notification ) setOpen( true );
    }, [ notification ]);

    return (
        <Snackbar 
            anchorOrigin={{ 
                vertical: 'bottom', 
                horizontal: isMobile ? 'center' : 'right'
            }}
            autoHideDuration={ 6000 }
            onClose={ onClose }
            open={ open } 
            TransitionProps={{ onExited: removeNotification, direction: 'up' }}>
            <Alert severity={ notification?.severity } onClose={ onClose }>
                { notification?.message }
            </Alert>
        </Snackbar>
    )
}

export default Notifications;