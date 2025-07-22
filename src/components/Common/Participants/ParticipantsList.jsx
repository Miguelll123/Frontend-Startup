import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import ParticipantDetail from "./ParticipantDetail";

const API_URL = "http://localhost:8080/startup/";

function ParticipantsList() {
  const [startups, setStartups] = useState([]);
  const [loading, setLoading] = useState(true);

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
            }}
          >
            {s.logo && (
              <img
                src={s.logo}
                alt={s.company}
                style={{ width: "100px", height: "100px", objectFit: "contain" }}
              />
            )}
            <h3>
              <Link to={`./${s._id}`} style={{ textDecoration: "none" }}>
                {s.company}
              </Link>
            </h3>
          </div>
        ))}
      </div>
      <ParticipantDetail />
    </div>
  );
}

export default ParticipantsList;
