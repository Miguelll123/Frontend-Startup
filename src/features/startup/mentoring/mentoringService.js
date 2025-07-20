import axios from "axios";

const API_URL = "http://localhost:8080/mentors";

const getAllMentors = async () => {
  const res = await axios.get(API_URL);
  return res.data.mentoring;
};

const getMentorById = async (id) => {
  const res = await axios.get(`${API_URL}/id/${id}`);
  return res.data;
};

const getMentorsByCompany = async (company) => {
  const res = await axios.get(`${API_URL}/company/${company}`);
  return res.data;
};

const mentoringService = {
  getAllMentors,
  getMentorById,
  getMentorsByCompany,
};

export default mentoringService;
