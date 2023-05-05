import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import config from './config';
import './style.css';
import PlayArea from '../PlayArea';

const Template = ({ children }) => (
    <ThemeProvider theme={ config }>
        <CssBaseline />
        <PlayArea />
    </ThemeProvider>
)

export default Template