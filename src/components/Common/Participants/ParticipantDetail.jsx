import React, { useEffect, useState } from "react";
import axios from "axios";
import Card from "../../../components/Elements/Card/Card";
import StartupModal from "./StartupModal/StartupModal";


const API_URL = "http://localhost:8080/api/startups"; 

function ParticipantDetail() {
  const [startups, setStartups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedStartup, setSelectedStartup] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    axios
      .get(API_URL)
      .then((res) => {
        setStartups(res.data || []); 
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


  if (loading) {
    return (
      <div style={containerStyle}>
        <p>Cargando startups...</p>
      </div>
    );
  }


  if (startups.length === 0) {
    return (
      <div style={containerStyle}>
        <p>No hay startups disponibles en este momento.</p>
      </div>
    );
  }

  return (
    <div style={containerStyle}>
      <h2 style={headingStyle}>Startups</h2>
      <div style={cardGridStyle}>
        {startups.map((s) => (
          <Card
            key={s._id}
            title={s.company} 
            hoverImage={s.logo || 'https://placehold.co/150x150/cccccc/333333?text=Logo'} 
            hoverText={s.sector || "Sin sector"}
            onClick={() => handleOpenModal(s)}
          />
        ))}
      </div>
      {isModalOpen && (
        <StartupModal open={isModalOpen} onClose={handleCloseModal} startup={selectedStartup} />
      )}
    </div>
  );
}


const containerStyle = {
  maxWidth: '1200px',
  margin: '2rem auto',
  padding: '1.5rem',
  backgroundColor: '#f9f9f9',
  borderRadius: '10px',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
};

const headingStyle = {
  textAlign: 'center',
  color: '#333',
  marginBottom: '2rem',
  fontSize: '2.5rem',
};

const cardGridStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
  gap: '1.5rem',
  justifyContent: 'center',
};

export default ParticipantDetail;
