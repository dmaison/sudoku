import PropTypes from 'prop-types';
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

    const { answer, column, index, input, row, section, visible } = props,
    activeCell = useSelector( state => state.playArea.activeCell ),
    dispatch = useDispatch(),
    theme = useTheme(),
    active = useMemo(() => ( activeCell?.index === index ), [ activeCell, index ]),
    backgroundColor = useMemo(() => {

        const oddSection = Boolean( section % 2 === 0 );

        // if its active, its always white
        if( active ){
            return null;

        } else {

            // if its a visible cell, higlight the other visible cells with the same value
            if( activeCell?.visible ){
                if( visible && activeCell.answer === answer ) return alpha( theme.palette.secondary.light, .4 );

            // highlight the siblings of the active cell
            } else if( activeCell?.column === column || activeCell?.row === row || activeCell.section === section ){
                return alpha( theme.palette.secondary.light, oddSection ? .25 : .15 )
            }
        }

        return oddSection ? alpha( grey[ 400 ], .1 ) : null;

    }, [ active, section, theme, activeCell, column, row, visible, answer ]);

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
                <Typography variant="h4" component="div" sx={{ color: !visible ? theme.palette.primary.light : null }}>
                    { 
                        visible ? 
                            answer :
                            input
                    }
                </Typography>
        </Button>
    )

}

Cell.propTypes = {
    answer: PropTypes.number.isRequired, 
    column: PropTypes.number.isRequired, 
    index: PropTypes.number.isRequired, 
    input: PropTypes.number, 
    row: PropTypes.number.isRequired, 
    section: PropTypes.number.isRequired, 
    visible: PropTypes.bool
}

export default Cell