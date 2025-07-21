import axios from 'axios';

const API_URL = 'https://api-dashboard-rta7.onrender.com';

// Obtener datos del dashboard
export const getDashboardData = async () => {
  try {
    const response = await axios.get(`${API_URL}/dashboard`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Error al obtener datos del dashboard');
  }
};

// Obtener listado de startups
export const getStartupsList = async () => {
  try {
    const response = await axios.get(`${API_URL}/startups`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Error al obtener listado de startups');
  }
};

const startupService = {
  getDashboardData,
  getStartupsList
};

export default startupService; 