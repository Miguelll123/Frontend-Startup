import React, { useEffect } from "react";
import { MailOutlined, WhatsAppOutlined } from "@ant-design/icons";
import { Avatar, Card, message } from "antd"; 
const { Meta } = Card;
import "./contactCard.css";

const ContactCard = () => {
  const phoneNumber = "+34627711114";
  const emailAddress = "diana.meri@startupvalencia.org";


  const [messageApi, contextHolder] = message.useMessage();

  useEffect(() => {

  }, [messageApi]); 

  
  const copyToClipboard = (textToCopy, successMessage, errorMessage) => {
    const tempTextArea = document.createElement("textarea");
    tempTextArea.value = textToCopy;
    document.body.appendChild(tempTextArea);

    tempTextArea.select();
    tempTextArea.setSelectionRange(0, 99999);

    try {
      document.execCommand("copy");
      messageApi.success(successMessage); 
    } catch (err) {
      console.error("Error al copiar:", err);
      messageApi.error(errorMessage); 
    } finally {
      document.body.removeChild(tempTextArea);
    }
  };

  const handleCopyPhone = () => {
    copyToClipboard(phoneNumber, "Número copiado", "Error al copiar el número");
  };

  const handleCopyEmail = () => {
    copyToClipboard(emailAddress, "Correo copiado", "Error al copiar el correo");
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
      {contextHolder}
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