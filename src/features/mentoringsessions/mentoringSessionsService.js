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
const signAsMentor = async (sessionId, signatureDataUrl) => {
  console.log("Servicio signAsMentor: Enviando firma para sessionId:", sessionId);
  console.log(
    "Servicio signAsMentor: signatureDataUrl (parcial):",
    signatureDataUrl ? signatureDataUrl.substring(0, 50) + "..." : "N/A"
  );
  try {
    const res = await axios.patch(`${API_URL}/sign/mentor/${sessionId}`, {
      signature: signatureDataUrl,
    });
    console.log("Servicio signAsMentor: Respuesta de Axios:", res.data);
    return res.data.session;
  } catch (error) {
    console.error("Servicio signAsMentor: Error de Axios:", error.message);
    if (error.response) {
      console.error("Servicio signAsMentor: Datos de error de respuesta:", error.response.data);
      console.error("Servicio signAsMentor: Estado de error de respuesta:", error.response.status);
    }
    throw error;
  }
};

// Firmar como startup
const signAsStartup = async (sessionId, signatureDataUrl) => {
  // Acepta la firma dibujada
  console.log("Servicio signAsStartup: Enviando firma para sessionId:", sessionId);
  console.log(
    "Servicio signAsStartup: signatureDataUrl (parcial):",
    signatureDataUrl ? signatureDataUrl.substring(0, 50) + "..." : "N/A"
  );
  try {
    const res = await axios.patch(`${API_URL}/sign/startup/${sessionId}`, {
      signature: signatureDataUrl,
    });
    console.log("Servicio signAsStartup: Respuesta de Axios:", res.data);
    return res.data.session;
  } catch (error) {
    console.error("Servicio signAsStartup: Error de Axios:", error.message);
    if (error.response) {
      console.error("Servicio signAsStartup: Datos de error de respuesta:", error.response.data);
      console.error("Servicio signAsStartup: Estado de error de respuesta:", error.response.status);
    }
    throw error;
  }
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
