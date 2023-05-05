import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import ButtonBase from '@mui/material/ButtonBase';
import Typography from '@mui/material/Typography';
import { useTheme, styled } from '@mui/material/styles';
import { useMemo } from 'react';
import { grey } from '@mui/material/colors';
import { alpha } from "@mui/material";
import { withTheme  } from "@mui/styles";
import { useDispatch, useSelector } from 'react-redux';
import { ACTIVE_CELL } from '../../redux/actions/playArea';

const Button = styled( withTheme( ButtonBase ) )( ({ theme }) => ({
    alignItems: 'center',
    borderBottom: `1px solid ${ theme.palette.secondary.light }`,
    borderRight: `1px solid ${ theme.palette.secondary.light }`,
    display: 'flex',
    justifyContent: 'center',
    height: '100%',
    width: '100%',
    '&& .MuiTouchRipple-child': {
        backgroundColor: theme.palette.primary.light
    }
}));

const Cell = props => {

    const { answer, column, index, row, section } = props,
    activeCell = useSelector( state => state.playArea.activeCell ),
    dispatch = useDispatch(),
    theme = useTheme(),
    oddSection = Boolean( section % 2 === 0 ),
    active = useMemo(() => ( activeCell?.index === index ), [ activeCell, index ]),
    backgroundColor = useMemo(() => {

        if( active ){
            return null;
        } else {
            if( activeCell?.column === column || activeCell?.row === row ){
                return alpha( theme.palette.secondary.light, oddSection ? .25 : .1 )
            }
        }

        return oddSection ? alpha( grey[ 400 ], .1 ) : null;

    }, [ active, oddSection, theme, activeCell, column, row ]);

    /**
     * sets the current cell to the active cell
     */
    const onClick = () => {
        dispatch({ type: ACTIVE_CELL, payload: props });
    }

    return (
        <Button 
            component={ Paper }
            elevation={ active ? 7 : 0 }
            square
            onClick={ onClick }
            sx={{ backgroundColor }}>
            <Box>
                <Typography variant="h5" component="div">{ answer }</Typography>
            </Box>
        </Button>
    )

}

export default Cell