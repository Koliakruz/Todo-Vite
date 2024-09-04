import { Todo } from './components/todo';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { CssBaseline, Typography } from '@mui/material';
import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';
import theme from './theme';
import { AppContainer } from './AppContainer.styled';

const queryClient = new QueryClient();

function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <StyledThemeProvider theme={theme}>
        <CssBaseline />
        <QueryClientProvider client={queryClient}>
          <AppContainer maxWidth="sm">
            <Typography variant="h1" component="h1">
              My ToDo List
            </Typography>
            <Todo />
          </AppContainer>
        </QueryClientProvider>
      </StyledThemeProvider>
    </MuiThemeProvider>
  );
}

export default App;