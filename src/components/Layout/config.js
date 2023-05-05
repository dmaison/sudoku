import { createTheme, responsiveFontSizes } from "@mui/material";
import { lightBlue } from '@mui/material/colors';

const theme = createTheme({
    palette: {
        secondary: {
            main: lightBlue[ 50 ]
        }
    },
    components: {
       
    },
    typography: {
       
    }

});

export default responsiveFontSizes( theme );