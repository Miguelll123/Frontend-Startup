import axios from "axios";

const API_URL = "http://localhost:8080/startup";

//  get all startups
const getAllStartups = async () => {
  try {
    const response = await axios.get(API_URL);

    return response.data.startup;
  } catch (error) {
    console.error("Error fetching all startups:", error.response?.data?.msg || error.message);
    throw error;
  }
};

const startupService = {
  getAllStartups,
};

export default startupService;
