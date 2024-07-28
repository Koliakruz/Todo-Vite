import React from 'react';
import './App.css';

import ToDo from './components/Todo';

function App() {
  return (
    <div className="app">
      <h1>My ToDo List</h1>
      <ToDo />
    </div>
  );
}

export default App;