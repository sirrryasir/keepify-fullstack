import env from '../env'
import axios from 'axios'


export const login = async (email, password) => {
    try {
        
        const res = await axios.post(`${env.API_BASE_URL}/auth/login`, {email, password})
        
        return res.data
    } catch (error) {
        console.error("Login error:", error)
        throw new Error(error.response?.data?.message || "Login failed", { cause: error })
    }

}

export const register = async (name, email, password) => {
    try {
        const res = await axios.post(`${env.API_BASE_URL}/auth/register`, {name, email, password})
        
        return res.data
        
    } catch (error) {
        console.error("Registration error:", error)
        throw new Error(error.response?.data?.message || "Registration failed", { cause: error })
    }
}