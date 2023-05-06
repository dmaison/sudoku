import { useSelector } from "react-redux";
import Grid from "@mui/material/Grid";
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Cell from "../Cell";
import { useTheme } from '@mui/material/styles';

const PlayArea = () => {
    
    const grid = useSelector( state => state.playArea.grid ),
    theme = useTheme(),
    md = '60vh',
    xs = '100vw';

    return (
        <Container sx={{
            width: { md, xs }
        }}>
            hello
            <Box
                sx={{
                    border: `1px solid ${ theme.palette.primary.light }`
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
                                <Grid item xs={ 1 } key={ `cell-${ index }` }>
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