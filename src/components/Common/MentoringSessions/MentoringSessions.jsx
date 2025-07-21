// En MentoringSessionsList.jsx
import React from "react";
import { useSelector } from "react-redux";
import MentoringSessionList from "./MentoringSession";

const MentoringSessionsList = () => {
  const { user } = useSelector((state) => state.auth);

  // Para el rol 'mentor', userId será el _id de su compañía de mentoría (user.company)
  // Para el rol 'startup', userId será el _id de su documento de startup (user._id)
  const userId = user?.role === "mentor" ? user.company : user._id;

  return (
    <div>
      <MentoringSessionList userId={userId} role={user?.role} />
    </div>
  );
};

export default MentoringSessionsList;
