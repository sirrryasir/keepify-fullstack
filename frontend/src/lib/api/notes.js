import axios from 'axios';
import { API_URL } from '../env';

const getAuthHeader = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  return user?.token ? { Authorization: `Bearer ${user.token}` } : {};
};

export const getNotes = async () => {
  const response = await axios.get(`${API_URL}/notes`, {
    headers: getAuthHeader(),
  });
  return response.data;
};

export const createNote = async (note) => {
  const response = await axios.post(`${API_URL}/notes`, note, {
    headers: getAuthHeader(),
  });
  return response.data;
};

export const updateNote = async ({ id, ...note }) => {
  const response = await axios.put(`${API_URL}/notes/${id}`, note, {
    headers: getAuthHeader(),
  });
  return response.data;
};

export const deleteNote = async (id) => {
  const response = await axios.delete(`${API_URL}/notes/${id}`, {
    headers: getAuthHeader(),
  });
  return response.data;
};
