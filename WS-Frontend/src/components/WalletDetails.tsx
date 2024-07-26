import React from 'react';
import { Grid, Typography } from '@mui/material';
import { WalletDetailsProps } from '../types/wallet';

const WalletDetails: React.FC<WalletDetailsProps> = ({ age, transactions, balance, reputation }) => {
  return (
    <Grid container xs={12} gap={2} textAlign={'center'} justifyContent={'center'}>
      <Grid item xs={12}>
        <Typography variant="h6">Wallet Details</Typography>
      </Grid>
      <Grid item container xs={12} gap={2} justifyContent={'center'}>
        <Grid item xs={12} container justifyContent="space-between">
          <Typography variant="body1"><strong>Age:</strong></Typography>
          <Typography variant="body1">{age}</Typography>
        </Grid>
        <Grid item xs={12} container justifyContent="space-between">
          <Typography variant="body1"><strong>Transactions:</strong></Typography>
          <Typography variant="body1">{transactions}</Typography>
        </Grid>
        <Grid item xs={12} container justifyContent="space-between">
          <Typography variant="body1"><strong>Balance:</strong></Typography>
          <Typography variant="body1">{balance} ETH</Typography>
        </Grid>
        <Grid item xs={12} container justifyContent="space-between">
          <Typography variant="body1"><strong>Reputation:</strong></Typography>
          <Typography variant="body1">{reputation}</Typography>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default WalletDetails;
