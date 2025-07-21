import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Card from "../../../Elements/Card/Card";
import { fetchAllMentors } from "../../../../features/startup/mentoring/mentoringSlice";
import MentorModal from "../Mentors/Modal/MentorModal";

const Mentors = () => {
  const dispatch = useDispatch();
  const [selectedMentorship, setSelectedMentorship] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const mentoringState = useSelector((state) => state.mentoring) || {};
  const { mentors = [], isLoading = false, isError = false, message = "" } = mentoringState;

  useEffect(() => {
    dispatch(fetchAllMentors());
  }, [dispatch]);

  const handleOpenModal = (mentorship) => {
    setSelectedMentorship(mentorship);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedMentorship(null);
  };

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
              hoverImage={mentorship.logo}
              onClick={() => handleOpenModal(mentorship)}
            />
          ))
        ) : (
          <p>No hay mentores para mostrar.</p>
        )}
      </div>

      <MentorModal open={isModalOpen} onClose={handleCloseModal} mentorship={selectedMentorship} />
    </div>
  );
};

export default Mentors;
