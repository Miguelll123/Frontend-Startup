import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchSessionsByMentor,
  fetchSessionsByStartup,
  signMentor,
  signStartup,
} from "../../../features/mentoringsessions/mentoringSessionsSlice.js";

const MentoringSessionList = ({ userId, role }) => {
  const dispatch = useDispatch();
  const { sessions, isLoading, isError, message } = useSelector((state) => state.mentoringSessions);

  useEffect(() => {
    if (role === "mentor") {
      dispatch(fetchSessionsByMentor(userId));
    } else if (role === "startup") {
      dispatch(fetchSessionsByStartup(userId));
    }
  }, [dispatch, userId, role]);

  const handleSign = (sessionId) => {
    if (role === "mentor") {
      dispatch(signMentor(sessionId));
    } else if (role === "startup") {
      dispatch(signStartup(sessionId));
    }
  };

  if (isLoading) return <p>Cargando sesiones...</p>;
  if (isError) return <p>Error: {message}</p>;
  if (sessions.length === 0)
    return (
      <>
        <h2>Mis sesiones de mentoría</h2>
        <p>No hay sesiones disponibles.</p>
      </>
    );

  return (
    <div className="p-4 space-y-4">
      <h2 className="text-2xl font-bold">Tus Sesiones de Mentoría</h2>
      {sessions.map((session) => (
        <div key={session._id} className="border p-4 rounded shadow-sm">
          <p>
            <strong>Mentor:</strong> {session.mentor?.name}
          </p>
          <p>
            <strong>Startup:</strong> {session.startup?.company}
          </p>
          <p>
            <strong>Fecha:</strong> {new Date(session.dateTime).toLocaleString()}
          </p>
          <p>
            <strong>Tema:</strong> {session.topic}
          </p>
          <p>
            <strong>Resumen:</strong> {session.summary || "No disponible"}
          </p>
          <p>
            <strong>Estado:</strong> {session.status}
          </p>

          <div className="mt-2 flex gap-4">
            <p
              className={`text-sm ${
                session.mentorSigned.signed ? "text-green-600" : "text-red-600"
              }`}
            >
              Firma Mentor: {session.mentorSigned.signed ? "Sí" : "Pendiente"}
            </p>
            <p
              className={`text-sm ${
                session.startupSigned.signed ? "text-green-600" : "text-red-600"
              }`}
            >
              Firma Startup: {session.startupSigned.signed ? "Sí" : "Pendiente"}
            </p>
          </div>

          {/* Botón para firmar si le corresponde */}
          {(role === "mentor" && !session.mentorSigned.signed) ||
          (role === "startup" && !session.startupSigned.signed) ? (
            <button
              className="mt-3 px-4 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
              onClick={() => handleSign(session._id)}
            >
              Firmar sesión
            </button>
          ) : null}
        </div>
      ))}
    </div>
  );
};

export default MentoringSessionList;
