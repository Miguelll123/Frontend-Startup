import React, { useState, useRef, useEffect } from "react";
import { Modal, Button, Input, Space, Typography, Alert } from "antd";
import SignatureCanvas from "react-signature-canvas"; // Importar la librería

const { Text } = Typography;

const SignatureModal = ({ visible, session, role, onSign, onCancel }) => {
  const sigCanvas = useRef(null); // Referencia al canvas de firma
  const [signatureData, setSignatureData] = useState(""); // Para almacenar el data URL de la firma
  const [error, setError] = useState("");
  const [isSignedByDrawing, setIsSignedByDrawing] = useState(false); // Para saber si ya se dibujó

  // Resetear el canvas y el estado cuando el modal se abre
  useEffect(() => {
    if (visible && sigCanvas.current) {
      sigCanvas.current.clear(); // Limpiar el canvas al abrir
      setSignatureData("");
      setError("");
      setIsSignedByDrawing(false);
    }
  }, [visible]);

  const handleClearSignature = () => {
    sigCanvas.current.clear();
    setSignatureData("");
    setIsSignedByDrawing(false);
  };

  const handleConfirmSign = () => {
    if (sigCanvas.current.isEmpty()) {
      setError("Por favor, dibuja tu firma antes de confirmar.");
      return;
    }

    // Capturar la firma como Data URL (PNG)
    const dataUrl = sigCanvas.current.toDataURL("image/png");
    setSignatureData(dataUrl); // Guardar la firma (opcional, para depuración)
    setIsSignedByDrawing(true); // Marcar que se ha dibujado

    // Llama a la función onSign del padre.
    // Aquí, `dataUrl` contiene la firma dibujada.
    // Sin embargo, debido a la restricción de "no modificar modelos",
    // esta `dataUrl` NO se persistirá en la base de datos.
    // Solo se usará para marcar la sesión como firmada en el backend.
    onSign(session._id, dataUrl); // Pasamos el ID de la sesión y la firma dibujada
    onCancel(); // Cerrar modal
  };

  if (!session) return null;

  return (
    <Modal
      title={`Firmar Sesión de Mentoría`}
      visible={visible}
      onCancel={onCancel}
      footer={[
        <Button key="clear" onClick={handleClearSignature}>
          Limpiar Firma
        </Button>,
        <Button key="back" onClick={onCancel}>
          Cancelar
        </Button>,
        <Button key="submit" type="primary" onClick={handleConfirmSign}>
          Confirmar Firma
        </Button>,
      ]}
    >
      <Space direction="vertical" style={{ width: "100%" }}>
        <Text strong>Resumen de la Sesión:</Text>
        <Text>
          <strong>Mentor:</strong> {session.mentor?.name || session.mentor?.companyName || "N/A"}
        </Text>
        <Text>
          <strong>Startup:</strong> {session.startup?.company || "N/A"}
        </Text>
        <Text>
          <strong>Fecha:</strong> {new Date(session.dateTime).toLocaleString()}
        </Text>
        <Text>
          <strong>Tema:</strong> {session.topic || "N/A"}
        </Text>
        <Text>
          <strong>Duración:</strong> {session.duration || "N/A"} horas
        </Text>
        <Text>
          <strong>Estado:</strong> {session.status?.toUpperCase() || "N/A"}
        </Text>
        <br />
        <Text strong>Dibuja tu firma aquí:</Text>
        <div style={{ border: "1px solid #d9d9d9", borderRadius: "4px", overflow: "hidden" }}>
          <SignatureCanvas
            ref={sigCanvas}
            penColor="black"
            canvasProps={{ width: 400, height: 150, className: "sigCanvas" }}
            backgroundColor="white"
            minWidth={0.5}
            maxWidth={2.5}
            dotSize={0.5}
            velocityFilterWeight={0.9}
            // onEnd={() => setSignatureData(sigCanvas.current.toDataURL('image/png'))} // Puedes capturar en tiempo real si quieres
          />
        </div>
        {error && <Text type="danger">{error}</Text>}
        <Alert
          message="Nota Importante"
          description="Debido a restricciones en la base de datos, esta firma dibujada no se guardará permanentemente ni aparecerá en el PDF. Solo se usará para registrar tu confirmación de la sesión."
          type="warning"
          showIcon
        />
      </Space>
    </Modal>
  );
};

export default SignatureModal;
