import PropTypes from 'prop-types';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import ButtonBase from '@mui/material/ButtonBase';
import Typography from '@mui/material/Typography';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme, styled } from '@mui/material/styles';
import { useEffect, useMemo, useState } from 'react';
import { grey } from '@mui/material/colors';
import { alpha } from "@mui/material";
import { withTheme  } from "@mui/styles";
import { useDispatch, useSelector } from 'react-redux';
import { ACTIVE_CELL, LOG_ERROR } from '../../redux/actions/playArea';

const Button = styled( ButtonBase )(() => ({
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'center',
    height: '100%',
    outlineOffset: -1,
    position: 'relative',
    transition: 'linear .2s',
    width: '100%'
}));

const Notes = styled( withTheme( Box ) )( ({ theme }) => ({
    alignItems: 'center',
    color: theme.palette.secondary.dark,
    display: 'grid',
    gridTemplateColumns: 'repeat( 3, 1fr )',
    height: '100%',
    position: 'absolute',
    textAlign: 'center',
    width: '100%'
}));

const Cell = props => {

    const { answer, column, index, input, notes, row, section, visible } = props,
    { activeCell, limit } = useSelector( state => state.playArea ),
    dispatch = useDispatch(),
    noteMap = useMemo( () => Array.from({ length: limit }, (_, index ) => ( index + 1 ) ), [ limit ]),
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

    }, [ active, error, section, theme, activeCell, column, row, visible, answer, input ]),
    isMobile = useMediaQuery( theme.breakpoints.down('md') ),
    normalBorder = `1px solid ${ theme.palette.secondary.light }`,
    altBorder = `1px solid ${ alpha( theme.palette.primary.light, .6 ) }`,
    hasAltBorderBottom = ( row === 3 || row === 6 ),
    hasAltBorderRight = ( column === 3 || column === 6 );

    /**
     * sets the current cell to the active cell
     */
    const onClick = () => {
        dispatch({ type: ACTIVE_CELL, payload: props });
    }

    // track the error state
    useEffect(() => {
        if( !visible ){
            const hasError = ( input && input !== answer );
            if( hasError ) dispatch({ type: LOG_ERROR });
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
                borderBottom: row < 9 ?
                    hasAltBorderBottom ? altBorder : normalBorder :
                    null,
                borderRight: column < 9 ? 
                    hasAltBorderRight ? altBorder : normalBorder :
                    null,
                outline: error ? `${ theme.palette.error.light } solid 1px` : null,
                '&& .MuiTouchRipple-child': {
                    backgroundColor: theme.palette[ error ? 'error' : 'primary' ].light
                }
            }}>
                <Notes>
                    { 
                        noteMap.map(
                            note => (
                                <Typography 
                                    key={ note } 
                                    variant="caption" 
                                    dangerouslySetInnerHTML={{ __html: notes.includes( note ) ? note : '&nbsp;' }} 
                                    sx={{
                                        fontSize: isMobile ? '8px' : null,
                                        lineHeight: !isMobile ? '0.75rem' : null
                                    }} />
                            )
                        )
                    }
                </Notes>
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