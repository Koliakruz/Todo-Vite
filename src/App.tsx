import { Todo } from './components/todo';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { CssBaseline, Container, Typography } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import styled from 'styled-components';

const queryClient = new QueryClient();

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
    },
  },
});

const AppContainer = styled(Container)`
  margin-top: 40px;
`;

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <QueryClientProvider client={queryClient}>
        <AppContainer maxWidth="sm">
          <Typography variant="h1" component="h1">
            My ToDo List
          </Typography>
          <Todo />
        </AppContainer>
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;