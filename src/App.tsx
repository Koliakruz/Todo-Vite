import React from 'react';
import ToDo from './components/Todo';

const App: React.FC = () => {
  return (
    <div className="app">
      <h1>My ToDo List</h1>
      <ToDo />
    </div>
  );
}

export default App;