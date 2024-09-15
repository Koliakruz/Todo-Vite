import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';
import theme from '../theme/theme';
import { ReactNode } from 'react';

export const ThemeProvider = ({ children }: { children: ReactNode }) => (
    <MuiThemeProvider theme={theme}>
        <StyledThemeProvider theme={theme}>
            {children}
        </StyledThemeProvider>
    </MuiThemeProvider>
);