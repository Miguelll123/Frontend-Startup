import React from "react";
import Card from "./ContactCard.jsx/ContactCard";
import { List } from "antd";
import { WhatsAppOutlined } from "@ant-design/icons";

const MoreInfo = () => {
  return (
    <div>
      <h3>ℹ️ Más info</h3>
      <List.Item>
        <List.Item.Meta
          description={
            <span style={{ color: "var(--text-content)" }}>
              📣 Únete a la comunidad de WhatsApp (click en el icono para acceder al grupo)
            </span>
          }
          avatar={
            <a
              href="https://chat.whatsapp.com/Iv6Ep2IPd4Y9O2mtqyEAoc"
              target="_blank"
              rel="noopener noreferrer"
              style={{ display: "inline-block" }} // para que el link no afecte el layout
            >
              <WhatsAppOutlined style={{ color: "green", fontSize: "3rem", margin: "2rem" }} />
            </a>
          }
        />
      </List.Item>
      <List.Item>
        <List.Item.Meta
          description={
            <span style={{ color: "var(--text-content)" }}>
              Será el único canal de comunicación directa del programa además del email. Pueden
              unirse todos los integrantes que lo deseen de cada startup participante.
            </span>
          }
        />
      </List.Item>
      <h4>Si tienes más preguntas, ponte en contacto con nosotros:</h4>
      <Card />
    </div>
  );
};

export default MoreInfo;
