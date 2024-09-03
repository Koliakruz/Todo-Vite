import { Todo } from './components/todo';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { CssBaseline, Typography } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme';
import { AppContainer } from './styledComponents/AppContainer.styled';

const queryClient = new QueryClient();

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