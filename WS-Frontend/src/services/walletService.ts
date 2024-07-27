import axios from 'axios';
import { WalletDetailsProps } from '../types/wallet';

class ApiError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "ApiError";
    }
}

const API_URL = 'http://localhost:4444/score?address=';

export const fetchWalletDetails = async (addressInput: string): Promise<WalletDetailsProps> => {
    try {
        const response = await axios.get(`${API_URL}${addressInput}`);
        if (response.data.status === "error" || response.data.status.success === false) {
            throw new ApiError(response.data.status.message || 'Unknown error occurred');
        }
        return response.data;
    } catch (error) {
        if (!(error instanceof Error)) {
            throw new ApiError('An unknown error occurred');
        }

        throw new ApiError(error.message);
    }
};
