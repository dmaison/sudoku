import PropTypes from 'prop-types';
import Paper from '@mui/material/Paper';
import ButtonBase from '@mui/material/ButtonBase';
import Typography from '@mui/material/Typography';
import { useTheme, styled } from '@mui/material/styles';
import { useEffect, useMemo, useState } from 'react';
import { grey } from '@mui/material/colors';
import { alpha } from "@mui/material";
import { withTheme  } from "@mui/styles";
import { useDispatch, useSelector } from 'react-redux';
import { ACTIVE_CELL } from '../../redux/actions/playArea';

const Button = styled( withTheme( ButtonBase ) )( ({ theme, err }) => ({
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'center',
    height: '100%',
    outlineOffset: -1,
    transition: 'linear .2s',
    width: '100%'
}));

const Cell = props => {

    const { answer, column, index, input, row, section, visible } = props,
    activeCell = useSelector( state => state.playArea.activeCell ),
    dispatch = useDispatch(),
    theme = useTheme(),
    active = useMemo(() => ( activeCell?.index === index ), [ activeCell, index ]),
    [ error, setError ] = useState( false ),
    color = useMemo(() => {
        if( !visible ){
            if( error ){
                return theme.palette.error.light;
            } else {
                return theme.palette.primary.light;
            }
        }
        return null;
    }, [ error, visible, theme ]),
    backgroundColor = useMemo(() => {

        const oddSection = Boolean( section % 2 === 0 );

        // if it has an error, its always red
        if( error ){
            return alpha( theme.palette.error.light, oddSection ? .25 : .15 );

        // if its active, its always white
        } else if( active ){
            return null;

        // if it shares an answer with the active cell and the answers of both are shown
        } else if( activeCell?.answer === answer && ( activeCell?.visible || ( activeCell?.input === activeCell?.answer ) ) ){
            if( visible || ( !!input && !error ) ) return alpha( theme.palette.secondary.light, .5 );

        // if its a sibling of the active cell
        } else if( activeCell?.column === column || activeCell?.row === row || activeCell?.section === section ){
            return alpha( theme.palette.secondary.light, oddSection ? .25 : .15 )
        }

        return oddSection ? alpha( grey[ 400 ], .1 ) : null;

    }, [ active, error, section, theme, activeCell, column, row, visible, answer, input ]);

    /**
     * sets the current cell to the active cell
     */
    const onClick = () => {
        dispatch({ type: ACTIVE_CELL, payload: props });
    }

    useEffect(() => {
        if( !visible ){
            const hasError = ( input && input !== answer );
            setError( hasError );
        }
    }, [ visible, input, answer, setError ]);

    return (
        <Button 
            component={ Paper }
            elevation={ active ? 7 : 0 }
            square
            onClick={ onClick }
            sx={{ 
                backgroundColor,
                borderBottom: `1px solid ${ theme.palette.secondary.light }`,
                borderRight: `1px solid ${ theme.palette.secondary.light }`,
                outline: error ? `${ theme.palette.error.light } solid 1px` : null,
                '&& .MuiTouchRipple-child': {
                    backgroundColor: theme.palette[ error ? 'error' : 'primary' ].light
                }
            }}>
                <Typography variant="h4" component="div" sx={{ color }}>
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