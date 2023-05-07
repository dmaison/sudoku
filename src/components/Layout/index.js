import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from './theme';
import './style.css';
import PlayArea from '../PlayArea';
import Controls from '../Controls';
import GameData from '../GameData';

const Template = () => (
    <ThemeProvider theme={ theme }>
        <CssBaseline />
        <GameData />
        <PlayArea />
        <Controls />
    </ThemeProvider>
)

export default Template