import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDashboardData } from "../../../features/startups/startupSlice";

const StartupDashboard = () => {
  const dispatch = useDispatch();
  const { dashboardData } = useSelector((state) => state.startups);

  useEffect(() => {
    dispatch(getDashboardData());
  }, [dispatch]);

  return (
    <div style={{ padding: 24 }}>
      {dashboardData?.html ? (
        <div dangerouslySetInnerHTML={{ __html: dashboardData.html }} />
      ) : (
        <div>Cargando...</div>
      )}
    </div>
  );
};

export default StartupDashboard;
