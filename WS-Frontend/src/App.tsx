import React from 'react';
import Dashboard from './components/Dashboard';
import { CssBaseline, Container } from '@mui/material';

function App() {
  return (
    <div className="App">
      <CssBaseline />
      <Container 
        sx={{
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        <Dashboard />
      </Container>
    </div>
  );
}

export default App;
