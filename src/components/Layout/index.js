import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from './theme';
import './style.css';
import PlayArea from '../PlayArea';
import Controls from '../Controls';

const Template = () => (
    <ThemeProvider theme={ theme }>
        <CssBaseline />
        <PlayArea />
        <Controls />
    </ThemeProvider>
)

export default Template