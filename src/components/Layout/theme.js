import { createTheme, responsiveFontSizes } from "@mui/material";
import { lightBlue } from '@mui/material/colors';

const theme = createTheme({
    palette: {
        secondary: {
            main: lightBlue[ 100 ]
        }
    },
    components: {
        MuiBox: {
            props: { variant: 'cell' },
            style: {
                backgroundColor: 'transparent',
                color: 'var( --ma-color-lightBlue )',
                flexDirection: 'column',
                fontFamily: 'var( --adi-font-heading )',
                fontSize: '20px',
                fontWeight: 400,
                gap: 'var( --adi-space-2 )',
                height: '100%',
                justifyContent: 'center',
                lineHeight: '24px',
                textTransform: 'initial',
                width: '100%',
            },
        }
    },
    typography: {
       
    }

});

export default responsiveFontSizes( theme );