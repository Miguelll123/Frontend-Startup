import React from "react";
import "./card.css";

const Card = ({ title, hoverText, hoverImage, onClick }) => {
  return (
    <div className="card" onClick={onClick}>
      <div className="card">
        <div className="card-title-wrapper">
          <span className="card-title">{title}</span>
        </div>

        <div className="card-hover-content">
          {hoverImage && <img src={hoverImage} alt="Logo empresa" className="card-hover-image" />}
          {hoverText && <p className="card-hover-text">{hoverText}</p>}
          <p className="card-hover-details">Click para más detalles</p>
        </div>
      </div>
    </div>
  );
};

export default Card;
