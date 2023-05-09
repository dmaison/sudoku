import { useSelector } from "react-redux";
import Grid from "@mui/material/Grid";
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Cell from "../Cell";
import { useTheme } from '@mui/material/styles';

const PlayArea = () => {
    
    const { grid, paused } = useSelector( state => state.playArea ),
    theme = useTheme(),
    md = '60vh',
    xs = '100vw';

    return (
        <Container sx={{
            width: { md, xs }
        }}>
            <Box
                sx={{
                    border: `1px solid ${ theme.palette.primary.light }`,
                    filter: paused ? 'blur(7px)' : null,
                    transition: '.25s linear'
                }}>
                <Grid 
                    container 
                    columns={ 9 } 
                    sx={{ 
                        height: { md, xs }
                    }}>
                    {
                        grid.map(
                            ( cell, index ) => (
                                <Grid item xs={ 1 } key={ `cell-${ index }` } sx={{ minHeight: '11.11111%' }}>
                                    <Cell { ...cell } />
                                </Grid>
                            )
                        )
                    }
                </Grid>
            </Box>
        </Container>
    )

}

export default PlayArea