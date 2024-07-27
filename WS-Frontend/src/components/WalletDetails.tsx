import React, { useState } from 'react';
import { Grid, Typography, IconButton, Collapse } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import { WalletDetailsProps } from '../types/wallet';

const WalletDetails: React.FC<WalletDetailsProps> = ({ balance,
    balanceAda,
    delegationAge,
    index,
    policyCount,
    stakepool,
    transactionCount,
    walletAge,
    walletAgeString }) => {
    const [showDetails, setShowDetails] = useState(false);

    const handleToggleDetails = () => {
        setShowDetails(prev => !prev);
    };

    return (
        <Grid item container xs={12} gap={2} textAlign={'center'} justifyContent={'center'}>
            <Grid item xs={12} container justifyContent="center" alignItems="center" gap={1}>
                <Typography variant="body1" color="textPrimary">
                    Wallet has {transactionCount} transactions with a balance of {balanceAda.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} ADA.
                </Typography>
                <IconButton onClick={handleToggleDetails} aria-label="show details">
                    <InfoIcon />
                </IconButton>
            </Grid>
            <Collapse in={showDetails} timeout="auto" unmountOnExit>
                <Grid item container xs={12} gap={2} justifyContent={'center'}>
                    <Grid item xs={12} container justifyContent="space-between">
                        <Typography variant="body1"><strong>Age:</strong></Typography>
                        <Typography variant="body1">{walletAgeString}</Typography>
                    </Grid>
                    <Grid item xs={12} container justifyContent="space-between">
                        <Typography variant="body1"><strong>Transactions:</strong></Typography>
                        <Typography variant="body1">{transactionCount}</Typography>
                    </Grid>
                    <Grid item xs={12} container justifyContent="space-between">
                        <Typography variant="body1"><strong>Balance:</strong></Typography>
                        <Typography variant="body1">{balanceAda.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} ADA</Typography>
                    </Grid>
                    <Grid item xs={12} container justifyContent="space-between">
                        <Typography variant="body1"><strong>Policy Id's:</strong></Typography>
                        <Typography variant="body1">{policyCount}</Typography>
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
