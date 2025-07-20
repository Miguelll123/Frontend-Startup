import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Modal } from "antd";
import { clearSelected } from "../../../features/trainers/trainerSlice";

const TrainerDetail = () => {
  const dispatch = useDispatch();
  const { selected, loading } = useSelector((state) => state.trainers);

  return (
    <Modal
      open={!!selected}
      onCancel={() => dispatch(clearSelected())}
      footer={null}
      centered
      bodyStyle={{
        background: "var(--main-gradient)",
        color: "#fff",
        borderRadius: 12,
        padding: 24,
        minWidth: 320,
      }}
      width={420}
    >
      {loading ? (
        <div>Cargando detalle...</div>
      ) : selected ? (
        <div style={{ textAlign: "center" }}>
          <img
            src={selected.photo || "https://via.placeholder.com/150"}
            alt={selected.name}
            style={{
              width: 120,
              height: 120,
              borderRadius: "50%",
              objectFit: "cover",
              marginBottom: 12,
              border: "3px solid #fff",
            }}
          />
          <h2 style={{ margin: "12px 0 8px 0" }}>
            {selected.name || selected.firstName + " " + selected.lastName}
          </h2>
          <p style={{ margin: 0 }}><b>Puesto:</b> {selected.position || selected.role}</p>
          <p style={{ margin: 0 }}><b>Empresa:</b> {selected.company}</p>
          <p style={{ margin: 0 }}><b>Email:</b> {selected.email}</p>
          <p style={{ margin: 0 }}><b>Bio:</b> {selected.bio || "Sin descripción"}</p>
        </div>
      ) : null}
    </Modal>
  );
};

export default TrainerDetail; 