import { Todo } from '../entities/todo';
import { GlobalProviders } from './providers/globalProviders';
import { Typography } from '@mui/material';
import { AppContainer } from './AppContainer.styled';

function App() {
  return (
    <GlobalProviders>
      <AppContainer maxWidth="sm">
        <Typography variant="h1" component="h1">
          My ToDo List
        </Typography>
        <Todo />
      </AppContainer>
    </GlobalProviders>
  );
}

export default App;