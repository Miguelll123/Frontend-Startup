import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Table, Space, Tag, Button } from "antd";
import {
  fetchSessionsByMentor,
  fetchSessionsByStartup,
  fetchAllSessions,
  signMentor,
  signStartup,
} from "../../../features/mentoringsessions/mentoringSessionsSlice.js";
import SignatureModal from "./SignatureModal/SignatureModal";

const MentoringSessionList = ({ userId, role, isAdminView = false }) => {
  const dispatch = useDispatch();
  const {
    sessions,
    isLoading,
    isError,
    message,
    isSuccess: sessionsActionSuccess,
  } = useSelector((state) => state.mentoringSessions);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentSessionToSign, setCurrentSessionToSign] = useState(null);

  useEffect(() => {
    // Lógica para cargar sesiones basada en el rol o si es vista de admin
    if (isAdminView) {
      dispatch(fetchAllSessions());
    } else if (userId && role) {
      if (role === "mentor") {
        dispatch(fetchSessionsByMentor(userId));
      } else if (role === "startup") {
        dispatch(fetchSessionsByStartup(userId));
      }
    }
  }, [dispatch, userId, role, isAdminView, sessionsActionSuccess]);

  const openSignModal = (session) => {
    setCurrentSessionToSign(session);
    setIsModalVisible(true);
  };

  const closeSignModal = () => {
    setIsModalVisible(false);
    setCurrentSessionToSign(null);
  };

  const handleConfirmSign = (sessionId, signatureDataUrl) => {
    if (role === "mentor") {
      dispatch(signMentor({ sessionId, signatureDataUrl }));
    } else if (role === "startup") {
      dispatch(signStartup({ sessionId, signatureDataUrl }));
    }
  };

  const handleViewPdf = (session) => {
    const API_BASE_URL = "http://localhost:8080";
    const pdfEndpoint = `${API_BASE_URL}/mentoringsessions/pdf/${session._id}`;
    window.open(pdfEndpoint, "_blank");
  };

  //ordenar sesiones por creación (más nuevas primero)
  const sortedSessions = useMemo(() => {
    return [...sessions].sort((a, b) => {
      const dateA = new Date(a.dateTime);
      const dateB = new Date(b.dateTime);
      return dateB.getTime() - dateA.getTime();
    });
  }, [sessions]);

  const columns = useMemo(() => {
    const baseColumns = [
      {
        title: "Fecha",
        dataIndex: "dateTime",
        key: "dateTime",
        render: (dateString) => (dateString ? new Date(dateString).toLocaleString() : "N/A"),
      },
      {
        title: "Duración (hrs)",
        dataIndex: "duration",
        key: "duration",
        render: (duration) => duration || "N/A",
      },
      {
        title: "Estado",
        dataIndex: "status",
        key: "status",
        render: (status) => {
          let color;
          let displayText;

          switch (status) {
            case "signed":
              color = "green";
              displayText = "FIRMADO";
              break;
            case "pending":
              color = "gold";
              displayText = "PENDIENTE";
              break;
            case "conflict":
              color = "volcano";
              displayText = "CONFLICTO";
              break;
            default:
              color = "default";
              displayText = status;
          }
          return <Tag color={color}>{displayText}</Tag>;
        },
      },
      {
        title: "Firma Mentor",
        dataIndex: ["mentorSigned", "signed"],
        key: "mentorSigned",
        render: (signed) => <Tag color={signed ? "green" : "red"}>{signed ? "Sí" : "No"}</Tag>,
      },
      {
        title: "Firma Startup",
        dataIndex: ["startupSigned", "signed"],
        key: "startupSigned",
        render: (signed) => <Tag color={signed ? "green" : "red"}>{signed ? "Sí" : "No"}</Tag>,
      },
      {
        title: "Acciones",
        key: "actions",
        render: (_, record) => {
          const allSigned = record.mentorSigned.signed && record.startupSigned.signed;

          // Lógica de visibilidad del botón "Firmar"
          let showSignButton = false;
          if (!isAdminView) {
            // Solo si no es admin
            if (role === "mentor" && !record.mentorSigned.signed) {
              showSignButton = true;
            } else if (role === "startup" && !record.startupSigned.signed) {
              showSignButton = true;
            }
          }

          return (
            <Space size="middle">
              {allSigned ? (
                <Button type="primary" onClick={() => handleViewPdf(record)}>
                  Ver PDF
                </Button>
              ) : showSignButton ? (
                <Button onClick={() => openSignModal(record)}>Firmar</Button>
              ) : (
                <Button disabled>PDF</Button>
              )}
            </Space>
          );
        },
      },
    ];

    const dynamicColumns = [];

    if (isAdminView) {
      dynamicColumns.push({
        title: "Mentor",
        dataIndex: ["mentor", "companyName"], // Asumiendo que el backend lo devuelve así
        key: "mentorCompanyName",
        render: (companyName) => companyName || "N/A",
      });
      dynamicColumns.push({
        title: "Startup",
        dataIndex: ["startup", "company"],
        key: "startupCompany",
        render: (company) => company || "N/A",
      });
    } else if (role === "mentor") {
      dynamicColumns.push({
        title: "Startup",
        dataIndex: ["startup", "company"],
        key: "startupCompany",
        render: (company) => company || "N/A",
      });
    } else if (role === "startup") {
      dynamicColumns.push({
        title: "Mentor",
        dataIndex: ["mentor", "companyName"],
        key: "mentorCompanyName",
        render: (companyName) => companyName || "N/A",
      });
    }

    return [...dynamicColumns, ...baseColumns];
  }, [role, openSignModal, handleViewPdf, isAdminView]);

  if (isLoading) return <p>Cargando sesiones...</p>;
  if (isError) return <p>Error: {message}</p>;
  if (sessions.length === 0)
    return (
      <>
        <h2>Mis sesiones de mentoría</h2>
        <p>No hay sesiones disponibles.</p>
      </>
    );

  return (
    <div style={{ padding: "0.2rem" }}>
      <Table
        dataSource={sessions.map((session) => ({ ...session, key: session._id }))}
        columns={columns}
        rowKey="_id"
        loading={isLoading}
        pagination={{ pageSize: 5 }}
        scroll={{ x: "max-content" }}
      />

      <SignatureModal
        visible={isModalVisible}
        session={currentSessionToSign}
        role={role} // Pasamos el rol para el texto del modal
        onSign={handleConfirmSign}
        onCancel={closeSignModal}
      />
    </div>
  );
};

export default MentoringSessionList;
