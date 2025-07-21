import axios from 'axios';



const API_URL = 'http://localhost:8080/activity';

export const getActivities = async () => {
  const res = await axios.get(API_URL);
  return res.data;
}; 