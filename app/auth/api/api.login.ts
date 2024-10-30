import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BASE_URL } from '@/constants/constants';

export const login = async (email: string, password: string) => {
  try {
    const response = await axios.post(`${BASE_URL}/auth/login`, {
      email,
      motdepasse: password,
    });

    const token = response.data.token;
    if (token) {
      await AsyncStorage.setItem('userToken', token); 
    }

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message || 'Une erreur est survenue lors de la connexion.');
    } else {
      throw new Error('Une erreur est survenue. Veuillez réessayer.');
    }
  }
};
