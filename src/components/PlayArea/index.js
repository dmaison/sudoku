import { useSelector } from "react-redux";
import Grid from "@mui/material/Grid";
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { useTheme } from '@mui/material/styles';
import Cell from "../Cell";

const PlayArea = () => {
    
    const grid = useSelector( state => state.playArea.grid ),
    theme = useTheme();

    return (
        <Container>
            <Grid container columns={ 9 }>
                {
                    grid.map(
                        ( cell, index ) => (
                            <Grid item xs={ 1 } key={ `cell-${ index }` }>
                                <Box sx={{ 
                                    backgroundColor: ( cell.section % 2 === 0 ) ?
                                        theme.palette.secondary.light :
                                        'white'
                                }}>
                                    <Cell { ...cell } index={ index } />
                                </Box>
                            </Grid>
                        )
                    )
                }
            </Grid>
        </Container>
    )

}

export default PlayArea