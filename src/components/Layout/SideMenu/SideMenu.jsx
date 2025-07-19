import React from "react";
import { Menu } from "antd";
import { UserOutlined, LaptopOutlined, NotificationOutlined } from "@ant-design/icons";

const SideMenu = () => {
  const items = [UserOutlined, LaptopOutlined, NotificationOutlined].map((icon, index) => {
    const key = String(index + 1);
    return {
      key: `sub${key}`,
      icon: React.createElement(icon),
      label: `subnav ${key}`,
      children: Array.from({ length: 4 }).map((_, j) => {
        const subKey = index * 4 + j + 1;
        return {
          key: `${subKey}`,
          label: `option${subKey}`,
        };
      }),
    };
  });

  return (
    <Menu
      mode="inline"
      theme="dark"
      defaultSelectedKeys={["1"]}
      defaultOpenKeys={["sub1"]}
      style={{ height: "100%", borderRight: 0 }}
      items={items}
    />
  );
};

export default SideMenu;

//PARA CUANDO ESTÉ EL AUTH

/* import React from "react";
import { Menu } from "antd";
import { useSelector } from "react-redux";
import {
  UserOutlined,
  LaptopOutlined,
  NotificationOutlined,
  HomeOutlined,
  TeamOutlined,
} from "@ant-design/icons";

const SideMenu = () => {
  const role = useSelector((state) => state.user.role); // ← obtiene el rol

  let items = [];

  if (role === "startup") {
    items = [
      {
        key: "dashboard",
        icon: <HomeOutlined />,
        label: "Panel de startup",
      },
      {
        key: "resources",
        icon: <LaptopOutlined />,
        label: "Recursos",
      },
    ];
  } else if (role === "mentor") {
    items = [
      {
        key: "dashboard",
        icon: <HomeOutlined />,
        label: "Panel de mentor",
      },
      {
        key: "mentoring",
        icon: <TeamOutlined />,
        label: "Sesiones",
      },
    ];
  } else if (role === "admin") {
    items = [
      {
        key: "dashboard",
        icon: <HomeOutlined />,
        label: "Panel de admin",
      },
      {
        key: "usuarios",
        icon: <UserOutlined />,
        label: "Gestión de usuarios",
      },
      {
        key: "config",
        icon: <NotificationOutlined />,
        label: "Configuración",
      },
    ];
  }

  return (
    <Menu
      mode="inline"
      theme="dark"
      defaultSelectedKeys={["dashboard"]}
      style={{ height: "100%", borderRight: 0 }}
      items={items}
    />
  );
};

export default SideMenu; */
