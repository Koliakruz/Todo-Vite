import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        primary: {
            main: '#007bff',
        },
        secondary: {
            main: '#f50057',
        },
    },
    typography: {
        h1: {
            fontSize: '2rem',
            textAlign: 'center',
            marginBottom: '1.5rem',
            textTransform: 'uppercase'
        },
        h2: {
            color: '#808080',
            fontSize: '1rem'
        }
    },
});

export default theme;