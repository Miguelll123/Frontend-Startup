import React from "react";
import { Modal } from "antd";

const MentorModal = ({ open, onClose, mentorship }) => {
  if (!mentorship) return null;

  const { mentor = {}, company, category, website, mentoringAreas } = mentorship;

  const fields = [
    { label: "Empresa", value: company },
    { label: "Categoría", value: category },
    {
      label: "Web",
      value: website ? (
        <a href={`https://${website}`} target="_blank" rel="noreferrer">
          {website}
        </a>
      ) : null,
    },
    { label: "Cargo", value: mentor.jobTitle },
    { label: "Email", value: mentor.email },
    { label: "Teléfono", value: mentor.telephoneNumber },
    {
      label: "Agendar mentoría",
      value: mentor.arrangeMentory ? (
        mentor.arrangeMentory.startsWith("http") ? (
          <a href={mentor.arrangeMentory} target="_blank" rel="noreferrer">
            Clic aquí
          </a>
        ) : (
          <span>{mentor.arrangeMentory}</span>
        )
      ) : null,
    },
  ];

  return (
    <Modal
      title={mentor.mentorName || "Detalles del mentor"}
      centered
      open={open}
      onOk={onClose}
      onCancel={onClose}
      width={{
        xs: "90%",
        sm: "80%",
        md: "70%",
        lg: "60%",
        xl: "50%",
        xxl: "40%",
      }}
    >
      <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
        {fields
          .filter((field) => field.value)
          .map((field, index) => (
            <p key={index}>
              <strong>{field.label}:</strong> {field.value}
            </p>
          ))}

        {Array.isArray(mentoringAreas) && mentoringAreas.length > 0 && (
          <>
            <p>
              <strong>Áreas de mentoría:</strong>
            </p>
            <ul style={{ paddingLeft: "1.2rem" }}>
              {mentoringAreas.map((area, index) => (
                <li key={index}>{area}</li>
              ))}
            </ul>
          </>
        )}
      </div>
    </Modal>
  );
};

export default MentorModal;
