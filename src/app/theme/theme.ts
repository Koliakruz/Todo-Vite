import { createTheme } from '@mui/material/styles';

declare module '@mui/material/styles' {
    interface Palette {
        border: {
            default: string;
            primary: string;
            secondary: string;
        };
        background: TypeBackground;
    }
    interface PaletteOptions {
        border?: {
            default?: string;
            primary?: string;
            secondary?: string;
        };
    }
    interface TypeBackground {
        item?: string;
    }
}

const theme = createTheme({
    palette: {
        primary: {
            main: '#007bff',
        },
        secondary: {
            main: '#f50057',
        },
        background: {
            default: '#f9f9f9',
            item: '#ffffff'
        },
        border: {
            default: '#dddddd',
            primary: '#808080',
            secondary: '#007bff',
        }
    },
    typography: {
        fontFamily: 'Arial, Helvetica, sans-serif',
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