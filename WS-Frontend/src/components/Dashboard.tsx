import React, { useState } from 'react';
import { Grid, TextField } from '@mui/material';
import WalletDetails from '../components/WalletDetails';
import { fetchWalletDetails } from '../services/walletService';
import { WalletDetailsProps } from '../types/wallet';

const Dashboard: React.FC = () => {
  const [walletData, setWalletData] = useState<WalletDetailsProps | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFetchWalletDetails = async () => {
    try {
      const data = await fetchWalletDetails();
      setWalletData(data);
      setError(null);
    } catch (error) {
      setError('Failed to fetch wallet details. Please try again.');
    }
  };


  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleFetchWalletDetails();
    }
  };

  return (
    <Grid container spacing={3} justifyContent="center" alignItems="center" style={{ minHeight: '100vh' }}>
      <Grid item xs={12} sm={6} md={4}>
        <TextField
          label="Press Enter to fetch details"
          fullWidth
          margin="normal"
          onKeyDown={handleKeyDown}
          placeholder="Search"
        />
        {error && <div style={{ color: 'red', textAlign: 'center' }}>{error}</div>}
        {walletData && <WalletDetails {...walletData} />}
      </Grid>
    </Grid>
  );
};

export default Dashboard;
