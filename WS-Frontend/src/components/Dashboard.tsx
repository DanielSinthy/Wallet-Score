import React from 'react';
import { Grid, TextField, Typography } from '@mui/material';

const Dashboard: React.FC = () => {
  return (
    <Grid container spacing={3} justifyContent="center" alignItems="center" style={{ minHeight: '100vh' }}>
      <Grid item xs={12} sm={6} md={4}>
        <Typography variant="h4" gutterBottom>
          Dashboard
        </Typography>
        <TextField label="Enter the adress" fullWidth />
      </Grid>
    </Grid>
  );
};

export default Dashboard;
