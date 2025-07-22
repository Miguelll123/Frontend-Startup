import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Table, Space, Tag, Button } from "antd";
import {
  fetchSessionsByMentor,
  fetchSessionsByStartup,
  signMentor,
  signStartup,
} from "../../../features/mentoringsessions/mentoringSessionsSlice.js";
import SignatureModal from "./SignatureModal/SignatureModal";

const MentoringSessionList = ({ userId, role }) => {
  const dispatch = useDispatch();
  const { sessions, isLoading, isError, message } = useSelector((state) => state.mentoringSessions);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentSessionToSign, setCurrentSessionToSign] = useState(null);

  useEffect(() => {
    if (userId && role) {
      if (role === "mentor") {
        dispatch(fetchSessionsByMentor(userId));
      } else if (role === "startup") {
        dispatch(fetchSessionsByStartup(userId));
      }
    }
  }, [dispatch, userId, role]);

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
      dispatch(signMentor(sessionId));
    } else if (role === "startup") {
      dispatch(signStartup(sessionId));
    }
  };

  const handleViewPdf = (session) => {
    const API_BASE_URL = "http://localhost:8080";
    const pdfEndpoint = `${API_BASE_URL}/mentoringsessions/pdf/${session._id}`;
    window.open(pdfEndpoint, "_blank");
  };

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
          switch (status) {
            case "signed":
              color = "green";
              break;
            case "pending":
              color = "gold";
              break;
            case "conflict":
              color = "volcano";
              break;
            default:
              color = "default";
          }
          return <Tag color={color}>{status.toUpperCase()}</Tag>;
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
          const showSignButton = role === "startup" && !record.startupSigned.signed;

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

    if (role === "mentor") {
      dynamicColumns.push({
        title: "Startup",
        dataIndex: ["startup", "company"],
        key: "startupCompany",
        render: (company) => company || "N/A",
      });
      dynamicColumns.push({
        title: "Mentor",
        dataIndex: ["mentor", "name"],
        key: "mentorName",
        render: (name) => name || "N/A",
      });
    } else if (role === "startup") {
      dynamicColumns.push({
        title: "Compañía de Mentoría",
        dataIndex: ["mentor", "companyName"],
        key: "mentorCompanyName",
        render: (companyName) => companyName || "N/A",
      });
      dynamicColumns.push({
        title: "Startup",
        dataIndex: ["startup", "company"],
        key: "startupCompany",
        render: (company) => company || "N/A",
      });
    }

    return [...dynamicColumns, ...baseColumns];
  }, [role, openSignModal, handleViewPdf]);

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
      <h2 style={{ fontSize: "1rem", fontWeight: "bold", marginBottom: "1rem" }}>
        Tus Sesiones de Mentoría
      </h2>
      <Table
        dataSource={sessions.map((session) => ({ ...session, key: session._id }))}
        columns={columns}
        rowKey="_id"
        loading={isLoading}
        pagination={{ pageSize: 10 }}
        scroll={{ x: "max-content" }}
      />

      <SignatureModal
        visible={isModalVisible}
        session={currentSessionToSign}
        role={role}
        onSign={handleConfirmSign}
        onCancel={closeSignModal}
      />
    </div>
  );
};

export default MentoringSessionList;
