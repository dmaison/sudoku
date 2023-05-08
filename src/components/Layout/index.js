import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import theme from './theme';
import './style.css';
import PlayArea from '../PlayArea';
import Controls from '../Controls';
import GameData from '../GameData';

const Template = () => (
    <ThemeProvider theme={ theme }>
        <CssBaseline />
        <GameData />
        <Divider sx={{ mt: 1, mb: 2 }} />
        <PlayArea />
        <Divider sx={{ mt: 2, mb: 1 }} />
        <Controls />
    </ThemeProvider>
)

export default Template