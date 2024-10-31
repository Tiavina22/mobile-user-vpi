import axios, { AxiosError } from 'axios';
import { BASE_URL } from '@/constants/constants';

const API_URL = `${BASE_URL}/auth/register`;

export const registerUser = async (nom: any, email: any, motdepasse: any, confirmation: any) => {
    try {
        const response = await axios.post(`${API_URL}`, { 
            nom,
            email,
            motdepasse,
            confirmation,
        });
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            throw error.response?.data.message || 'Une erreur est survenue lors de l\'inscription.';
        } else {
            throw 'Une erreur inconnue est survenue.';
        }
    }
};
