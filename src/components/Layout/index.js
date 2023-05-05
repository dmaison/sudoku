import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from './theme';
import './style.css';
import PlayArea from '../PlayArea';

const Template = () => (
    <ThemeProvider theme={ theme }>
        <CssBaseline />
        <PlayArea />
    </ThemeProvider>
)

export default Template