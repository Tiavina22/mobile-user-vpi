import axios, { AxiosError } from 'axios';
import { BASE_URL } from '@/constants/constants';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_URL = `${BASE_URL}/manager`;

export const createUser = async (nom: any, email: any, motdepasse: any, confirmation: any) => {
    try {
        const token = await AsyncStorage.getItem('token');
        console.log(token)
        const response =await  await axios.post(`${API_URL}`, { nom,
            email,
            motdepasse,
            confirmation,}, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            
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
