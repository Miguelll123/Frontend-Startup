import React from "react";
import MyMap from "../Map/map";
import AuthLogout from "../../../Auth/AuthLogout";

const Generalinfo = ({ data, loading, error }) => {
  return (
    <>
      <div>
        <MyMap />
      </div>

      <div>
        <p>
          🗓️ <strong>Fecha de inicio:</strong> 02/2025
        </p>
        <p>
          🔚 <strong>Fecha fin:</strong> 12/2025
        </p>
        <p>
          📍 <strong>Localización:</strong> Sala de Formación, Piso 2, La Harinera (C/ de Joan
          Verdeguer, 116, Poblats Marítims, 46024 Valencia)
        </p>
        <p>
          🚀 <strong>Enablers:</strong> Ajuntament de València | Valencia Innovation Capital |
          Startup Valencia
        </p>
      </div>

      {/* Sección para probar si se pintan datos de la API */}
      <div style={{ marginTop: "2rem" }}>
        <h3>📊 Startups cargadas desde la API:</h3>
        {error && <p style={{ color: "red" }}>❌ Error: {error}</p>}
        {loading && <p>⌛ Cargando startups...</p>}
        {!loading && data && data.length > 0 ? (
          <ul>
            {data.map((startup) => (
              <li key={startup.id}>
                <strong>{startup.name}</strong> — {startup.description}
              </li>
            ))}
          </ul>
        ) : (
          !loading && <p>⚠️ No hay datos disponibles.</p>
        )}
      </div>

      <AuthLogout />
    </>
  );
};

export default Generalinfo;