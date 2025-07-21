import React from "react";
import styles from "./TrainerCard.module.css";

const TrainerCard = ({ trainer, onClick }) => {
  return (
    <div className={styles.card} onClick={onClick}>
      <img
        src={trainer.photo || "https://via.placeholder.com/150"}
        alt={trainer.name}
        className={styles.avatar}
      />
      <h3 className={styles.name}>{trainer.name || trainer.firstName + ' ' + trainer.lastName}</h3>
      <p className={styles.position}>{trainer.position || trainer.role}</p>
      <p className={styles.company}>{trainer.company}</p>
    </div>
  );
};

export default TrainerCard; 