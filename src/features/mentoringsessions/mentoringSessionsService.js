import axios from "axios";

const API_URL = "http://localhost:8080/mentoringsessions";

// Obtener todas las sesiones (para admin)
const getAllSessions = async () => {
  const res = await axios.get(API_URL);
  return res.data.sessions;
};

// Obtener sesiones por mentor
const getSessionsByMentor = async (mentorId) => {
  const res = await axios.get(`${API_URL}/mentor/${mentorId}`);
  return res.data.sessions;
};

// Obtener sesiones por startup
const getSessionsByStartup = async (startupId) => {
  try {
    const url = `${API_URL}/startup/${startupId}`;
    const res = await axios.get(url);
    return res.data.sessions;
  } catch (error) {
    if (error.response) {
    }
    throw error;
  }
};

// Crear nueva sesión
const createSession = async (sessionData) => {
  const res = await axios.post(API_URL, sessionData);
  return res.data.session;
};

// Firmar como mentor
const signAsMentor = async (sessionId) => {
  const res = await axios.put(`${API_URL}/sign/mentor/${sessionId}`);
  return res.data.session;
};

// Firmar como startup
const signAsStartup = async (sessionId) => {
  const res = await axios.put(`${API_URL}/sign/startup/${sessionId}`);
  return res.data.session;
};

const mentoringSessionService = {
  getAllSessions,
  getSessionsByMentor,
  getSessionsByStartup,
  createSession,
  signAsMentor,
  signAsStartup,
};

export default mentoringSessionService;
