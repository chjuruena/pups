import axios from 'axios';

const API_BASE_URL = 'http://localhost:3001/puppies'; // Replace with your JSON-Server URL

const PuppyService = {
    createPuppy,
    fetchPuppies,
    updatePuppy,
    deletePuppy,
  };
  
  
async function createPuppy(puppyDetails) {
    try {
      const response = await axios.post(API_BASE_URL, puppyDetails);
      return response.data;
    } catch (error) {
      throw new Error('Failed to create a new puppy.');
    }
  }

  async function fetchPuppies() {
    try {
      const response = await axios.get(API_BASE_URL);
      return response.data;
    } catch (error) {
      throw new Error('Failed to fetch puppies.');
    }
  }

  async function updatePuppy(puppyId, updatedDetails) {
    try {
      const response = await axios.put(`${API_BASE_URL}/${puppyId}`, updatedDetails);
      return response.data;
    } catch (error) {
      throw new Error('Failed to update the puppy.');
    }
  }

  async function deletePuppy(puppyId) {
    try {
      await axios.delete(`${API_BASE_URL}/${puppyId}`);
    } catch (error) {
      throw new Error('Failed to delete the puppy.');
    }
  }

  


export default PuppyService;
