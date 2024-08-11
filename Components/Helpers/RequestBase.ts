import { LoginBodyType, RegisterBodyType, NewMoodType, UpdateImageType, UpdateMoodEntryType, UserChangeType, DeleteMoodEntry } from './Interfaces/RequestTypes';
import axios from 'axios';

const baseURLString = process.env.EXPO_PUBLIC_REACT_NATIVE_SERVER_URL

const api = axios.create({
    baseURL: baseURLString,
    headers: {
        'x-access-token': `Bearer ${null}`
    }
});

export const updateToken = () => {
    api.defaults.headers['x-access-token'] = `Bearer ${global.token}`;
};

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

export const newMoodEntry = async (moodData: NewMoodType) => {
    try {
        const response = await api.post('/mood/new', moodData);
        return response.data;
    } catch (error) {
        console.error('Error in the user auth:', error);
        throw error;
    }
};

export const getPastWeekMoods = async () => {
    try {
        const response = await api.get('/mood/lastWeek');
        return response.data;
    } catch (error) {
        console.error('Error in the user auth:', error);
        throw error;
    }
};

export const getPastSixMonthsMoods = async () => {
    try {
        const response = await api.get('/mood/lastSemester');
        return response.data;
    } catch (error) {
        console.error('Error in the user auth:', error);
        throw error;
    }
};

export const getAllMoods = async () => {
    try {
        const response = await api.get('/mood/all');
        return response.data;
    } catch (error) {
        console.error('Error in the user auth:', error);
        throw error;
    }
};

export const updateProfileImage = async (imageData: UpdateImageType) => {
    try {
        const response = await api.post('/user/updateProfileImage', imageData);
        return response.data;
    } catch (error) {
        console.error('Error in the user auth:', error);
        throw error;
    }
};

export const getHomeData = async () => {
    try {
        const response = await api.get('/user/track');
        return response.data;
    } catch (error) {
        console.error('Error in the user auth:', error);
        throw error;
    }
};

export const updateMoodEntry = async (data: UpdateMoodEntryType) => {
    try {
        const response = await api.post('/mood/updateNote', data);
        return response.data;
    } catch (error) {
        console.error('Error in the user auth:', error);
        throw error;
    }
};

export const updateUserData = async (data: UserChangeType) => {
    try {
        const response = await api.post('/user/update', data);
        return response.data;
    } catch (error) {
        console.error('Error in the user auth:', error);
        throw error;
    }
};

export const deleteMoodEntry = async (data: DeleteMoodEntry) => {
    try {
        const response = await api.delete('/mood/delete', { data });
        return response.data;
    } catch (error) {
        console.error('Error in the user auth:', error);
        throw error;
    }
};