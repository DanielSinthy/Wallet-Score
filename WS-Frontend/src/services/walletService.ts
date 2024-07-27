import axios from 'axios';
import { WalletDetailsProps } from '../types/wallet';

const API_URL = 'http://localhost:4444/score?address=addr1q965hhtm37m0836c4va2wpaysal370v37lthxt9ylsm4ndx4p8zlw304qch8g95kdrtyfqeachje7rcxt4zsd3g8hless3jl40';

export const fetchWalletDetails = async (): Promise<WalletDetailsProps> => {
  try {
    const response = await axios.get(API_URL);
    console.log(response)
    return response.data;
  } catch (error) {
    console.error('Error fetching wallet details:', error);
    throw error;
  }
};
