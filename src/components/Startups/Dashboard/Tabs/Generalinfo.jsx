import React from "react";
import MyMap from "../Map/map";

const Generalinfo = () => {
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
    </>
  );
};

export default Generalinfo;
