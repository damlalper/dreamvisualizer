import axios from 'axios';

const BASE_URL = 'https://your-backend-api.com';

export const fetchDreamVisualization = async (dreamText) => {
  try {
    const response = await axios.post(`${BASE_URL}/visualize`, { dream: dreamText });
    return response.data;
  } catch (error) {
    throw error;
  }
};