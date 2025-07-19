import React from "react";
import { List } from "antd";
import { FormOutlined, VideoCameraOutlined } from "@ant-design/icons";
const data = [
  {
    icon: <VideoCameraOutlined style={{ fontSize: "1.5rem", color: "var(--title-content)" }} />,
    title: "¿Las sesiones son online o presenciales?",
    description:
      "Las sesiones suelen ser online porque suele ser la opción más cómoda, sin embargo, teneis disponibles los espacios de La Harinera para hacer el mentoring presencial si así lo preferís.",
  },
  {
    icon: <FormOutlined style={{ fontSize: "1.5rem", color: "var(--title-content)" }} />,
    title: "¿Tenemos que avisar sobre cada sesión que hacemos?",
    description:
      "No, con haber rellenado el formulario una vez por cada sesión de mentoring realizada es suficiente.",
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
