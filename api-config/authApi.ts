import { LoginModelProps } from '../models/login';
import { RegisterModelProps } from '../models/register';
import apiConfig from './axiosConfig';

export const authApi = {
    register(data:RegisterModelProps) {
        let dataSend = JSON.stringify({
            "name": data.name,
            "email": data.email,
            "phone": data.phone,
            "password": data.password,
            "confirmPassword": data.confirmPassword
        })

        return apiConfig.post('/auth/register', {
            data: dataSend
        })
    },
    login(data:LoginModelProps) {
        let dataSend = JSON.stringify({
            email:data.email,
            password:data.password
        })
        return apiConfig.post('/auth/login', dataSend)
    },
    logout() {
        return apiConfig.post('/auth/logout')
    }
}