import axios from 'axios';

const API_BASE_URL = 'http://localhost:3001'; // Replace with your JSON-Server URL

export const AdoptionService = {
  async submitAdoption(adoptionDetails) {
    try {
      const response = await axios.post(`${API_BASE_URL}/adopters`, adoptionDetails);
      return response.data;
    } catch (error) {
      throw new Error('Failed to submit adoption request.');
    }
  },
};

