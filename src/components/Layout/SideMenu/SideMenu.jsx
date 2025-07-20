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
} from "@ant-design/icons";
import { setActiveTabKey } from "../../../features/startup/tabs/tabSlice.js";

const SideMenu = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const role = useSelector((state) => state.auth.user?.role);

  const handleClick = ({ key }) => {
    // Si es una pestaña del HOME → actualizamos tab
    const homeTabs = ["info", "faqs", "mas-info", "perfil"];
    if (homeTabs.includes(key)) {
      const tabKeyMap = {
        info: "1",
        faqs: "2",
        "mas-info": "3",
        perfil: "4",
      };
      dispatch(setActiveTabKey(tabKeyMap[key]));
      navigate(`/${role}/home`);
    } else {
      // Si no es parte de HOME, simplemente navegamos
      navigate(`/${role}/${key}`);
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
        { key: "perfil", label: "Mi perfil" },
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

  const items = role === "startup" ? startupItems : mentorItems;

  return (
    <Menu
      mode="inline"
      theme="dark"
      defaultSelectedKeys={["info"]}
      style={{ height: "100%", borderRight: 0 }}
      items={items}
      onClick={handleClick}
    />
  );
};

export default SideMenu;
