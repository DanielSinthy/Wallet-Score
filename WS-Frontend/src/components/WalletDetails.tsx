import React, { useState } from 'react';
import { Grid, Typography, IconButton, Collapse } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import { WalletDetailsProps } from '../types/wallet';

const WalletDetails: React.FC<WalletDetailsProps> = ({ age, transactions, balance, policyIds, stakepool }) => {
  const [showDetails, setShowDetails] = useState(false);

  const handleToggleDetails = () => {
    setShowDetails(prev => !prev);
  };

  return (
    <Grid item container xs={12} gap={2} textAlign={'center'} justifyContent={'center'}>
      <Grid item xs={12} container justifyContent="center" alignItems="center" gap={1}>
        <Typography variant="body1" color="textPrimary">
          Wallet has {transactions} transactions with a balance of {balance} ETH.
        </Typography>
        <IconButton onClick={handleToggleDetails} aria-label="show details">
          <InfoIcon />
        </IconButton>
      </Grid>
      <Collapse in={showDetails} timeout="auto" unmountOnExit>
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
            <Typography variant="body1"><strong>Policy Id's:</strong></Typography>
            <Typography variant="body1">{policyIds}</Typography>
          </Grid>
          <Grid item xs={12} container justifyContent="space-between">
            <Typography variant="body1"><strong>Stakepool:</strong></Typography>
            <Typography variant="body1">{stakepool}</Typography>
          </Grid>
        </Grid>
      </Collapse>
    </Grid>
  );
};

export default WalletDetails;
