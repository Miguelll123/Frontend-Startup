import React from "react";
import { Tabs } from "antd";
import Generalinfo from "./Tabs_mentor/Generalinfo";
import QnA from "./Tabs_mentor/QnA";
import MoreInfo from "./Tabs_mentor/MoreInfo";
import { useDispatch, useSelector } from "react-redux";
import { setActiveTabKey } from "../../../features/startup/tabs/tabSlice.js";
import AuthLogout from "../../Auth/AuthLogout.jsx";

const MentorDashboard = () => {
  const dispatch = useDispatch();
  const activeTabKey = useSelector((state) => state.tab.activeTabKey);

  const items = [
    { label: "Información general", key: "1", children: <Generalinfo /> },
    { label: "FAQs", key: "2", children: <QnA /> },
    { label: "Más información y contacto", key: "3", children: <MoreInfo /> },
  ];

  return (
    <>
      <h2 style={{ textAlign: "center" }}>¡Bienvenid@ a tu espacio!</h2>
      <h3 style={{ textAlign: "center" }}>
        Aquí podrás encontrar toda la información de nuestro programa
      </h3>
      <Tabs
        activeKey={activeTabKey}
        onChange={(key) => dispatch(setActiveTabKey(key))}
        items={items}
        size="large"
      />
      <AuthLogout />
    </>
  );
};

export default MentorDashboard;
