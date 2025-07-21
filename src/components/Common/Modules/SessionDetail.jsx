import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const SessionDetail = () => {
  const { id } = useParams();
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`http://localhost:8080/session/${id}`)
      .then((res) => {
        setSession(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error al traer sesión:", err);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p>Cargando sesión...</p>;
  if (!session) return <p>Sesión no encontrada.</p>;

  // 👉 Función para extraer el ID de la carpeta de Google Drive
  const getDriveFolderId = (url) => {
    const match = url?.match(/\/folders\/([a-zA-Z0-9_-]+)/);
    return match ? match[1] : null;
  };

  const driveFolderId = getDriveFolderId(session.material);

  return (
    <div style={{ padding: "1rem" }}>
      <h2>{session.name}</h2>
      <p><strong>Fecha:</strong> {new Date(session.date).toLocaleDateString()}</p>
      <p><strong>Formador:</strong> {session.trainer?.name || "No especificado"}</p>
      <p><strong>Descripción:</strong> {session.description || "No especificado"}</p>

      {session.material && (
        <div>
          <p>
            <strong>Material:</strong>{" "}
            <a href={session.material} target="_blank" rel="noopener noreferrer">
              Ver material
            </a>
          </p>

          {driveFolderId && (
            <iframe
              src={`https://drive.google.com/embeddedfolderview?id=${driveFolderId}#grid`}
              style={{ width: "100%", height: "500px", border: "none", marginTop: "1rem" }}
              title="Carpeta de Google Drive"
            />
          )}
        </div>
      )}

      {session.survey && (
        <p>
          <strong>Encuesta:</strong>{" "}
          <a href={session.survey} target="_blank" rel="noopener noreferrer">
            Ir a encuesta
          </a>
        </p>
      )}
    </div>
  );
};

export default SessionDetail;
