import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Card from "../../../Elements/Card/Card";
import { fetchAllMentors } from "../../../../features/startup/mentoring/mentoringSlice";

const Mentors = () => {
  const dispatch = useDispatch();

  const mentoringState = useSelector((state) => state.mentoring) || {};
  const { mentors = [], isLoading = false, isError = false, message = "" } = mentoringState;

  useEffect(() => {
    dispatch(fetchAllMentors());
  }, [dispatch]);

  if (isLoading) return <p>Cargando mentores...</p>;
  if (isError) return <p>Error: {message}</p>;

  return (
    <div>
      <h2>Mentores</h2>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}>
        {mentors.length > 0 ? (
          mentors.map((mentorship) => (
            <Card
              key={mentorship._id}
              title={mentorship.category || "Categoría no disponible"}
              /*               hoverText={mentorship.company} */
              hoverImage={mentorship.logo}
            />
          ))
        ) : (
          <p>No hay mentores para mostrar.</p>
        )}
      </div>
    </div>
  );
};

export default Mentors;
