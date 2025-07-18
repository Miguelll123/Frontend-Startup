import React from "react";
import "./card.css";

const Card = ({ title, description, image }) => {
  return (
    <div className="card-wrapper">
      <section className="card">
        <img src={image} alt={title} className="card__image" />
        <p className="card__text"> {title} </p>
        <div className="card__content">
          <p className="card__title">{title}</p>
          <p className="card__description">{description}</p>
        </div>
      </section>
    </div>
  );
};

export default Card;
