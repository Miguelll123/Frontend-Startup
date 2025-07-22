import React from "react";
import { Menu } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  HomeOutlined,
  BookOutlined,
  TeamOutlined,
  CalendarOutlined,
  GlobalOutlined,
  QuestionCircleOutlined,
  ApartmentOutlined,
  UserAddOutlined,
} from "@ant-design/icons";
import { setActiveTabKey } from "../../../features/startup/tabs/tabSlice.js";

const SideMenu = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const role = useSelector((state) => state.auth.user?.role);

  const handleClick = ({ key }) => {
    const homeTabs = ["info", "faqs", "mas-info", "perfil"];
    const tabKeyMap = {
      info: "1",
      faqs: "2",
      "mas-info": "3",
      perfil: "4",
    };

    // Mapear keys internas duplicadas (solo en admin)
    const routeKeyMap = {
      "networking-2": "networking",
    };

    const resolvedKey = routeKeyMap[key] || key;

    if (homeTabs.includes(resolvedKey)) {
      dispatch(setActiveTabKey(tabKeyMap[resolvedKey]));
      navigate(`/${role}`);
    } else {
      navigate(`/${role}/${resolvedKey}`);
    }
  };

  const startupItems = [
    {
      key: "home",
      icon: <HomeOutlined />,
      label: "HOME",
      children: [
        { key: "info", label: "Info general" },
        { key: "faqs", label: "FAQs" },
        { key: "mas-info", label: "Más información" },
        { key: "perfil", label: "Coworking La Harinera" },
      ],
    },
    {
      key: "programa",
      icon: <BookOutlined />,
      label: "PROGRAMA",
      children: [
        { key: "material", label: "Material sesiones" },
        { key: "formadores", label: "Formadores" },
        { key: "startups", label: "Startups" },
        { key: "agenda", label: "Agenda" },
      ],
    },
    {
      key: "mentorias",
      icon: <TeamOutlined />,
      label: "MENTORÍAS",
      children: [
        { key: "mismentorias", label: "Mis mentorías" },
        { key: "mentores", label: "Mentores" },
      ],
    },
    {
      key: "eventos",
      icon: <GlobalOutlined />,
      label: "EVENTOS Y NETWORKING",
      children: [
        { key: "networking", label: "Actividades networking" },
        { key: "eventos-internacionales", label: "Eventos internacionales" },
      ],
    },
  ];

 const mentorItems = [
    {
      key: "home",
      icon: <HomeOutlined />,
      label: "HOME",
      children: [
        { key: "info", label: "Info general" },
        { key: "faqs", label: "FAQs" },
        { key: "mas-info", label: "Más información" },
        { key: "perfil", label: "Mi perfil" },
      ],
    },
    {
      key: "startups",
      icon: <TeamOutlined />,
      label: "STARTUPS",
    },
    {
      key: "mismentorias",
      icon: <BookOutlined />,
      label: "MIS MENTORÍAS",
    },
  ];


  const adminItems = [
    {
      key: "home",
      icon: <HomeOutlined />,
      label: "HOME",
    },
    {
      key: "material",
      icon: <BookOutlined />,
      label: "Módulos y sesiones",
    },
    {
      key: "formadores",
      icon: <TeamOutlined />,
      label: "Formadores",
    },
    {
      key: "startups",
      icon: <ApartmentOutlined />,
      label: "Startups",
    },
    {
      key: "networking",
      icon: <CalendarOutlined />,
      label: "Networking",
    },
    {
      key: "mentoring",
      icon: <TeamOutlined />,
      label: "Mentoring",
    },
    {
      key: "invitar",
      icon: <UserAddOutlined />,
      label: "Dar de alta",
    },
  ];

  const items =
    role === "mentor"
      ? mentorItems
      : role === "startup"
      ? startupItems
      : role === "admin"
      ? adminItems
      : [];

  const currentPath = window.location.pathname.split("/").pop();

  return (
    <Menu
      mode="inline"
      theme="dark"
      defaultSelectedKeys={[currentPath]}
      selectedKeys={[currentPath]}
      style={{ height: "100%", borderRight: 0 }}
      items={items}
      onClick={handleClick}
    />
  );
};

export default SideMenu;