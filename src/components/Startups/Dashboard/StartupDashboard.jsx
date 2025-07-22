import React, { useEffect, useState } from "react";
import { Tabs, Spin, Alert } from "antd";
import Generalinfo from "./Tabs/Generalinfo";
import QnA from "./Tabs/QnA";
import MoreInfo from "./Tabs/MoreInfo";
import { useDispatch, useSelector } from "react-redux";
import { setActiveTabKey } from "../../../features/startup/tabs/tabSlice.js";
import CoworkingLaHarinera from "./Tabs/CoworkingLaHarinera.jsx";

const StartupDashboard = () => {
  const dispatch = useDispatch();
  const activeTabKey = useSelector((state) => state.tab.activeTabKey);

  const [startupData, setStartupData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("https://dashboard-2uny.onrender.com/api/startups")
      .then((res) => {
        if (!res.ok) throw new Error("Error al cargar las startups");
        return res.json();
      })
      .then((data) => {
        setStartupData(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const items = [
    {
      label: "Información general",
      key: "1",
      children: (
        <Generalinfo data={startupData} loading={loading} error={error} />
      ),
    },
    { label: "FAQs", key: "2", children: <QnA /> },
    { label: "Más información y contacto", key: "3", children: <MoreInfo /> },
    { label: "Coworking La Harinera", key: "4", children: <CoworkingLaHarinera/> },

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
    </>
  );
};

export default StartupDashboard;