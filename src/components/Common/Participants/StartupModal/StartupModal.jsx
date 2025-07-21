// components/Startups/Modal/StartupModal.jsx
import React from "react";
import { Modal } from "antd";

const StartupModal = ({ open, onClose, startup }) => {
  if (!startup) return null;

  const {
    company,
    description,
    sector,
    website,
    stage,
    roundsRaised,
    awards,
    contact,
    jobTitle,
    email,
    logo,
  } = startup;

  const fields = [
    { label: "Descripción", value: description },
    { label: "Sector", value: sector },
    {
      label: "Web",
      value: website ? (
        <a
          href={website.startsWith("http") ? website : `https://${website}`}
          target="_blank"
          rel="noreferrer"
        >
          {website}
        </a>
      ) : null,
    },
    { label: "Estado", value: stage },
    { label: "Rondas Levantadas", value: roundsRaised },
    { label: "Premios", value: awards },
    { label: "Contacto", value: contact },
    { label: "Puesto", value: jobTitle },
    { label: "Correo", value: email },
  ];

  return (
    <Modal
      title={company || "Detalles de la startup"}
      centered
      open={open}
      onOk={onClose}
      onCancel={onClose}
      footer={null}
      width="600px"
    >
      <div style={{ display: "flex", flexDirection: "column" }}>
        {logo && (
          <div style={{ textAlign: "center" }}>
            <img src={logo} alt={company} style={{ width: "120px", objectFit: "contain" }} />
          </div>
        )}
        {fields
          .filter((field) => field.value)
          .map((field, idx) => (
            <p key={idx} style={{ margin: "0.25rem 0", fontSize: "14px" }}>
              <strong>{field.label}:</strong> {field.value}
            </p>
          ))}
      </div>
    </Modal>
  );
};

export default StartupModal;
