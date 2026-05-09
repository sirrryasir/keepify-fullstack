import { API_URL } from '../env'
import axios from 'axios'

export const login = async (email, password) => {
    try {
        const res = await axios.post(`${API_URL}/auth/login`, {email, password})
        return res.data
    } catch (error) {
        console.error("Login error:", error)
        throw new Error(error.response?.data?.message || "Login failed")
    }
}

export const register = async (name, email, password) => {
    try {
        const res = await axios.post(`${API_URL}/auth/register`, {name, email, password})
        return res.data
    } catch (error) {
        console.error("Registration error:", error)
        throw new Error(error.response?.data?.message || "Registration failed")
    }
}