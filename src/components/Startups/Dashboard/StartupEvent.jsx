import React from "react";

const StartupEvent = () => {
  return (
    <div style={{ width: "100%", height: "80vh" }}>
      <iframe
        src="https://mapa-interactivo-fv3c.onrender.com/"
        title="Startup Snapshot Dashboard"
        style={{ width: "100%", height: "100%", border: "none" }}
        allowFullScreen
      />
    </div>
  );
};

export default StartupEvent; 