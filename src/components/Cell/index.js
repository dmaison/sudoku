import Box from '@mui/material/Box';
import ButtonBase from '@mui/material/ButtonBase';
import Typography from '@mui/material/Typography';
import { useTheme, styled } from '@mui/material/styles';
import { useMemo } from 'react';
import { alpha } from "@mui/material";
import { withTheme  } from "@mui/styles";
import { useDispatch, useSelector } from 'react-redux';
import { ACTIVE_CELL } from '../../redux/actions/playArea';

const Button = styled( withTheme( ButtonBase ) )( ({ theme }) => ({

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
    borderColorBottom = useMemo( () => theme.palette[ ( oddSection || ( row % 3 === 0 ) ) ? 'primary' : 'secondary' ].light, [ theme, oddSection, row ]),
    borderColorRight = useMemo( () => theme.palette[ ( oddSection || ( column % 3 === 0 ) ) ? 'primary' : 'secondary' ].light, [ theme, oddSection, column ]);

    /**
     * sets the current cell to be the active cell
     */
    const onClick = () => {
        dispatch({ type: ACTIVE_CELL, payload: props });
    }

    return (
        <Button>
            <Box
                aria-label="cell"
                onClick={ onClick }
                role="button"
                sx={{
                    alignItems: 'center',
                    backgroundColor: oddSection ? alpha( theme.palette.secondary.light, .2 ) : null,
                    borderBottom: row < 9 ? `1px solid ${ borderColorBottom }` : null,
                    borderRight: column % 9 > 0 ? `1px solid ${ borderColorRight }` : null,
                    display: 'flex',
                    height: '100%',
                    justifyContent: 'center',
                    width: '100%'
                }}>
                <Typography variant="h5" component="div">{ answer }</Typography>
            </Box>
        </Button>
    )

}

export default Cell