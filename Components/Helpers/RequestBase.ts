import { LoginBodyType, RegisterBodyType, NewMoodType } from './Interfaces/RequestTypes';
import axios from 'axios';

const baseURLString = process.env.EXPO_PUBLIC_REACT_NATIVE_SERVER_URL
const token = null;

const api = axios.create({
    baseURL: baseURLString,
    headers: {
        'x-access-token': `Bearer ${token}`
    }
});

export const registerUser = async (userData: RegisterBodyType) => {
    try {
        const response = await api.post('/user/register', userData);
        return response.data;
    } catch (error) {
        console.error('Error registering user:', error);
        throw error;
    }
};

export const userLogin = async (userData: LoginBodyType) => {
    try {
        const response = await api.post('/auth/user', userData);
        return response.data;
    } catch (error) {
        console.error('Error in the user auth:', error);
        throw error;
    }
};
