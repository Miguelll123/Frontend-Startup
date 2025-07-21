import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTrainers, getTrainerDetail } from "../../../features/trainers/trainerSlice";
import TrainerCard from "./TrainerCard";
import TrainerDetail from "./TrainerDetail";

const TrainersList = () => {
  const dispatch = useDispatch();
  const { list, loading, error } = useSelector((state) => state.trainers);

  useEffect(() => {
    dispatch(getTrainers());
  }, [dispatch]);

  if (loading) return <div>Cargando formadores...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <>
      <h2>Conoce a los formadores del programa</h2>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 24 }}>
        {list.map((trainer) => (
          <TrainerCard
            key={trainer._id}
            trainer={trainer}
            onClick={() => dispatch(getTrainerDetail(trainer._id))}
          />
        ))}
      </div>
      <TrainerDetail />
    </>
  );
};

export default TrainersList;
