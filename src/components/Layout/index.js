import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import theme from './theme';
import './style.css';
import PlayArea from '../PlayArea';
import Controls from '../Controls';
import GameData from '../GameData';
import Masthead from '../Masthead';
import YouWin from '../YouWin';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

const Template = () => {

    const endGame = useSelector( state => state.playArea.endGame ),
    [ open, setOpen ] = useState( false );

    useEffect(() => {
        if( endGame ) setOpen( true );
    }, [ endGame, setOpen ]);

    console.log( open )

    return (
        <ThemeProvider theme={ theme }>
            <CssBaseline />
            <YouWin open={ open } onClose={ () => setOpen( false ) } />
            <Masthead />
            <GameData />
            <Divider sx={{ mt: 1, mb: 2 }} />
            <PlayArea />
            <Divider sx={{ mt: 2, mb: 1 }} />
            <Controls />
        </ThemeProvider>
    )
}

export default Template