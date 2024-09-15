import { ReactNode } from 'react';
import { QueryProvider } from './queryClientProvider';
import { ThemeProvider } from './themeProvider';
import { CssBaseline } from '@mui/material';

export const GlobalProviders = ({ children }: { children: ReactNode }) => (
    <ThemeProvider>
        <CssBaseline />
        <QueryProvider>{children}</QueryProvider>
    </ThemeProvider>
);