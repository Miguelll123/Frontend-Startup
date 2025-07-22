import React from "react";
import { useSelector } from "react-redux";
import MentoringSessionList from "./MentoringSession";

const MentoringSessionsList = () => {
  const { user } = useSelector((state) => state.auth);

  const userId = user?.company;

  if (!userId) {
    return <p>Cargando información del usuario o no autorizado.</p>;
  }

  return (
    <div>
      <MentoringSessionList userId={userId} role={user?.role} />
    </div>
  );
};

export default MentoringSessionsList;
