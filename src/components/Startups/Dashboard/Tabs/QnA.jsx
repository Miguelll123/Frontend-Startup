import React from "react";
import { List } from "antd";
import { FormOutlined, UsergroupAddOutlined, VideoCameraOutlined } from "@ant-design/icons";
const data = [
  {
    icon: <UsergroupAddOutlined style={{ fontSize: "1.5rem", color: "var(--title-content)" }} />,
    title: "¿Cuántas personas pueden venir a las formaciones?",
    description:
      "La sala de formación tiene 35 puestos disponibles por lo que podéis venir una o dos personas a cada sesión. Podéis venir 3 personas o más siempre que se dé prioridad de sentarse a un integrante de cada equipo. (Tenéis total libertad de subir más sillas a la sala si al terminar la sesión si las dejáis de nuevo en donde corresponde 😉 ).",
  },
  {
    icon: <FormOutlined style={{ fontSize: "1.5rem", color: "var(--title-content)" }} />,
    title: "¿Tenemos que registrar previamente quiénes vamos a cada sesión?",
    description:
      "No, con haber rellenado el formulario una sola vez es suficiente, no teneis que avisar quién va a cada formación, solo aseguraros de firmar la hoja de firmas para contar la asistencia.",
  },
  {
    icon: <VideoCameraOutlined style={{ fontSize: "1.5rem", color: "var(--title-content)" }} />,
    title: "¿Se puede asistir online?",
    description:
      "No. En este programa apostamos por la presencialidad. Recordad que se debe cumplir un mínimo del 80% de asistencia a las sesiones formativas.",
  },
];

const QnA = () => {
  return (
    <>
      <List
        itemLayout="horizontal"
        dataSource={data}
        renderItem={(item, index) => (
          <List.Item>
            <List.Item.Meta
              avatar={item.icon}
              title={
                <span style={{ color: "var(--title-content)", fontWeight: "bold" }}>
                  {item.title}
                </span>
              }
              description={<span style={{ color: "var(--text-content)" }}>{item.description}</span>}
            />
          </List.Item>
        )}
      />
    </>
  );
};

export default QnA;
