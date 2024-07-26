import React from 'react';
import { Grid, TextField } from '@mui/material';
import WalletDetails from '../components/WalletDetails';

const Dashboard: React.FC = () => {

  const mockData = {
    age: '2 years',
    transactions: 120,
    balance: 4.5,
    reputation: 'High',
  };

  return (
    <Grid container spacing={3} justifyContent="center" alignItems="center" style={{ minHeight: '100vh' }}>
      <Grid item xs={12} sm={6} md={4}>
        <TextField label="Enter the address" fullWidth margin="normal" />
        <WalletDetails {...mockData} />
      </Grid>
    </Grid>
  );
};

export default Dashboard;
