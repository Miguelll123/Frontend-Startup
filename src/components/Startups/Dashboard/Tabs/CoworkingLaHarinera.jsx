import React from "react";
import { Typography, List, Alert } from "antd";
const { Title, Paragraph, Link } = Typography;

const CoworkingLaHarinera = () => {
  return (
    <div style={{ maxWidth: 700, margin: "" }}>
      <h3 level={3}>🏢 Coworking La Harinera</h3>
      <Paragraph>
        <b>📍 Dirección:</b>{" "}
        <Link href="https://maps.google.com/?q=C%2F+de+Joan+Verdeguer%2C+116%2C+Poblats+Marítims%2C+46024+Valencia" target="_blank">
          La Harinera (C/ de Joan Verdeguer, 116, Poblats Marítims, 46024, Valencia)
        </Link>
      </Paragraph>
      <Paragraph>
        <b>🔗 URLs de apoyo:</b>{" "}
        <Link href="https://www.lasnaves.com/wp-content/uploads/2024/05/Uso-de-Espacios-y-Tarifas_compressed.pdf" target="_blank">Web</Link> | {" "}
        <Link href="https://drive.google.com/file/d/1nWBf4uclnRMoWAQVjBb1DNvB1_tH9sPk/view" target="_blank">Manual de Bienvenida</Link> | {" "}
        <Link href="https://drive.google.com/file/d/1OmPZuK65-P__WlZU2IhyQ6iJWbenIx3X/view?usp=drive_link" target="_blank">Servicio de comidas</Link>
      </Paragraph>
      <Paragraph>
        <b>📶 WiFi:</b> La Harinera - <b>Password:</b> VLCtech25+
      </Paragraph>
      <Paragraph>
        <b>🕒 Horario de apertura:</b><br/>
        Lunes a viernes: 08:30 a 20:15 h<br/>
        Sábados, domingos y festivos: Cerrado.<br/>
        <b>Verano:</b>
        <ul>
          <li>Del 11 al 24 de agosto de 2025 las instalaciones tanto de Las Naves como de La Harinera, permanecerán cerradas.</li>
          <li>Los días restantes de agosto, el horario de apertura será de 8:30 a 15:00 h.</li>
        </ul>
      </Paragraph>
      <Paragraph>
        <b>📅 Reserva de salas:</b><br/>
        En la Planta Baja están disponibles las dos salas acristaladas (Sala de Reuniones 1 y Sala de Reuniones 2).<br/>
        <b>Sistema de reservas online:</b><br/>
        <Link href="https://outlook.office365.com/book/ReservadeSalasHarinera@lasnaves.com/s/H8knsbeqf02-j_A41Ub15w2?ismsaljsauthenabled=true" target="_blank">Enlace de reserva de Sala 1</Link> | {" "}
        <Link href="https://outlook.office365.com/book/ReservadeSalasHarinera@lasnaves.com/s/F5zmJdXC6U2IoJCALi-9vw2?ismsaljsauthenabled=true&bO=1&sessionId=e784f339-204b-4183-b18b-4aa97c6419ff" target="_blank">Enlace de reserva de Sala 2</Link>
      </Paragraph>
      <Alert
        message={
          <span>
            <b>⚠️ Todas las personas que formen parte del programa deben estar registradas en <Link href="https://valenciainnovationcapital.typeform.com/seed-st-prog-25" target="_blank">este formulario</Link>.</b>
          </span>
        }
        description={
          <span>
            Se tienen que registrar todas las personas que tengan previsto venir a las formaciones y también todas las personas que quieran solicitar puesto de trabajo en La Harinera, vayan o no vayan a las formaciones.
          </span>
        }
        type="warning"
        showIcon
        style={{ margin: "16px 0" }}
      />
      
    </div>
  );
};

export default CoworkingLaHarinera; 