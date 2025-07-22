import React from "react";
import { useSelector } from "react-redux";
import MentoringSessionList from "./MentoringSession";
import CreateMentoringSession from "./NewSessionForm/CreateMentoringSession";

const MentoringSessionsList = () => {
  const { user } = useSelector((state) => state.auth);

  const userId = user?.company;
  const userRole = user?.role;

  if (!userId || !userRole) {
    return <p>Cargando información del usuario...</p>;
  }

  return (
    <div>
      <h2>Mis mentorías</h2>
      <MentoringSessionList userId={userId} role={userRole} isAdminView={userRole === "admin"} />
      {userRole === "mentor" && <CreateMentoringSession />}
    </div>
  );
};

export default MentoringSessionsList;
