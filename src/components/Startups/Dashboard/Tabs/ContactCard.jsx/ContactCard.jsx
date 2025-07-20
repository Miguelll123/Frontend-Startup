import React, { useEffect } from "react";
import { MailOutlined, WhatsAppOutlined } from "@ant-design/icons";
import { Avatar, Card, message } from "antd";
const { Meta } = Card;
import "./contactCard.css";

const ContactCard = () => {
  const phoneNumber = "+34627711114";
  const emailAddress = "diana.meri@startupvalencia.org";

  useEffect(() => {
    message.info("Componente cargado");
  }, []);

  const handleCopyPhone = () => {
    navigator.clipboard
      .writeText(phoneNumber)
      .then(() => {
        message.success("Número copiado");
      })
      .catch(() => {
        message.error("Error al copiar el número");
      });
  };

  const handleCopyEmail = () => {
    navigator.clipboard
      .writeText(emailAddress)
      .then(() => {
        message.success("Correo copiado");
      })
      .catch(() => {
        message.error("Error al copiar el correo");
      });
  };

  return (
    <Card
      style={{ width: 300, background: "var(--main-gradient)" }}
      actions={[
        <span key="whatsapp" onClick={handleCopyPhone}>
          <WhatsAppOutlined style={{ color: "white", fontSize: "20px" }} />
        </span>,
        <span key="mail" onClick={handleCopyEmail}>
          <MailOutlined style={{ color: "white", fontSize: "20px" }} />
        </span>,
      ]}
      className="contact-card"
    >
      <Meta
        avatar={
          <Avatar
            size={80}
            src="https://secure.gravatar.com/avatar/7c25f5f31d4b023fb40e2690973463e08917b3fe0a52505c9d50512790e6372d?s=240&d=retro&r=g"
          />
        }
        title={<span className="contact-card-title">Diana Meri</span>}
        description={
          <span className="contact-card-description">Project Manager en Startup Valencia</span>
        }
      />
    </Card>
  );
};

export default ContactCard;
