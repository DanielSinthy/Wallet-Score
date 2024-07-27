import React, { useEffect, useState } from 'react';
import { Grid, TextField, Box } from '@mui/material';
import WalletDetails from '../components/WalletDetails';
import { fetchWalletDetails } from '../services/walletService';
import { WalletDetailsProps } from '../types/wallet';
import Label from '../components/Label'
import { Loading } from './Loading';
import { useLocation } from 'react-router-dom';
import logo from "../assets/logo.png"


const Dashboard: React.FC = () => {
  const [walletData, setWalletData] = useState<WalletDetailsProps | null>(null);
  const [addressInput, setAddressInput] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false)
  const [labels, setLabels] = useState<Object>({})
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const address = params.get('address');
    if (address) {
      setAddressInput(address);
      handleFetchWalletDetails(address);
    }
  }, [location.search]);

  function handleAddressInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    setAddressInput(e.target.value)
  }

  function calculateLabels(index: any) {

  }

  const handleFetchWalletDetails = async (addressInput: string) => {
    try {
      setLoading(true);
      const data = await fetchWalletDetails(addressInput);
      calculateLabels(data.index)
      setWalletData(data);
      console.log(data)
      setError(null);
    } catch (error) {
      console.log(error)
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError('An unknown error occurred');
      }
      setWalletData(null);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && addressInput != "") {
      handleFetchWalletDetails(addressInput);
    }
  };

  return (
    <Grid container spacing={3} justifyContent="center" display="flex" alignItems="center">
      <Grid item xs={12} justifyContent={"center"} display={"flex"}>
        <Box textAlign={"center"}>
          <img width={"50%"}
          src={logo} />
        </Box>
      </Grid>
      <Grid item xs={12} justifyContent={"center"} display={"flex"}>
        <Grid item xs={8}>
          <TextField
            value={addressInput}
            onChange={handleAddressInputChange}
            label="Address"
            fullWidth
            onKeyDown={handleKeyDown}
            margin="normal"
          />
        </Grid>
      </Grid>
      <Grid item xs={12} justifyContent={"center"} display={"flex"}>

        {!loading && walletData && !error && (
          <Grid item xs={8} display={"flex"}>
            <Grid item xs={10} gap={"5px"} display={"flex"}>
              {Object.entries(walletData.index).map(([key, value]) => {
                if (key === "walletAgeIndex" && value < 30) {
                  return (

                    <Label key={`${key}-${value}`} name={"New"} color="yellow" />

                  );
                }
                if (key === "totalTxIndex" && value >= 11) {
                  return (

                    <Label key={`${key}-${value}`} name={`Trader`} color="blue" />

                  );
                }
                if (key === "balanceIndex" && value == 0) {
                  return (

                    <Label key={`${key}-${value}`} name={`Small Holder`} color="blue" />

                  );
                }
                if (key === "policyCountIndex" && value >= 4) {
                  return (

                    <Label key={`${key}-${value}`} name={`Collector`} color="blue" />

                  );
                }
                if (key === "stakeDateIndex" && value > 0) {
                  return (

                    <Label key={`${key}-${value}`} name={`Staker`} color="blue" />

                  );
                }
                if (key === "reportedIndex" && value == 0) {
                  return (

                    <Label key={`${key}-${value}`} name={`Scammer`} color="red" />

                  );
                }
              })}
            </Grid>
            <Grid item xs={2} textAlign={"end"} fontWeight={700}>
              Score:
              {` ${(walletData.index.openWalletScore).toFixed(0)}`} / 100
            </Grid>
          </Grid>)}

      </Grid>

      <Grid item xs={12} textAlign={"center"}>
        {loading ? (<Loading />) :
          (<>
            {error && <div style={{ color: 'red', textAlign: 'center' }}>{error}</div>}
            {walletData && !error && <WalletDetails {...walletData} />}
          </>
          )}


      </Grid>
    </Grid>
  );
};

export default Dashboard;
