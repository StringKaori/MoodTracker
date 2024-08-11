// Configuração da API e funções de requisições para o servidor
import { LoginBodyType, RegisterBodyType, NewMoodType, UpdateImageType, UpdateMoodEntryType, UserChangeType, DeleteMoodEntry } from './Interfaces/RequestTypes';
import axios from 'axios';

// URL base da API obtida das variáveis de ambiente
const baseURLString = process.env.EXPO_PUBLIC_REACT_NATIVE_SERVER_URL;

// Instância do axios configurada com a URL base e um cabeçalho padrão para o token
const api = axios.create({
    baseURL: baseURLString,
    headers: {
        'x-access-token': `Bearer ${null}`
    }
});

// Atualiza o token de autenticação no cabeçalho das requisições
export const updateToken = () => {
    api.defaults.headers['x-access-token'] = `Bearer ${global.token}`;
};

// Registra um novo usuário
export const registerUser = async (userData: RegisterBodyType) => {
    try {
        const response = await api.post('/user/register', userData);
        return response.data;
    } catch (error) {
        console.error('Error registering user:', error);
        throw error;
    }
};

// Faz login do usuário
export const userLogin = async (userData: LoginBodyType) => {
    try {
        const response = await api.post('/auth/user', userData);
        return response.data;
    } catch (error) {
        console.error('Error in the user auth:', error);
        throw error;
    }
};

// Cria uma nova entrada de humor
export const newMoodEntry = async (moodData: NewMoodType) => {
    try {
        const response = await api.post('/mood/new', moodData);
        return response.data;
    } catch (error) {
        console.error('Error in the user auth:', error);
        throw error;
    }
};

// Obtém os humores da última semana
export const getPastWeekMoods = async () => {
    try {
        const response = await api.get('/mood/lastWeek');
        return response.data;
    } catch (error) {
        console.error('Error in the user auth:', error);
        throw error;
    }
};

// Obtém os humores dos últimos seis meses
export const getPastSixMonthsMoods = async () => {
    try {
        const response = await api.get('/mood/lastSemester');
        return response.data;
    } catch (error) {
        console.error('Error in the user auth:', error);
        throw error;
    }
};

// Obtém todos os humores registrados
export const getAllMoods = async () => {
    try {
        const response = await api.get('/mood/all');
        return response.data;
    } catch (error) {
        console.error('Error in the user auth:', error);
        throw error;
    }
};

// Atualiza a imagem de perfil do usuário
export const updateProfileImage = async (imageData: UpdateImageType) => {
    try {
        const response = await api.post('/user/updateProfileImage', imageData);
        return response.data;
    } catch (error) {
        console.error('Error in the user auth:', error);
        throw error;
    }
};

// Obtém dados da página inicial do usuário
export const getHomeData = async () => {
    try {
        const response = await api.get('/user/track');
        return response.data;
    } catch (error) {
        console.error('Error in the user auth:', error);
        throw error;
    }
};

// Atualiza uma entrada de humor existente
export const updateMoodEntry = async (data: UpdateMoodEntryType) => {
    try {
        const response = await api.post('/mood/updateNote', data);
        return response.data;
    } catch (error) {
        console.error('Error in the user auth:', error);
        throw error;
    }
};

// Atualiza os dados do usuário
export const updateUserData = async (data: UserChangeType) => {
    try {
        const response = await api.post('/user/update', data);
        return response.data;
    } catch (error) {
        console.error('Error in the user auth:', error);
        throw error;
    }
};

// Exclui uma entrada de humor
export const deleteMoodEntry = async (data: DeleteMoodEntry) => {
    try {
        const response = await api.delete('/mood/delete', { data });
        return response.data;
    } catch (error) {
        console.error('Error in the user auth:', error);
        throw error;
    }
};
