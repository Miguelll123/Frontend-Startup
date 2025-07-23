import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, Modal, List } from "antd";
import { useNavigate } from "react-router-dom";

const API_URL = "http://localhost:8080/module";

const ModulesList = () => {
  const [modules, setModules] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedModule, setSelectedModule] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [hoveredCardId, setHoveredCardId] = useState(null); // Nuevo estado para la tarjeta en hover

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(API_URL)
      .then((res) => {
        setModules(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("❌ Error al traer módulos:", err);
        setLoading(false);
      });
  }, []);

  const showModal = (mod) => {
    setSelectedModule(mod);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedModule(null);
  };

  const goToSession = (sessionId) => {
    navigate(`/startup/programa/sesion/${sessionId}`);
  };

  if (loading) return <p>Cargando módulos...</p>;

  return (
    <div style={{ padding: "1rem" }}>
      <h2>Material de las sesiones</h2>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}>
        {modules.map((mod) => (
          <Card
            key={mod._id}
            title={mod.title}
            bordered
            style={{
              width: 300,
              cursor: "pointer",
              background: "linear-gradient(90deg, #1f0d1e, #070d34)",
              color: "#fff",
              boxShadow: hoveredCardId === mod._id ? "0 8px 16px rgba(0, 0, 0, 0.4)" : "0 4px 8px rgba(0, 0, 0, 0.2)", // Sombra dinámica
              borderRadius: "8px",
              transition: "all 0.3s ease-in-out", // Transición suave para los cambios de estilo
              transform: hoveredCardId === mod._id ? "scale(1.03)" : "scale(1)", // Efecto de escala
            }}
            headStyle={{
              color: "#fff",
              borderBottom: "1px solid rgba(255, 255, 255, 0.2)",
            }}
            bodyStyle={{
              color: "#e0e0e0",
            }}
            onClick={() => showModal(mod)}
            onMouseEnter={() => setHoveredCardId(mod._id)} // Establecer el ID de la tarjeta en hover
            onMouseLeave={() => setHoveredCardId(null)} // Limpiar el ID al salir del hover
          >
            <p>
              <strong>Sesiones:</strong> {mod.session?.length || 0}
            </p>
          </Card>
        ))}
      </div>

      {/* Modal del módulo con sesiones */}
      <Modal
        open={isModalOpen}
        title={selectedModule?.title}
        onCancel={closeModal}
        footer={null}
        bodyStyle={{ color: "var(--text-content)" }}
        headerStyle={{ color: "var(--title-content)" }}
      >
        <p>
          <strong>Descripción:</strong>
        </p>
        <p>{selectedModule?.description || "Sin descripción."}</p>

        <h4>Sesiones:</h4>
        <List
          dataSource={selectedModule?.session || []}
          renderItem={(s) => (
            <List.Item
              style={{ cursor: "pointer" }}
              onClick={() => {
                goToSession(s._id);
              }}
            >
              {s.name}
            </List.Item>
          )}
        />
      </Modal>
    </div>
  );
};

export default ModulesList;