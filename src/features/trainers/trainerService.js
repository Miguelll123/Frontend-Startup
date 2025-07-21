import axios from "axios";
const API_URL = "http://localhost:8080/trainers";

export const fetchTrainers = async () => {
  const res = await axios.get(API_URL);
  return res.data.trainer;
};

export const fetchTrainerById = async (id) => {
  const res = await axios.get(`${API_URL}/id/${id}`);
  return res.data;
}; 