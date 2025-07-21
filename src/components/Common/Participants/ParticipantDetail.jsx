import React, { useEffect, useState } from "react";
import axios from "axios";
import Card from "../../../components/Elements/Card/Card";
import StartupModal from "./StartupModal/StartupModal";

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

  const handleOpenModal = (startup) => {
    setSelectedStartup(startup);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
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
          <Card
            key={s._id}
            title={s.company}
            hoverImage={s.logo}
            hoverText={s.sector || "Sin sector"}
            onClick={() => handleOpenModal(s)}
          />
        ))}
      </div>

      <StartupModal open={isModalOpen} onClose={handleCloseModal} startup={selectedStartup} />
    </div>
  );
}

export default ParticipantDetail;
