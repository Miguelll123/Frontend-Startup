import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Form,
  Input,
  DatePicker,
  TimePicker,
  InputNumber,
  Select,
  Button,
  Typography,
  Alert,
  message,
  Collapse,
} from "antd";
import SignatureCanvas from "react-signature-canvas";

import { createMentoringSession } from "../../../../features/mentoringsessions/mentoringSessionsSlice.js";
import { fetchStartups } from "../../../../features/startup/startupSlice.js";

const { Option } = Select;
const { Text } = Typography;
const { Panel } = Collapse;

const CreateMentoringSession = () => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  const { user } = useSelector((state) => state.auth);
  const {
    isLoading: isCreatingSession,
    isError: createError,
    isSuccess: createSuccess,
    message: createMessage,
  } = useSelector((state) => state.mentoringSessions);
  const {
    startups,
    isLoading: areStartupsLoading,
    isError: startupsError,
    message: startupsMessage,
  } = useSelector((state) => state.startups);

  const sigCanvas = useRef(null);
  const [signatureError, setSignatureError] = useState("");
  const [activeKey, setActiveKey] = useState(["1"]);

  useEffect(() => {
    dispatch(fetchStartups());
  }, [dispatch]);

  useEffect(() => {
    if (createSuccess) {
      message.success("Sesión de mentoría creada exitosamente!");
      form.resetFields();

      if (sigCanvas.current) {
        sigCanvas.current.clear();
      }
      setSignatureError("");
      setActiveKey([]);
    }
    if (createError) {
      message.error(`Error al crear sesión: ${createMessage}`);
    }
  }, [createSuccess, createError, createMessage, form, dispatch]);

  const onFinish = async (values) => {
    if (!sigCanvas.current || sigCanvas.current.isEmpty()) {
      setSignatureError("Por favor, dibuja tu firma para confirmar la sesión.");
      return;
    }
    setSignatureError("");

    const mentorSignature = sigCanvas.current.toDataURL("image/png");

    const selectedDate = values.date.toDate();
    const selectedTime = values.time.toDate();

    const combinedDateTime = new Date(
      selectedDate.getFullYear(),
      selectedDate.getMonth(),
      selectedDate.getDate(),
      selectedTime.getHours(),
      selectedTime.getMinutes(),
      selectedTime.getSeconds()
    );

    const dateFormatted = selectedDate.toISOString().split("T")[0];
    const hourFormatted = selectedTime.toTimeString().split(" ")[0].substring(0, 5);

    const sessionData = {
      mentor: user?.company,
      startup: values.startupId,
      date: dateFormatted,
      hour: hourFormatted,
      dateTime: combinedDateTime.toISOString(),
      duration: values.duration,
      topic: values.topic,
      summary: values.summary,
      mentorSignature: mentorSignature,
    };

    console.log("Datos de la sesión a crear:", sessionData);
    dispatch(createMentoringSession(sessionData));
  };

  const handleClearSignature = () => {
    if (sigCanvas.current) {
      sigCanvas.current.clear();
    }
    setSignatureError("");
  };

  return (
    <div style={{ padding: "20px", maxWidth: "800px", margin: "auto" }}>
      <h3>Crear Nueva Sesión de Mentoría</h3>

      <Collapse activeKey={activeKey} onChange={(key) => setActiveKey(key)}>
        <Panel header="Haz clic para crear una nueva sesión" key="1">
          <Form form={form} layout="vertical" onFinish={onFinish} initialValues={{ duration: 1 }}>
            {/* Campo de Startup */}
            <Form.Item
              name="startupId"
              label="Startup"
              rules={[{ required: true, message: "Por favor, selecciona una startup!" }]}
            >
              <Select
                placeholder="Selecciona una startup"
                loading={areStartupsLoading}
                disabled={areStartupsLoading}
              >
                {startupsError && (
                  <Option value="" disabled>
                    {startupsMessage}
                  </Option>
                )}
                {startups &&
                  startups.map((startup) => (
                    <Option key={startup._id} value={startup._id}>
                      {startup.company}
                    </Option>
                  ))}
              </Select>
            </Form.Item>

            {/* Campo de Fecha */}
            <Form.Item
              name="date"
              label="Fecha"
              rules={[{ required: true, message: "Por favor, selecciona la fecha!" }]}
            >
              <DatePicker format="YYYY-MM-DD" style={{ width: "100%" }} />
            </Form.Item>

            {/* Campo de Hora */}
            <Form.Item
              name="time"
              label="Hora"
              rules={[{ required: true, message: "Por favor, selecciona la hora!" }]}
            >
              <TimePicker format="HH:mm" style={{ width: "100%" }} />
            </Form.Item>

            {/* Campo de Duración */}
            <Form.Item
              name="duration"
              label="Duración (horas)"
              rules={[
                { required: true, message: "Por favor, introduce la duración!" },
                {
                  type: "number",
                  min: 0.5,
                  max: 8,
                  message: "La duración debe ser entre 0.5 y 8 horas.",
                },
              ]}
            >
              <InputNumber step={0.5} min={0.5} max={8} style={{ width: "100%" }} />
            </Form.Item>

            {/* Campo de Tema */}
            <Form.Item
              name="topic"
              label="Tema de la Sesión"
              rules={[{ required: true, message: "Por favor, introduce el tema de la sesión!" }]}
            >
              <Input />
            </Form.Item>

            {/* Campo de Resumen */}
            <Form.Item name="summary" label="Resumen de la Sesión">
              <Input.TextArea rows={4} />
            </Form.Item>

            {/* Área de Firma del Mentor */}
            <Form.Item label="Firma del Mentor (dibuja tu firma directamente en el recuadro)">
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
                />
              </div>
              <Button onClick={handleClearSignature} style={{ marginTop: "10px" }}>
                Limpiar Firma
              </Button>
              {signatureError && (
                <Text type="danger" style={{ display: "block", marginTop: "5px" }}>
                  {signatureError}
                </Text>
              )}
            </Form.Item>

            {/* Botón de Envío */}
            <Form.Item>
              <Button type="primary" htmlType="submit" loading={isCreatingSession}>
                Crear Sesión
              </Button>
            </Form.Item>

            {/* Mensajes de error/éxito */}
            {createError && (
              <Alert message="Error" description={createMessage} type="error" showIcon />
            )}
          </Form>
        </Panel>
      </Collapse>
    </div>
  );
};

export default CreateMentoringSession;
