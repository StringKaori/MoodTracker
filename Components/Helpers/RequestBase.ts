import RegisterType from './Interfaces/RegisterType';
import axios from 'axios';

const baseURLString = process.env.EXPO_PUBLIC_REACT_NATIVE_SERVER_URL
// const token = '<hash_do_token>';

const api = axios.create({
    baseURL: baseURLString,
    headers: {
        'x-access-token': `${null}`
    }
});

// const tokenAPI = axios.create({
//   baseURL: baseURLString,
//   headers: {
//     'x-access-token': `${token}`
//   }
// });

export const registerUser = async (userData: RegisterType) => {
    console.log('====================================');
    console.log('Base URL:', process.env.EXPO_PUBLIC_REACT_NATIVE_SERVER_URL);

console.log(baseURLString);
console.log('====================================');
    try {
        const response = await api.post('/user/register', userData);
        return response.data;
    } catch (error) {
        console.error('Error registering user:', error);
        throw error;
    }
};


// export default function RequestBase() {

// }
