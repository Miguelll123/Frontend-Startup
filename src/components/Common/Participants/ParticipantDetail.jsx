import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function ParticipantDetail() {
  const { id } = useParams();
  const [startup, setStartup] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`http://localhost:8080/startup/${id}`)
      .then((res) => {
        setStartup(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error al obtener la startup:", err);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p>Cargando detalles...</p>;
  if (!startup) return <p>Startup no encontrada.</p>;

  return (
    <div>
      <h2>{startup.company}</h2>
      {startup.logo && (
        <img
          src={startup.logo}
          alt={startup.company}
          style={{ width: "150px", height: "150px", objectFit: "contain" }}
        />
      )}
        <p><strong>Descripción:</strong> {startup.description || 'No disponible'}</p>
          <p><strong>Sector:</strong> {startup.sector}</p>
          <p><strong>Página web:</strong> {startup.website || 'Desconocido'}</p>
          <p><strong>Estado Startup:</strong> {startup.stage || 'Desconocido'}</p>
          <p><strong>Rondas Levantadas:</strong> {startup.roundsRaised || 'Desconocido'}</p>
          <p><strong>Premios:</strong> {startup.awards || 'Desconocido'}</p>
          <p><strong>Contacto:</strong> {startup.contact || 'No disponible'}</p>
          <p><strong>Puesto de trabajo:</strong> {startup.jobTitle || 'No disponible'}</p>
          <p><strong>Correo:</strong> {startup.email || 'Desconocido'}</p>
    </div>
  );
}

export default ParticipantDetail;