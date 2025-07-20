import React, { useEffect, useState } from "react";
import axios from "axios";
import { Modal } from "antd";

const API_URL = "http://localhost:8080/startup";

function ParticipantDetail() {
  const [startups, setStartups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedStartup, setSelectedStartup] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    axios
      .get(API_URL)
      .then((res) => {
        setStartups(res.data.startup);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error al obtener las startups:", err);
        setLoading(false);
      });
  }, []);

  const showModal = (startup) => {
    setSelectedStartup(startup);
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
    setSelectedStartup(null);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setSelectedStartup(null);
  };

  if (loading) return <p>Cargando startups...</p>;
  if (startups.length === 0) return <p>No hay startups disponibles.</p>;

  return (
    <div>
      <h2>Startups</h2>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}>
        {startups.map((s) => (
          <div
            key={s._id}
            style={{
              border: "1px solid #ddd",
              borderRadius: "8px",
              padding: "1rem",
              width: "200px",
              textAlign: "center",
              cursor: "pointer",
            }}
            onClick={() => showModal(s)}
          >
            {s.logo && (
              <img
                src={s.logo}
                alt={s.company}
                style={{ width: "100px", height: "100px", objectFit: "contain" }}
              />
            )}
            <h3 style={{ color: "#1890ff" }}>{s.company}</h3>
          </div>
        ))}
      </div>

      {/* 🔽 Modal con información de la startup seleccionada */}
      <Modal
        title={selectedStartup?.company}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
      >
        {selectedStartup && (
          <>
            {selectedStartup.logo && (
              <img
                src={selectedStartup.logo}
                alt="logo"
                style={{ width: "120px", marginBottom: "1rem" }}
              />
            )}
            <p><strong>Descripción:</strong> {selectedStartup.description || 'No disponible'}</p>
            <p><strong>Sector:</strong> {selectedStartup.sector}</p>
            <p><strong>Página web:</strong> {selectedStartup.website || 'Desconocido'}</p>
            <p><strong>Estado Startup:</strong> {selectedStartup.stage || 'Desconocido'}</p>
            <p><strong>Rondas Levantadas:</strong> {selectedStartup.roundsRaised || 'Desconocido'}</p>
            <p><strong>Premios:</strong> {selectedStartup.awards || 'Desconocido'}</p>
            <p><strong>Contacto:</strong> {selectedStartup.contact || 'No disponible'}</p>
            <p><strong>Puesto de trabajo:</strong> {selectedStartup.jobTitle || 'No disponible'}</p>
            <p><strong>Correo:</strong> {selectedStartup.email || 'Desconocido'}</p>
          </>
        )}
      </Modal>
    </div>
  );
}

export default ParticipantDetail;