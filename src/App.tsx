import React from 'react';
import ToDo from './components/Todo';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="app">
        <h1>My ToDo List</h1>
        <ToDo />
      </div>
    </QueryClientProvider>
  )
}

export default App;